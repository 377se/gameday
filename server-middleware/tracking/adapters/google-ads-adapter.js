/**
 * Google Ads S2S Conversion Tracking Adapter
 * Uses official google-ads-api library for server-to-server conversion uploads
 * Handles Enhanced Conversions with PII hashing
 */

const crypto = require('crypto')

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
function buildEnhancedConversionData(userData, externalId) {
  if (!userData && !externalId) return undefined
  
  const enhanced = {}
  
  // External ID (first-party user identifier for better matching)
  if (externalId) {
    enhanced.external_id = externalId
  }
  
  // Email (required for best match rate)
  if (userData?.email) {
    enhanced.em = hashPII(userData.email)
  }
  
  // Phone number (E.164 format)
  if (userData?.phone) {
    const formatted = formatPhoneNumber(userData.phone, userData.countryCode || '46')
    enhanced.ph = hashPII(formatted)
  }
  
  // Address components
  if (userData?.firstName) enhanced.fn = hashPII(userData.firstName)
  if (userData?.lastName) enhanced.ln = hashPII(userData.lastName)
  if (userData?.street) enhanced.st = hashPII(userData.street)
  if (userData?.city) enhanced.ct = hashPII(userData.city)
  if (userData?.region) enhanced.rg = hashPII(userData.region)
  if (userData?.postalCode) enhanced.zp = hashPII(userData.postalCode)
  if (userData?.country) enhanced.country = hashPII(userData.country)
  
  return Object.keys(enhanced).length > 0 ? enhanced : undefined
}

/**
 * Get S2S conversion action ID based on event name
 * Returns the conversion action resource name for S2S API uploads
 */
function getConversionActionId(config, eventName) {
  switch (eventName) {
    case 'purchase':
      return config.purchaseConversionActionId
    case 'add_to_cart':
      return config.addToCartConversionActionId
    case 'page_view':
      return config.pageViewConversionActionId
    default:
      return null
  }
}

/**
 * Map event to Google Ads S2S format
 */
function mapEventToGoogleAds(event, config) {
  const conversionActionId = getConversionActionId(config, event.eventName)
  
  if (!conversionActionId) {
    return null // This event doesn't have a configured S2S conversion action
  }
  
  // Build S2S conversion data
  const gadsEvent = {
    // Conversion action ID (not label - we use S2S API now!)
    conversionActionId: conversionActionId,
    
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
  
  // Enhanced Conversion data (hashed user data + external ID)
  const userData = buildEnhancedConversionData(event.userData, event.externalId)
  if (userData) {
    gadsEvent.user_data = userData
  }
  
  return gadsEvent
}

/**
 * Get OAuth access token
 */
async function getAccessToken(config) {
  const https = require('https')
  
  return new Promise((resolve, reject) => {
    const postData = new URLSearchParams({
      client_id: config.clientId,
      client_secret: config.clientSecret,
      refresh_token: config.refreshToken,
      grant_type: 'refresh_token'
    }).toString()

    const options = {
      hostname: 'oauth2.googleapis.com',
      port: 443,
      path: '/token',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
      }
    }

    const req = https.request(options, (res) => {
      let data = ''
      res.on('data', (chunk) => { data = data + chunk })
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          const response = JSON.parse(data)
          resolve(response.access_token)
        } else {
          reject(new Error('OAuth error: ' + res.statusCode + ' ' + data))
        }
      })
    })

    req.on('error', reject)
    req.write(postData)
    req.end()
  })
}

/**
 * Send S2S Conversion to Google Ads API
 * Uses REST API instead of library (Node 14 compatible)
 */
