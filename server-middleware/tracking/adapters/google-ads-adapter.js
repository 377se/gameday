/**
 * Google Ads Conversion Tracking Adapter
 * Handles Enhanced Conversions with PII hashing
 */

const crypto = require('crypto')
const https = require('https')

/**
 * Hash PII data according to Google's requirements
 * Must be SHA-256, lowercase, trimmed, no spaces
 */
function hashPII(value) {
  if (!value) return undefined
  
  const normalized = String(value)
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '')
  
  return crypto
    .createHash('sha256')
    .update(normalized)
    .digest('hex')
}

/**
 * Format phone number to E.164 format before hashing
 * E.164: +[country code][number] (e.g., +46701234567)
 */
function formatPhoneNumber(phone, countryCode = '46') {
  if (!phone) return undefined
  
  // Remove all non-digits
  let cleaned = phone.replace(/\D/g, '')
  
  // Add country code if not present
  if (!cleaned.startsWith(countryCode)) {
    cleaned = countryCode + cleaned
  }
  
  return '+' + cleaned
}

/**
 * Build Enhanced Conversion user data
 */
function buildEnhancedConversionData(userData) {
  if (!userData) return undefined
  
  const enhanced = {}
  
  // Email (required for best match rate)
  if (userData.email) {
    enhanced.em = hashPII(userData.email)
  }
  
  // Phone number (E.164 format)
  if (userData.phone) {
    const formatted = formatPhoneNumber(userData.phone, userData.countryCode || '46')
    enhanced.ph = hashPII(formatted)
  }
  
  // Address components
  if (userData.firstName) enhanced.fn = hashPII(userData.firstName)
  if (userData.lastName) enhanced.ln = hashPII(userData.lastName)
  if (userData.street) enhanced.st = hashPII(userData.street)
  if (userData.city) enhanced.ct = hashPII(userData.city)
  if (userData.region) enhanced.rg = hashPII(userData.region)
  if (userData.postalCode) enhanced.zp = hashPII(userData.postalCode)
  if (userData.country) enhanced.country = hashPII(userData.country)
  
  return Object.keys(enhanced).length > 0 ? enhanced : undefined
}

/**
 * Get conversion label based on event name
 */
function getConversionLabel(config, eventName) {
  switch (eventName) {
    case 'purchase':
      return config.purchaseLabel
    case 'add_to_cart':
      return config.addToCartLabel
    case 'begin_checkout':
      return config.beginCheckoutLabel
    default:
      return null
  }
}

/**
 * Map event to Google Ads format
 */
function mapEventToGoogleAds(event, config) {
  const conversionLabel = getConversionLabel(config, event.eventName)
  
  if (!conversionLabel) {
    return null // This event doesn't need conversion tracking
  }
  
  const gadsEvent = {
    // Conversion tracking
    send_to: `${config.conversionId}/${conversionLabel}`,
    
    // Transaction data
    value: event.value,
    currency: event.currency,
    transaction_id: event.transactionId,
    
    // Attribution
    gclid: event.gclid,
    
    // Items for dynamic remarketing
    items: event.items?.map(item => ({
      id: item.id || item.ProductId,
      google_business_vertical: 'retail'
    }))
  }
  
  // Enhanced Conversion data
  if (event.userData && Object.keys(event.userData).length > 0) {
    gadsEvent.user_data = buildEnhancedConversionData(event.userData)
  }
  
  return gadsEvent
}

/**
 * Send Enhanced Conversion to Google Ads API
 * Uses Google Ads Enhanced Conversions REST API
 * Endpoint: https://googleads.googleapis.com/v15/customers/{customer_id}/conversionUploads:uploadClickConversions
 */
