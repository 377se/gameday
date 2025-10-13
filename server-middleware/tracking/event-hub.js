/**
 * Unified Tracking Event Hub
 * Central hub that receives tracking events and distributes them to multiple platforms
 * (Google Ads, Meta Ads, GA4, etc.)
 */

const googleAdsAdapter = require('./adapters/google-ads-adapter')
const metaAdsAdapter = require('./adapters/meta-ads-adapter')
const ga4Adapter = require('./adapters/ga4-adapter')
const gtmAdapter = require('./adapters/gtm-adapter')
const oauthManager = require('./oauth-token-manager')

// Initialize OAuth token manager (handles auto-refresh)
oauthManager.initialize()

// ═══════════════════════════════════════════════════════════════
// SHARED OAUTH CREDENTIALS (Same for all sites)
// Must be set in environment variables - no hardcoded defaults
// ═══════════════════════════════════════════════════════════════
const SHARED_OAUTH = {
  clientId: process.env.GOOGLE_ADS_CLIENT_ID_SHARED,
  clientSecret: process.env.GOOGLE_ADS_CLIENT_SECRET_SHARED,
  refreshToken: process.env.GOOGLE_ADS_REFRESH_TOKEN_SHARED,
  developerToken: process.env.GOOGLE_ADS_DEVELOPER_TOKEN_SHARED
}

