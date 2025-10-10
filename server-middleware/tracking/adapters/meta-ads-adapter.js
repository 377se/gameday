/**
 * Meta Ads (Facebook) Conversion API Adapter
 * Handles Facebook CAPI (Conversions API) events
 * 
 * TODO: Implement when adding Meta Ads tracking
 */

const crypto = require('crypto')
const https = require('https')

/**
 * Normalize IP address for Meta CAPI
 * Meta requires valid IPv4 or IPv6, rejects localhost/private IPs
 */
function normalizeIpAddress(ipAddress) {
  if (!ipAddress) return undefined
  
  // If x-forwarded-for has multiple IPs (comma-separated), take the first one
  const ip = ipAddress.split(',')[0].trim()
  
  // Reject localhost/private IPs
  if (ip === '127.0.0.1' || 
      ip === '::1' || 
      ip.startsWith('192.168.') || 
      ip.startsWith('10.') ||
      ip.startsWith('172.16.') ||
      ip.startsWith('::ffff:127.') ||
      ip.startsWith('::ffff:192.168.')) {
    return undefined // Don't send private IPs to Meta
  }
  
  // Remove IPv6 prefix if present (::ffff:123.45.67.89 → 123.45.67.89)
  if (ip.startsWith('::ffff:')) {
    return ip.substring(7)
  }
  
  return ip
}

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
  const payload = {
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
      client_ip_address: normalizeIpAddress(event.ipAddress),
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
      order_id: event.transactionId, // For deduplication
      content_ids: event.items?.map(item => item.id) || [],
      content_type: 'product',
      contents: event.items?.map(item => ({
        id: item.id,
        quantity: item.quantity,
        item_price: item.price
      })) || []
    }
  }
  
  // Add event_id only if client sent it (for client/server deduplication)
  if (event.eventId) {
    payload.event_id = event.eventId
  }
  
  return payload
}

/**
 * Send event to Facebook Conversions API (CAPI)
 * Full server-side implementation
 */
async function sendToFacebook(fbEvent, config) {
  return new Promise((resolve, reject) => {
    // Don't include access_token in body - send via query string instead
    const payload = {
      data: [fbEvent]
    }
    
    const postData = JSON.stringify(payload)
    
    const options = {
      hostname: 'graph.facebook.com',
      port: 443,
      path: `/v21.0/${config.pixelId}/events?access_token=${config.accessToken}`, // Access token in URL
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    }
    
    console.log('[Meta Ads] Sending to CAPI:', {
      pixel_id: config.pixelId,
      event_name: fbEvent.event_name,
      has_user_data: !!fbEvent.user_data?.em,
      has_fbc: !!fbEvent.user_data?.fbc,
      has_fbp: !!fbEvent.user_data?.fbp,
      value: fbEvent.custom_data?.value
    })
    
    const req = https.request(options, (res) => {
      let data = ''
      res.on('data', chunk => data += chunk)
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          const response = JSON.parse(data || '{}')
          console.log('[Meta Ads] ✓ Event sent successfully:', response)
          resolve({
            platform: 'meta_ads',
            success: true,
            statusCode: res.statusCode,
            pixel_id: config.pixelId,
            event_name: fbEvent.event_name,
            response
          })
        } else {
          console.error('[Meta Ads] ✗ API Error:', res.statusCode, data)
          reject(new Error(`Meta CAPI error: ${res.statusCode} ${data}`))
        }
      })
    })
    
    req.on('error', (error) => {
      console.error('[Meta Ads] ✗ Request error:', error)
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
  normalizeIpAddress,
  mapEventName,
  buildFacebookEvent
}

