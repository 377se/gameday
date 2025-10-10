/**
 * Google Analytics 4 Measurement Protocol Adapter
 * Handles server-side GA4 event tracking
 * 
 * TODO: Implement when adding GA4 server-side tracking
 */

const https = require('https')

/**
 * Map event name to GA4 format (already compatible)
 */
function mapEventName(eventName) {
  // GA4 uses same event names as our standard
  return eventName
}

/**
 * Build GA4 Measurement Protocol payload
 */
function buildGA4Event(event, config) {
  return {
    client_id: event.clientId || `${Date.now()}.${Math.random().toString(36).substring(2)}`,
    user_id: event.userId,
    timestamp_micros: event.timestamp * 1000,
    
    // User properties
    user_properties: {
      site_id: { value: event.siteId },
      site_name: { value: event.siteName }
    },
    
    // Events
    events: [{
      name: mapEventName(event.eventName),
      params: {
        // E-commerce parameters
        currency: event.currency,
        value: event.value,
        transaction_id: event.transactionId,
        
        // Page parameters
        page_location: event.pageUrl,
        page_title: event.pageTitle,
        page_referrer: event.referrer,
        
        // Items
        items: event.items?.map(item => ({
          item_id: item.id,
          item_name: item.name,
          item_category: item.category,
          item_brand: item.brand,
          price: item.price,
          quantity: item.quantity
        })) || [],
        
        // Attribution
        gclid: event.gclid,
        fbclid: event.fbclid,
        
        // Session
        session_id: event.sessionId,
        
        // Custom parameters
        ...event.customParams
      }
    }]
  }
}

/**
 * Send event to GA4 Measurement Protocol
 */
async function sendToGA4(ga4Event, config) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(ga4Event)
    
    const options = {
      hostname: 'www.google-analytics.com',
      port: 443,
      path: `/mp/collect?measurement_id=${config.measurementId}&api_secret=${config.apiSecret}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    }
    
    console.log('[GA4] Sending to Measurement Protocol:', {
      measurement_id: config.measurementId,
      event_name: ga4Event.events[0].name,
      value: ga4Event.events[0].params?.value
    })
    
    const req = https.request(options, (res) => {
      let data = ''
      res.on('data', chunk => data += chunk)
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          console.log('[GA4] ✓ Event sent successfully')
          resolve({ 
            platform: 'ga4', 
            success: true, 
            statusCode: res.statusCode,
            measurement_id: config.measurementId,
            event_name: ga4Event.events[0].name
          })
        } else {
          console.error('[GA4] ✗ API Error:', res.statusCode, data)
          reject(new Error(`GA4 API error: ${res.statusCode} ${data}`))
        }
      })
    })
    
    req.on('error', (error) => {
      console.error('[GA4] ✗ Request error:', error)
      reject(error)
    })
    
    req.write(postData)
    req.end()
  })
}

/**
 * Main adapter function
 */
async function sendEvent(event, config) {
  if (!config.measurementId || !config.apiSecret) {
    return {
      skipped: true,
      reason: 'GA4 not configured'
    }
  }
  
  try {
    const ga4Event = buildGA4Event(event, config)
    const result = await sendToGA4(ga4Event, config)
    return result
  } catch (error) {
    console.error('[GA4] Error:', error)
    throw error
  }
}

module.exports = {
  sendEvent,
  mapEventName,
  buildGA4Event
}