// Site-specific configuration
const SITE_CONFIGS = {
  1: { // Supporters Place - ✅ CONFIGURED
    siteId: 1,
    siteName: 'Supporters Place',
    currency: 'SEK',
    googleAds: {
      enabled: process.env.GOOGLE_ADS_ENABLED_SP === 'true',
      conversionId: process.env.GOOGLE_ADS_CONVERSION_ID_SP,
      // S2S Conversion Action IDs for API uploads (Type 7)
      purchaseConversionActionId: process.env.GOOGLE_ADS_PURCHASE_CONVERSION_ID_SP,
      addToCartConversionActionId: process.env.GOOGLE_ADS_ADD_TO_CART_CONVERSION_ID_SP,
      pageViewConversionActionId: process.env.GOOGLE_ADS_PAGE_VIEW_CONVERSION_ID_SP,
      // Labels for gtag.js client-side (not used in S2S API)
      purchaseLabel: process.env.GOOGLE_ADS_PURCHASE_LABEL_SP,
      addToCartLabel: process.env.GOOGLE_ADS_ADD_TO_CART_LABEL_SP,
      beginCheckoutLabel: process.env.GOOGLE_ADS_BEGIN_CHECKOUT_LABEL_SP,
      // Customer account details (from env)
      customerId: process.env.GOOGLE_ADS_CUSTOMER_ID_SP,
      managerAccountId: process.env.GOOGLE_ADS_MANAGER_ACCOUNT_ID,
      // Shared OAuth credentials (same for all sites)
      ...SHARED_OAUTH
    },
    metaAds: {
      enabled: process.env.META_ADS_ENABLED_SP === 'true',
      pixelId: process.env.META_PIXEL_ID_SP,
      accessToken: process.env.META_ACCESS_TOKEN_SP,
    },
    ga4: {
      enabled: process.env.GA4_ENABLED_SP === 'true',
      measurementId: process.env.GA4_MEASUREMENT_ID_SP,
      apiSecret: process.env.GA4_API_SECRET_SP,
    }
  },
  2: { // Sam Dodds - ✅ CONFIGURED
    siteId: 2,
    siteName: 'Sam Dodds',
    currency: 'DKK',
    googleAds: {
      enabled: process.env.GOOGLE_ADS_ENABLED_SAMDODDS === 'true',
      conversionId: process.env.GOOGLE_ADS_CONVERSION_ID_SAMDODDS,
      // S2S Conversion Action IDs for API uploads (Type 7, shared with Kopshop)
      purchaseConversionActionId: process.env.GOOGLE_ADS_PURCHASE_CONVERSION_ID_SAMDODDS,
      addToCartConversionActionId: process.env.GOOGLE_ADS_ADD_TO_CART_CONVERSION_ID_SAMDODDS,
      pageViewConversionActionId: process.env.GOOGLE_ADS_PAGE_VIEW_CONVERSION_ID_SAMDODDS,
      // Labels for gtag.js client-side (not used in S2S API)
      purchaseLabel: process.env.GOOGLE_ADS_PURCHASE_LABEL_SAMDODDS,
      addToCartLabel: process.env.GOOGLE_ADS_ADD_TO_CART_LABEL_SAMDODDS,
      beginCheckoutLabel: process.env.GOOGLE_ADS_BEGIN_CHECKOUT_LABEL_SAMDODDS,
      // Customer account details (from env)
      customerId: process.env.GOOGLE_ADS_CUSTOMER_ID_SAMDODDS,
      managerAccountId: process.env.GOOGLE_ADS_MANAGER_ACCOUNT_ID,
      // Shared OAuth credentials (same for all sites)
      ...SHARED_OAUTH
    },
    metaAds: {
      enabled: process.env.META_ADS_ENABLED_SAMDODDS === 'true',
      pixelId: process.env.META_PIXEL_ID_SAMDODDS,
      accessToken: process.env.META_ACCESS_TOKEN_SAMDODDS,
    },
    ga4: {
      enabled: process.env.GA4_ENABLED_SAMDODDS === 'true',
      measurementId: process.env.GA4_MEASUREMENT_ID_SAMDODDS,
      apiSecret: process.env.GA4_API_SECRET_SAMDODDS,
    }
  },
  3: { // Kopshop - ✅ CONFIGURED (Shares account with Sam Dodds)
    siteId: 3,
    siteName: 'Kopshop',
    currency: 'NOK',
    googleAds: {
      enabled: process.env.GOOGLE_ADS_ENABLED_KOPSHOP === 'true',
      conversionId: process.env.GOOGLE_ADS_CONVERSION_ID_KOPSHOP,
      // S2S Conversion Action IDs for API uploads (Type 7, shared with Sam Dodds)
      purchaseConversionActionId: process.env.GOOGLE_ADS_PURCHASE_CONVERSION_ID_KOPSHOP,
      addToCartConversionActionId: process.env.GOOGLE_ADS_ADD_TO_CART_CONVERSION_ID_KOPSHOP,
      pageViewConversionActionId: process.env.GOOGLE_ADS_PAGE_VIEW_CONVERSION_ID_KOPSHOP,
      // Labels for gtag.js client-side (not used in S2S API)
      purchaseLabel: process.env.GOOGLE_ADS_PURCHASE_LABEL_KOPSHOP,
      addToCartLabel: process.env.GOOGLE_ADS_ADD_TO_CART_LABEL_KOPSHOP,
      beginCheckoutLabel: process.env.GOOGLE_ADS_BEGIN_CHECKOUT_LABEL_KOPSHOP,
      // Customer account details (from env)
      customerId: process.env.GOOGLE_ADS_CUSTOMER_ID_SAMDODDS,
      managerAccountId: process.env.GOOGLE_ADS_MANAGER_ACCOUNT_ID,
      // Shared OAuth credentials (same for all sites)
      ...SHARED_OAUTH
    },
    metaAds: {
      enabled: process.env.META_ADS_ENABLED_KOPSHOP === 'true',
      pixelId: process.env.META_PIXEL_ID_KOPSHOP,
      accessToken: process.env.META_ACCESS_TOKEN_KOPSHOP,
    },
    ga4: {
      enabled: process.env.GA4_ENABLED_KOPSHOP === 'true',
      measurementId: process.env.GA4_MEASUREMENT_ID_KOPSHOP,
      apiSecret: process.env.GA4_API_SECRET_KOPSHOP,
    }
  },
  6: { // Gameday - ✅ CONFIGURED
    siteId: 6,
    siteName: 'Gameday',
    currency: 'SEK',
    googleAds: {
      enabled: process.env.GOOGLE_ADS_ENABLED_GAMEDAY === 'true',
      conversionId: process.env.GOOGLE_ADS_CONVERSION_ID_GAMEDAY,
      // S2S Conversion Action IDs for API uploads (Type 7)
      purchaseConversionActionId: process.env.GOOGLE_ADS_PURCHASE_CONVERSION_ID_GAMEDAY,
      addToCartConversionActionId: process.env.GOOGLE_ADS_ADD_TO_CART_CONVERSION_ID_GAMEDAY,
      pageViewConversionActionId: process.env.GOOGLE_ADS_PAGE_VIEW_CONVERSION_ID_GAMEDAY,
      // Customer account details (from env)
      customerId: process.env.GOOGLE_ADS_CUSTOMER_ID_GAMEDAY,
      managerAccountId: process.env.GOOGLE_ADS_MANAGER_ACCOUNT_ID,
      // Shared OAuth credentials (same for all sites)
      ...SHARED_OAUTH
    },
    metaAds: {
      enabled: process.env.META_ADS_ENABLED_GAMEDAY === 'true',
      pixelId: process.env.META_PIXEL_ID_GAMEDAY,
      accessToken: process.env.META_ACCESS_TOKEN_GAMEDAY,
    },
    ga4: {
      enabled: process.env.GA4_ENABLED_GAMEDAY === 'true',
      measurementId: process.env.GA4_MEASUREMENT_ID_GAMEDAY,
      apiSecret: process.env.GA4_API_SECRET_GAMEDAY,
    }
  },
  7: { // Supporterprylar - ✅ CONFIGURED
    siteId: 7,
    siteName: 'Supporterprylar',
    currency: 'SEK',
    googleAds: {
      enabled: process.env.GOOGLE_ADS_ENABLED_SUPPORTERPRYLAR === 'true',
      conversionId: process.env.GOOGLE_ADS_CONVERSION_ID_SUPPORTERPRYLAR,
      // S2S Conversion Action IDs for API uploads (Type 7)
      purchaseConversionActionId: process.env.GOOGLE_ADS_PURCHASE_CONVERSION_ID_SUPPORTERPRYLAR,
      addToCartConversionActionId: process.env.GOOGLE_ADS_ADD_TO_CART_CONVERSION_ID_SUPPORTERPRYLAR,
      pageViewConversionActionId: process.env.GOOGLE_ADS_PAGE_VIEW_CONVERSION_ID_SUPPORTERPRYLAR,
      // Labels for gtag.js client-side (not used in S2S API)
      purchaseLabel: process.env.GOOGLE_ADS_PURCHASE_LABEL_SUPPORTERPRYLAR,
      addToCartLabel: process.env.GOOGLE_ADS_ADD_TO_CART_LABEL_SUPPORTERPRYLAR,
      beginCheckoutLabel: process.env.GOOGLE_ADS_BEGIN_CHECKOUT_LABEL_SUPPORTERPRYLAR,
      // Customer account details (from env)
      customerId: process.env.GOOGLE_ADS_CUSTOMER_ID_SUPPORTERPRYLAR,
      managerAccountId: process.env.GOOGLE_ADS_MANAGER_ACCOUNT_ID,
      // Shared OAuth credentials (same for all sites)
      ...SHARED_OAUTH
    },
    metaAds: {
      enabled: process.env.META_ADS_ENABLED_SUPPORTERPRYLAR === 'true',
      pixelId: process.env.META_PIXEL_ID_SUPPORTERPRYLAR,
      accessToken: process.env.META_ACCESS_TOKEN_SUPPORTERPRYLAR,
    },
    ga4: {
      enabled: process.env.GA4_ENABLED_SUPPORTERPRYLAR === 'true',
      measurementId: process.env.GA4_MEASUREMENT_ID_SUPPORTERPRYLAR,
      apiSecret: process.env.GA4_API_SECRET_SUPPORTERPRYLAR,
    }
  },
  8: { // StreetWeek
    siteId: 8,
    siteName: 'StreetWeek',
    currency: 'SEK',
    googleAds: {
      enabled: process.env.GOOGLE_ADS_ENABLED_STREETWEEK === 'true',
      conversionId: process.env.GOOGLE_ADS_CONVERSION_ID_STREETWEEK,
      purchaseLabel: process.env.GOOGLE_ADS_PURCHASE_LABEL_STREETWEEK,
      addToCartLabel: process.env.GOOGLE_ADS_ADD_TO_CART_LABEL_STREETWEEK,
      beginCheckoutLabel: process.env.GOOGLE_ADS_BEGIN_CHECKOUT_LABEL_STREETWEEK,
      // Shared OAuth credentials (same for all sites)
      ...SHARED_OAUTH
    },
    metaAds: {
      enabled: process.env.META_ADS_ENABLED_STREETWEEK === 'true',
      pixelId: process.env.META_PIXEL_ID_STREETWEEK,
      accessToken: process.env.META_ACCESS_TOKEN_STREETWEEK,
    },
    ga4: {
      enabled: process.env.GA4_ENABLED_STREETWEEK === 'true',
      measurementId: process.env.GA4_MEASUREMENT_ID_STREETWEEK,
      apiSecret: process.env.GA4_API_SECRET_STREETWEEK,
    }
  }
}