async function sendToGoogleAds(gadsEvent, config, event) {
  const https = require('https')
  
  try {
    // Get OAuth access token
    const accessToken = await getAccessToken(config)
    
    // Build conversion payload
    const conversion = {
      gclid: gadsEvent.gclid,
      conversion_action: 'customers/' + config.customerId + '/conversionActions/' + gadsEvent.conversionActionId,
      conversion_date_time: new Date(event.timestamp).toISOString().replace('T', ' ').substring(0, 19) + '+00:00',
      conversion_value: gadsEvent.value || 0,
      currency_code: gadsEvent.currency,
      order_id: gadsEvent.transaction_id || event.eventId || 'event-' + Date.now()
    }
    
    // Add enhanced conversion data (hashed PII) if available
    if (gadsEvent.user_data) {
      const userIdentifiers = []
      
      if (gadsEvent.user_data.external_id) {
        userIdentifiers.push({ 
          user_identifier: gadsEvent.user_data.external_id 
        })
      }
      
      if (gadsEvent.user_data.em) {
        userIdentifiers.push({ hashed_email: gadsEvent.user_data.em })
      }
      if (gadsEvent.user_data.ph) {
        userIdentifiers.push({ hashed_phone_number: gadsEvent.user_data.ph })
      }
      if (gadsEvent.user_data.fn || gadsEvent.user_data.ln) {
        userIdentifiers.push({
          address_info: {
            hashed_first_name: gadsEvent.user_data.fn,
            hashed_last_name: gadsEvent.user_data.ln,
            hashed_street_address: gadsEvent.user_data.st,
            city: gadsEvent.user_data.ct,
            state: gadsEvent.user_data.rg,
            postal_code: gadsEvent.user_data.zp,
            country_code: gadsEvent.user_data.country
          }
        })
      }
      
      if (userIdentifiers.length > 0) {
        conversion.user_identifiers = userIdentifiers
      }
    }
    
    console.log('[Google Ads] Uploading S2S conversion:', {
      customer_id: config.customerId,
      conversion_action: conversion.conversion_action,
      event_name: event.eventName,
      has_gclid: !!gadsEvent.gclid,
      has_enhanced_data: !!gadsEvent.user_data,
      has_external_id: !!(gadsEvent.user_data && gadsEvent.user_data.external_id),
      value: gadsEvent.value
    })
    
    // Upload conversion using REST API
    const payload = {
      conversions: [conversion],
      partial_failure: true
    }
    
    const postData = JSON.stringify(payload)
    
    const options = {
      hostname: 'googleads.googleapis.com',
      port: 443,
      path: '/v16/customers/' + config.customerId + ':uploadClickConversions',
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'developer-token': config.developerToken,
        'login-customer-id': config.managerAccountId || config.customerId,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    }
    
    return new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        let data = ''
        res.on('data', (chunk) => { data = data + chunk })
        res.on('end', () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            console.log('[Google Ads] ✓ S2S conversion uploaded successfully')
            resolve({
              platform: 'google_ads',
              success: true,
              conversion_action_id: gadsEvent.conversionActionId,
              response: JSON.parse(data)
            })
          } else {
            console.error('[Google Ads] ✗ API Error:', res.statusCode, data)
            reject(new Error('Google Ads API error: ' + res.statusCode + ' ' + data))
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
    
  } catch (error) {
    console.error('[Google Ads] ✗ S2S upload error:', error.message)
    throw error
  }
}

/**
 * Main adapter function - sends event to Google Ads S2S API
 * Now uses official google-ads-api library
 */
async function sendEvent(event, config, siteKey) {
  // Check for required account configuration
  if (!config.customerId) {
    return {
      skipped: true,
      reason: 'No customer ID configured'
    }
  }
  
  // Check for required OAuth credentials
  if (!config.developerToken || !config.clientId || !config.clientSecret || !config.refreshToken) {
    console.warn('[Google Ads] Missing OAuth credentials - skipping')
    return {
      skipped: true,
      reason: 'Missing Google Ads OAuth credentials (need: developerToken, clientId, clientSecret, refreshToken)'
    }
  }
  
  // Map event to Google Ads S2S format
  const gadsEvent = mapEventToGoogleAds(event, config)
  
  if (!gadsEvent) {
    // Event not configured for S2S tracking (no conversion action ID)
    return {
      skipped: true,
      reason: `Event '${event.eventName}' not configured for S2S (no conversion action ID)`
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
  
  // Send to Google Ads S2S API
  try {
    const result = await sendToGoogleAds(gadsEvent, config, event)
    return result
  } catch (error) {
    console.error('[Google Ads] S2S upload error:', error.message)
    throw error
  }
}

module.exports = {
  sendEvent,
  hashPII,
  formatPhoneNumber,
  buildEnhancedConversionData
}

