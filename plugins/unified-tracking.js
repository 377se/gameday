/**
 * Unified Tracking Plugin
 * Single tracking interface that sends events to internal API
 * which then distributes to Google Ads, Meta Ads, GA4, etc.
 */

export default function ({ app, $axios, $cookies, route, store }, inject) {
  // Create a no-op tracking object for server-side to prevent errors
  if (process.server) {
    const noopTracking = {
      track: () => Promise.resolve({ success: false, reason: 'server_side' }),
      pageView: () => Promise.resolve({ success: false, reason: 'server_side' }),
      viewItem: () => Promise.resolve({ success: false, reason: 'server_side' }),
      viewItemList: () => Promise.resolve({ success: false, reason: 'server_side' }),
      addToCart: () => Promise.resolve({ success: false, reason: 'server_side' }),
      beginCheckout: () => Promise.resolve({ success: false, reason: 'server_side' }),
      purchase: () => Promise.resolve({ success: false, reason: 'server_side' }),
      hasConsent: () => true,
      getClientId: () => null,
      getUserId: () => null,
      getGclid: () => null,
      getFbclid: () => null,
      getFbp: () => null
    }
    inject('track', noopTracking)
    return
  }

  const siteId = parseInt(process.env.SITE_ID) || 6
  const currency = process.env.CURRENCY_CODE || 'SEK'

  /**
   * Check if user has consented to tracking cookies
   * CURRENTLY DISABLED - All tracking fires immediately
   */
  function hasConsent() {
    // TODO: Re-enable consent management when ready
    // const consent = $cookies.get('cookie_consent')
    // return consent && (consent.analytics || consent.marketing)
    
    return true // Always fire events for now
  }

  /**
   * Get gclid (Google Click ID) from URL or cookie
   * Uses your existing click_id cookie + Google's standard cookies as fallback
   */
  function getGclid() {
    // 1. Check URL parameter (your existing system captures this)
    const urlParams = new URLSearchParams(window.location.search)
    const gclidFromUrl = urlParams.get('gclid')
    if (gclidFromUrl) {
      // Don't create separate cookie - your system handles it in click_id
      return gclidFromUrl
    }
    
    // 2. Check your existing click_id cookie first
    const clickId = $cookies.get('click_id')
    if (clickId && !clickId.startsWith('fb.')) {
      // If click_id exists and it's not fbclid format, it's likely gclid or ttclid
      // Your system stores gclid directly in click_id
      return clickId
    }
    
    // 3. Fallback to Google's standard _gcl_aw cookie (Google Ads)
    const gclAw = $cookies.get('_gcl_aw')
    if (gclAw) {
      // Format: GCL.1234567890.Cj0KCQiA...
      const parts = gclAw.split('.')
      if (parts.length >= 3) {
        return parts[2] // The actual gclid value
      }
    }
    
    // 4. Fallback to _gcl_dc (Google Display & Video 360)
    const gclDc = $cookies.get('_gcl_dc')
    if (gclDc) {
      const parts = gclDc.split('.')
      if (parts.length >= 3) {
        return parts[2]
      }
    }
    
    return undefined
  }

  /**
   * Get fbclid (Facebook Click ID) from URL or cookie
   * Uses your existing click_id cookie + Meta's standard cookies as fallback
   */
  function getFbclid() {
    try {
      // 1. Check URL parameter (your existing system captures this)
      const urlParams = new URLSearchParams(window.location.search)
      const fbclidFromUrl = urlParams.get('fbclid')
      if (fbclidFromUrl) {
        // Save to localStorage backup for future use
        try {
          localStorage.setItem('_fbclid_backup', fbclidFromUrl)
        } catch (err) {
          // Silent fail
        }
        return fbclidFromUrl
      }
      
      // 2. Check your existing click_id cookie
      const clickId = $cookies.get('click_id')
      if (clickId && clickId.startsWith('fb.1.')) {
        // If click_id is in fbclid format: fb.1.timestamp.IwAR...
        // Extract the actual fbclid (last part)
        const parts = clickId.split('.')
        if (parts.length >= 4) {
          return parts[3]
        }
      }
      
      // 3. Fallback to Meta's standard _fbc cookie
      const fbc = $cookies.get('_fbc')
      if (fbc) {
        // Format: fb.1.1234567890.IwAR...
        const parts = fbc.split('.')
        if (parts.length >= 4) {
          return parts[3] // The actual fbclid value
        }
      }
      
      // 4. Fallback to localStorage backup
      const storedFbclid = localStorage.getItem('_fbclid_backup')
      if (storedFbclid) {
        return storedFbclid
      }
      
      return undefined
    } catch (err) {
      return undefined
    }
  }
  
  /**
   * Get Facebook Pixel cookie (_fbp) for Meta CAPI
   * With fallbacks for when consent blocks the cookie
   */
  function getFbp() {
    try {
      // 1. Try standard _fbp cookie (if consent allows)
      let fbp = $cookies.get('_fbp')
      if (fbp) return fbp
      
      // 2. Try localStorage backup (in case cookie was blocked but we saved it)
      const storedFbp = localStorage.getItem('_fbp_backup')
      if (storedFbp) {
        // Validate format: fb.1.timestamp.randomid
        if (storedFbp.startsWith('fb.1.')) {
          return storedFbp
        }
      }
      
      // 3. Generate a temporary FBP-like identifier for attribution
      // Format: fb.1.timestamp.randomid (same as Meta's format)
      // This allows server-side matching even without the official cookie
      const tempFbp = `fb.1.${Date.now()}.${Math.random().toString(36).substring(2, 15)}`
      
      // Try to store it for future use
      try {
        localStorage.setItem('_fbp_backup', tempFbp)
        // Also try to set as cookie (might work if consent changes)
        $cookies.set('_fbp', tempFbp, {
          path: '/',
          maxAge: 60 * 60 * 24 * 90 // 90 days (Meta's standard)
        })
      } catch (err) {
        // Silent fail if storage blocked
      }
      
      return tempFbp
      
    } catch (err) {
      // If everything fails, return undefined
      return undefined
    }
  }

  /**
   * Get TikTok Click ID from URL
   * Your existing system already captures this in click_id
   */
  function getTtclid() {
    const urlParams = new URLSearchParams(window.location.search)
    const ttclidFromUrl = urlParams.get('ttclid')
    if (ttclidFromUrl) {
      // Don't create separate cookie - your system handles it in click_id
      return ttclidFromUrl
    }
    
    // Your click_id might contain ttclid
    // If we need it separately, extract from click_id if it matches ttclid format
    return undefined
  }

  /**
   * Get generic click ID (gclid, fbclid, ttclid)
   * Uses your existing click_id cookie as primary source
   */
  function getClickId() {
    try {
      // 1. Your existing universal click_id cookie (highest priority)
      const clickIdCookie = $cookies.get('click_id')
      if (clickIdCookie) return clickIdCookie
      
      // 2. Your existing localStorage backup
      const clickIdStorage = localStorage.getItem('click_id')
      if (clickIdStorage) return clickIdStorage
      
      // 3. Fallback to individual click IDs
      return getGclid() || getFbclid() || getTtclid()
    } catch (err) {
      return getGclid() || getFbclid() || getTtclid()
    }
  }

  /**
   * Get client ID for tracking
   * Uses Google Analytics _ga cookie as fallback for consistency
   */
  function getClientId() {
    try {
      // 1. Check our custom tracking client ID
      let clientId = $cookies.get('_tracking_client_id')
      if (clientId) return clientId
      
      // 2. Fallback to Google Analytics _ga cookie
      const ga = $cookies.get('_ga')
      if (ga) {
        // Format: GA1.2.1234567890.9876543210
        // We want the last two parts as client ID
        const parts = ga.split('.')
        if (parts.length >= 4) {
          clientId = `${parts[2]}.${parts[3]}`
          // Store it in our custom cookie
          $cookies.set('_tracking_client_id', clientId, {
            path: '/',
            maxAge: 60 * 60 * 24 * 730 // 2 years
          })
          return clientId
        }
      }
      
      // 3. Generate new ID
      clientId = `${Date.now()}.${Math.random().toString(36).substring(2, 15)}`
      $cookies.set('_tracking_client_id', clientId, {
        path: '/',
        maxAge: 60 * 60 * 24 * 730 // 2 years
      })
      return clientId
    } catch (err) {
      return `${Date.now()}.${Math.random().toString(36).substring(2, 15)}`
    }
  }

  /**
   * Get session ID
   */
  function getSessionId() {
    try {
      let sessionId = sessionStorage.getItem('_tracking_session_id')
      if (!sessionId) {
        sessionId = `${Date.now()}.${Math.random().toString(36).substring(2, 15)}`
        sessionStorage.setItem('_tracking_session_id', sessionId)
      }
      return sessionId
    } catch (err) {
      return `${Date.now()}.${Math.random().toString(36).substring(2, 15)}`
    }
  }

  /**
   * Get user ID if logged in
   */
  function getUserId() {
    try {
      const cid = store.getters['cid']
      return cid ? String(cid) : undefined
    } catch (err) {
      return undefined
    }
  }

  /**
   * Main tracking method - sends event to unified API
   */
  async function track(eventName, eventData = {}) {
    // Consent check disabled - all events fire
    // if (!hasConsent()) {
    //   console.log('[Tracking] No consent - event not sent:', eventName)
    //   return { success: false, reason: 'no_consent' }
    // }

    try {
      const timestamp = Date.now()
      
      // Generate event_id for Meta deduplication (client-side generates, server uses same)
      const eventId = eventData.transactionId 
        ? `${eventData.transactionId}_${eventName}`
        : `${timestamp}_${eventName}_${Math.random().toString(36).substring(2, 10)}`
      
      // Generate external_id for Meta user matching (consistent user identifier)
      // Use userId if logged in, otherwise use stable clientId
      const externalId = getUserId() || getClientId()
      
      // Build unified event payload
      const payload = {
        // Event basics
        eventName,
        timestamp,
        eventId, // For Meta client/server deduplication
        externalId, // For Meta user matching across browser/server
        
        // Site context
        siteId,
        currency: eventData.currency || currency,
        locale: app.i18n.locale || app.i18n.defaultLocale,
        
        // Page context
        pageUrl: window.location.href,
        pageTitle: document.title,
        referrer: document.referrer,
        
        // User context
        clientId: getClientId(),
        userId: getUserId(),
        sessionId: getSessionId(),
        
        // Attribution (all click IDs)
        gclid: getGclid(),      // Google Ads
        fbclid: getFbclid(),    // Meta Ads
        ttclid: getTtclid(),    // TikTok Ads
        fbp: getFbp(),          // Meta Pixel cookie for CAPI
        clickId: getClickId(),  // Universal (your existing system)
        
        // Event-specific data
        ...eventData
      }

      // Send to internal API (server handles EVERYTHING)
      const headers = {}
      
      // Add API key header if configured (for security)
      if (process.env.TRACKING_API_KEY) {
        headers['x-tracking-api-key'] = process.env.TRACKING_API_KEY
      }
      
      const response = await $axios.$post('/webapi/tracking/event', payload, { headers })
      
      // GTM client-side events (GTM handles client-side tracking via dataLayer)
      if (response.gtmEvent && window.dataLayer) {
        window.dataLayer.push(response.gtmEvent)
        // Silent - no console logs
      }
      
      // Silent tracking - no console logs to browser
      
      return response
      
    } catch (error) {
      // Silent - no console logs
      return { success: false, error: error.message }
    }
  }

  /**
   * Convenience methods for common events
   */
  const tracking = {
    // Core tracking method
    track,
    
    // Page view
    pageView(customData = {}) {
      return track('page_view', customData)
    },
    
    // Product view
    viewItem(product) {
      return track('view_item', {
        value: parseFloat(product.Price) || 0,
        items: [{
          id: product.ProductId || product.ArticleNumber,
          name: product.Name,
          category: product.HeadCategory || product.Category,
          brand: product.BrandName,
          price: parseFloat(product.Price) || 0,
          quantity: 1
        }]
      })
    },
    
    // Category view
    viewItemList(category) {
      return track('view_item_list', {
        item_list_name: category.Name || category.title,
        item_list_id: category.CategoryId || category.id
      })
    },
    
    // Add to cart
    addToCart(item, quantity = 1) {
      return track('add_to_cart', {
        value: parseFloat(item.Price || item.PriceTotal) * quantity,
        items: [{
          id: item.ProductId || item.ArticleId || item.Id,
          name: item.Name,
          category: item.Category || item.HeadCategory,
          brand: item.BrandName,
          price: parseFloat(item.Price || item.PriceTotal) || 0,
          quantity
        }]
      })
    },
    
    // Begin checkout
    beginCheckout(cart) {
      if (!cart || !cart.data || cart.data.length === 0) {
        return Promise.resolve({ success: false, reason: 'empty_cart' })
      }

      const items = cart.data.map(item => ({
        id: item.ArticleNumber || item.ProductId || item.Id,
        name: item.Name,
        category: item.Category,
        brand: item.BrandName,
        price: parseFloat(item.PriceTotal || item.Price || item.UnitPrice || item.PricePerItem || item.ItemPrice || 0),
        quantity: item.Quantity || 1
      }))

      const totalValue = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)

      return track('begin_checkout', {
        value: totalValue,
        items
      })
    },
    
    // Purchase (with Enhanced Conversion data)
    purchase(orderData) {
      const items = orderData.items?.map(item => ({
        id: item.id || item.ProductId || item.ArticleNumber || item.Id,
        name: item.name || item.Name,
        category: item.category || item.Category || item.HeadCategory,
        brand: item.brand || item.BrandName,
        price: parseFloat(item.price || item.Price || item.PriceTotal) || 0,
        quantity: item.quantity || item.Quantity || 1
      })) || []

      return track('purchase', {
        transactionId: orderData.orderId || orderData.transactionId || orderData.Ordernumber,
        value: parseFloat(orderData.total || orderData.value || orderData.revenue) || 0,
        tax: parseFloat(orderData.tax) || 0,
        shipping: parseFloat(orderData.shipping) || 0,
        items,
        
        // Enhanced Conversion / CAPI user data
        userData: {
          email: orderData.email || orderData.Email,
          phone: orderData.phone || orderData.Phone,
          firstName: orderData.firstName || orderData.FirstName,
          lastName: orderData.lastName || orderData.LastName,
          street: orderData.street || orderData.Street,
          city: orderData.city || orderData.City,
          postalCode: orderData.postalCode || orderData.PostalCode,
          country: orderData.country || orderData.Country,
        }
      })
    },
    
    // Utilities
    hasConsent,
    getClientId,
    getUserId,
    getGclid,
    getFbclid,
    getFbp,
  }

  // Auto-track page views on route change
  app.router.afterEach((to, from) => {
    setTimeout(() => {
      tracking.pageView()
    }, 100)
  })

  // Monitor for _fbp cookie creation by Meta Pixel and backup to localStorage
  if (process.client) {
    const checkFbpInterval = setInterval(() => {
      try {
        const fbp = $cookies.get('_fbp')
        if (fbp && fbp.startsWith('fb.1.')) {
          // Official Meta Pixel cookie exists - backup to localStorage
          localStorage.setItem('_fbp_backup', fbp)
          clearInterval(checkFbpInterval) // Stop checking once found
        }
      } catch (err) {
        // Silent fail
      }
    }, 1000) // Check every second for first 30 seconds
    
    // Stop checking after 30 seconds
    setTimeout(() => clearInterval(checkFbpInterval), 30000)
  }

  // Inject into Vue context
  inject('track', tracking)

  // Also expose globally
  if (process.client) {
    window.$track = tracking
  }
}