/**
 * Validate and normalize event data
 */
function normalizeEvent(rawEvent) {
  const normalized = {
    // Event basics
    eventName: rawEvent.eventName,
    timestamp: rawEvent.timestamp || Date.now(),
    eventId: rawEvent.eventId, // For Meta client/server deduplication
    externalId: rawEvent.externalId, // For Meta user matching
    
    // Site context
    siteId: parseInt(rawEvent.siteId) || 6,
    currency: rawEvent.currency,
    locale: rawEvent.locale,
    
    // Page context
    pageUrl: rawEvent.pageUrl,
    pageTitle: rawEvent.pageTitle,
    referrer: rawEvent.referrer,
    
    // User context
    clientId: rawEvent.clientId,
    userId: rawEvent.userId,
    sessionId: rawEvent.sessionId,
    
    // Attribution
    gclid: rawEvent.gclid,
    fbclid: rawEvent.fbclid,
    fbp: rawEvent.fbp, // Facebook Browser Pixel cookie (required for Meta CAPI)
    clickId: rawEvent.clickId,
    
    // Event data
    value: rawEvent.value ? parseFloat(rawEvent.value) : undefined,
    currency: rawEvent.currency,
    transactionId: rawEvent.transactionId,
    
    // Items (products)
    items: rawEvent.items || [],
    
    // Enhanced Conversion / CAPI data
    userData: rawEvent.userData || {},
    
    // Server enrichment
    userAgent: rawEvent.userAgent,
    ipAddress: rawEvent.ipAddress,
    
    // Original raw event (for debugging)
    _raw: rawEvent
  }
  
  return normalized
}

