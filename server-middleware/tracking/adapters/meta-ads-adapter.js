/**
 * Meta Ads (Facebook) Conversion API Adapter
 * Handles Facebook CAPI (Conversions API) events
 * 
 * TODO: Implement when adding Meta Ads tracking
 */

const crypto = require('crypto')
const https = require('https')

/**
 * Hash user data for Facebook CAPI (SHA-256, lowercase)
 */
function hashUserData(value) {
  if (!value) return undefined
  
  const normalized = String(value)
    .toLowerCase()
    .trim()
  
  return crypto
    .createHash('sha256')
    .update(normalized)
    .digest('hex')
}

/**
 * Map event name to Facebook standard event
 */
function mapEventName(eventName) {
  const eventMap = {
    'page_view': 'PageView',
    'view_item': 'ViewContent',
    'view_item_list': 'ViewContent',
    'add_to_cart': 'AddToCart',
    'begin_checkout': 'InitiateCheckout',
    'purchase': 'Purchase'
  }
  
  return eventMap[eventName] || 'CustomEvent'
}

/**
 * Build Facebook CAPI event payload
 */
function buildFacebookEvent(event, config) {
  return {
    event_name: mapEventName(event.eventName),
    event_time: Math.floor(event.timestamp / 1000),
    event_source_url: event.pageUrl,
    action_source: 'website',
    
    // User data (hashed for privacy)
    user_data: {
      em: event.userData?.email ? hashUserData(event.userData.email) : undefined,
      ph: event.userData?.phone ? hashUserData(event.userData.phone) : undefined,
      fn: event.userData?.firstName ? hashUserData(event.userData.firstName) : undefined,
      ln: event.userData?.lastName ? hashUserData(event.userData.lastName) : undefined,
      ct: event.userData?.city ? hashUserData(event.userData.city) : undefined,
      st: event.userData?.region ? hashUserData(event.userData.region) : undefined,
      zp: event.userData?.postalCode ? hashUserData(event.userData.postalCode) : undefined,
      country: event.userData?.country ? hashUserData(event.userData.country) : undefined,
      client_ip_address: event.ipAddress,
      client_user_agent: event.userAgent,
      // Facebook click identifier (from _fbc cookie or fbclid parameter)
      fbc: event.fbclid ? `fb.1.${event.timestamp}.${event.fbclid}` : undefined,
      // Facebook browser pixel (_fbp cookie - required for CAPI)
      fbp: event.fbp
    },
    
    // Custom data
    custom_data: {
      currency: event.currency,
      value: event.value,
      content_ids: event.items?.map(item => item.id) || [],
      content_type: 'product',
      contents: event.items?.map(item => ({
        id: item.id,
        quantity: item.quantity,
        item_price: item.price
      })) || []
    }
  }
}

/**
 * Send event to Facebook CAPI
 */
async function sendToFacebook(fbEvent, config) {
  return new Promise((resolve, reject) => {
    const payload = {
      data: [fbEvent],
      access_token: config.accessToken
    }
    
    const postData = JSON.stringify(payload)
    
    const options = {
      hostname: 'graph.facebook.com',
      port: 443,
      path: `/v18.0/${config.pixelId}/events`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    }
    
    // For now, just log (implement actual API call when adding Meta)
    console.log('[Meta Ads] CAPI Event:', JSON.stringify({
      pixel_id: config.pixelId,
      event: fbEvent
    }, null, 2))
    
    resolve({
      platform: 'meta_ads',
      sent: true,
      pixel_id: config.pixelId,
      event_name: fbEvent.event_name
    })
    
    /* Uncomment when implementing:
    const req = https.request(options, (res) => {
      let data = ''
      res.on('data', chunk => data += chunk)
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve({ success: true, response: JSON.parse(data) })
        } else {
          reject(new Error(`Facebook CAPI error: ${res.statusCode} ${data}`))
        }
      })
    })
    
    req.on('error', reject)
    req.write(postData)
    req.end()
    */
  })
}

/**
 * Main adapter function
 */
async function sendEvent(event, config) {
  if (!config.pixelId || !config.accessToken) {
    return {
      skipped: true,
      reason: 'Meta Ads not configured'
    }
  }
  
  try {
    const fbEvent = buildFacebookEvent(event, config)
    const result = await sendToFacebook(fbEvent, config)
    return result
  } catch (error) {
    console.error('[Meta Ads] Error:', error)
    throw error
  }
}

module.exports = {
  sendEvent,
  hashUserData,
  mapEventName,
  buildFacebookEvent
}

