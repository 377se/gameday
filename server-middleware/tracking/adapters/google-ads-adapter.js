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
 * Send event to Google Ads via Enhanced Conversions API
 * Note: This is a simplified version. For production, you'd use Google Ads API
 */
async function sendToGoogleAds(gadsEvent, config) {
  return new Promise((resolve, reject) => {
    // For now, we log the event
    // In production, you'd send to Google's Measurement Protocol or use gtag via client
    
    console.log('[Google Ads] Conversion Event:', JSON.stringify({
      conversion_id: config.conversionId,
      event: gadsEvent
    }, null, 2))
    
    // Simulate API call
    resolve({
      platform: 'google_ads',
      sent: true,
      conversion_id: config.conversionId,
      event_name: gadsEvent.send_to
    })
  })
}

/**
 * Main adapter function - sends event to Google Ads
 */
async function sendEvent(event, config) {
  if (!config.conversionId) {
    return {
      skipped: true,
      reason: 'No conversion ID configured'
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
  
  // Send to Google Ads
  try {
    const result = await sendToGoogleAds(gadsEvent, config)
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