/**
 * Distribute event to all enabled platforms
 */
async function distributeEvent(normalizedEvent, siteConfig) {
  const results = {
    success: true,
    platforms: {},
    gtmEvent: null // For client-side GTM injection
  }
  
  const promises = []
  
  // GTM - Always send (existing system, works alongside S2S)
  promises.push(
    gtmAdapter.sendEvent(normalizedEvent, {})
      .then(result => {
        results.platforms.gtm = { success: true, ...result }
        // Store GTM event for client-side injection
        if (result.shouldPushToClient) {
          results.gtmEvent = result.event
        }
      })
      .catch(error => {
        results.platforms.gtm = { success: false, error: error.message }
        console.error('GTM error:', error)
      })
  )
  
  // Google Ads
  if (siteConfig.googleAds.enabled) {
    const siteKey = `google_ads_${siteConfig.siteId}` // e.g., "google_ads_6" for Gameday
    promises.push(
      googleAdsAdapter.sendEvent(normalizedEvent, siteConfig.googleAds, siteKey)
        .then(result => {
          results.platforms.googleAds = { success: true, ...result }
        })
        .catch(error => {
          results.platforms.googleAds = { success: false, error: error.message }
          console.error('Google Ads error:', error)
        })
    )
  }
  
  // Meta Ads (Facebook)
  if (siteConfig.metaAds.enabled) {
    promises.push(
      metaAdsAdapter.sendEvent(normalizedEvent, siteConfig.metaAds)
        .then(result => {
          results.platforms.metaAds = { success: true, ...result }
        })
        .catch(error => {
          results.platforms.metaAds = { success: false, error: error.message }
          console.error('Meta Ads error:', error)
        })
    )
  }
  
  // GA4
  if (siteConfig.ga4.enabled) {
    promises.push(
      ga4Adapter.sendEvent(normalizedEvent, siteConfig.ga4)
        .then(result => {
          results.platforms.ga4 = { success: true, ...result }
        })
        .catch(error => {
          results.platforms.ga4 = { success: false, error: error.message }
          console.error('GA4 error:', error)
        })
    )
  }
  
  // Wait for all platforms (don't block on failures)
  await Promise.allSettled(promises)
  
  return results
}