async function sendToGoogleAds(gadsEvent, config, event) {
  return new Promise((resolve, reject) => {
    // Extract customer ID from conversion ID (AW-123456789 → 123456789)
    const customerId = config.conversionId.replace('AW-', '').replace(/-/g, '')
    
    // Build Enhanced Conversions API payload
    const payload = {
      conversions: [{
        // Conversion action (from conversion label)
        conversionAction: `customers/${customerId}/conversionActions/${config.conversionId}`,
        
        // Conversion value
        conversionValue: gadsEvent.value,
        currencyCode: gadsEvent.currency,
        
        // Click identifier (gclid)
        gclid: gadsEvent.gclid,
        
        // Conversion time (ISO 8601)
        conversionDateTime: new Date(event.timestamp).toISOString(),
        
        // Enhanced conversion data (hashed user data)
        userIdentifiers: gadsEvent.user_data ? [
          {
            hashedEmail: gadsEvent.user_data.em,
            hashedPhoneNumber: gadsEvent.user_data.ph,
            addressInfo: {
              hashedFirstName: gadsEvent.user_data.fn,
              hashedLastName: gadsEvent.user_data.ln,
              hashedStreetAddress: gadsEvent.user_data.st,
              city: gadsEvent.user_data.ct,
              state: gadsEvent.user_data.rg,
              postalCode: gadsEvent.user_data.zp,
              countryCode: gadsEvent.user_data.country
            }
          }
        ] : undefined,
        
        // Cart data for dynamic remarketing
        cartData: gadsEvent.items ? {
          items: gadsEvent.items
        } : undefined
      }],
      partialFailure: true
    }
    
    const postData = JSON.stringify(payload)
    
    // Google Ads API endpoint
    const options = {
      hostname: 'googleads.googleapis.com',
      port: 443,
      path: `/v15/customers/${customerId}/conversionUploads:uploadClickConversions`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
        'Authorization': `Bearer ${config.accessToken}`, // OAuth token
        'developer-token': config.developerToken,
        'login-customer-id': customerId
      }
    }
    
    console.log('[Google Ads] Sending Enhanced Conversion to API:', {
      customer_id: customerId,
      conversion_action: gadsEvent.send_to,
      has_gclid: !!gadsEvent.gclid,
      has_enhanced_data: !!gadsEvent.user_data,
      value: gadsEvent.value
    })
    
    const req = https.request(options, (res) => {
      let data = ''
      res.on('data', chunk => data += chunk)
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          console.log('[Google Ads] ✓ Conversion sent successfully')
          resolve({
            platform: 'google_ads',
            success: true,
            statusCode: res.statusCode,
            conversion_id: config.conversionId,
            response: JSON.parse(data || '{}')
          })
        } else {
          console.error('[Google Ads] ✗ API Error:', res.statusCode, data)
          reject(new Error(`Google Ads API error: ${res.statusCode} ${data}`))
        }
      })
    })
    
    req.on('error', (error) => {
      console.error('[Google Ads] ✗ Request error:', error)
      reject(error)
    })
    
    req.write(postData)
    req.end()
  })
}

/**
 * Main adapter function - sends event to Google Ads API
 */
async function sendEvent(event, config) {
  if (!config.conversionId) {
    return {
      skipped: true,
      reason: 'No conversion ID configured'
    }
  }
  
  if (!config.accessToken || !config.developerToken) {
    console.warn('[Google Ads] Missing API credentials - skipping server-side send')
    return {
      skipped: true,
      reason: 'Missing Google Ads API credentials (accessToken or developerToken)'
    }
  }
  
  // Map event to Google Ads format
  const gadsEvent = mapEventToGoogleAds(event, config)
  
  if (!gadsEvent) {
    return {
      skipped: true,
      reason: 'Event not tracked in Google Ads'
    }
  }
  
  // Require gclid for conversion tracking
  if (!gadsEvent.gclid) {
    console.warn('[Google Ads] No gclid - cannot attribute conversion')
    return {
      skipped: true,
      reason: 'No gclid for attribution'
    }
  }
  
  // Send to Google Ads API
  try {
    const result = await sendToGoogleAds(gadsEvent, config, event)
    return result
  } catch (error) {
    console.error('[Google Ads] Error:', error)
    throw error
  }
}

module.exports = {
  sendEvent,
  hashPII,
  formatPhoneNumber,
  buildEnhancedConversionData
}