/**
 * Main middleware handler
 */
module.exports = function (req, res, next) {
  // Only handle POST requests to tracking endpoint
  if (req.method !== 'POST' || !req.url.startsWith('/webapi/tracking/event')) {
    return next()
  }
  
  // Security: Validate tracking API key header (TEMPORARILY DISABLED - enable after rebuild)
  // TODO: Re-enable after frontend is rebuilt with TRACKING_API_KEY in bundle
  /*
  const expectedApiKey = process.env.TRACKING_API_KEY
  if (expectedApiKey) {
    const providedApiKey = req.headers['x-tracking-api-key']
    if (providedApiKey !== expectedApiKey) {
      console.warn('[Tracking] Invalid or missing API key from:', req.headers.origin || req.headers.referer)
      res.statusCode = 403
      res.setHeader('Content-Type', 'application/json')
      return res.end(JSON.stringify({ 
        success: false,
        error: 'Forbidden: Invalid API key' 
      }))
    }
  }
  */
  
  let body = ''
  req.on('data', chunk => body += chunk.toString())
  
  req.on('end', async () => {
    try {
      const rawEvent = JSON.parse(body)
      
      // Enrich with server-side data
      rawEvent.userAgent = req.headers['user-agent']
      rawEvent.ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress
      
      // Normalize event
      const normalizedEvent = normalizeEvent(rawEvent)
      
      // Get site config
      const siteConfig = SITE_CONFIGS[normalizedEvent.siteId]
      if (!siteConfig) {
        res.statusCode = 400
        res.setHeader('Content-Type', 'application/json')
        return res.end(JSON.stringify({ 
          success: false,
          error: 'Invalid site ID' 
        }))
      }
      
      // Set currency from site config if not provided
      if (!normalizedEvent.currency) {
        normalizedEvent.currency = siteConfig.currency
      }
      
      // Distribute to all enabled platforms
      const results = await distributeEvent(normalizedEvent, siteConfig)
      
      // Log for monitoring
      console.log(`[Tracking] ${normalizedEvent.eventName} - Site ${siteConfig.siteName}:`, {
        gtm: results.platforms.gtm?.success ? '✓' : (results.platforms.gtm?.skipped ? 'X skipped' : '✗ error'),
        googleAds: results.platforms.googleAds?.success ? '✓' : (results.platforms.googleAds?.skipped ? `X skipped: ${results.platforms.googleAds.reason}` : '✗ error'),
        metaAds: results.platforms.metaAds?.success ? '✓' : (results.platforms.metaAds?.skipped ? `X skipped: ${results.platforms.metaAds.reason}` : '✗ error'),
        ga4: results.platforms.ga4?.success ? '✓' : (results.platforms.ga4?.skipped ? 'X skipped' : '✗ error'),
      })
      
      // Return success
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(results))
      
    } catch (error) {
      console.error('Event Hub error:', error)
      res.statusCode = 500
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ 
        success: false,
        error: error.message 
      }))
    }
  })
}

