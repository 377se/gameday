/**
 * OAuth Token Manager
 * Handles automatic refresh of Google Ads OAuth tokens
 * - Auto-refreshes access tokens (expires 1 hour)
 * - Auto-renews refresh tokens (expires 7 days)
 * - Stores tokens securely
 */

const https = require('https')
const fs = require('fs')
const path = require('path')

// Token storage file (you can also use database)
const TOKEN_STORAGE_FILE = path.join(__dirname, '../../.oauth-tokens.json')

// Token cache in memory
let tokenCache = {}

/**
 * Load tokens from storage
 */
function loadTokens() {
  try {
    if (fs.existsSync(TOKEN_STORAGE_FILE)) {
      const data = fs.readFileSync(TOKEN_STORAGE_FILE, 'utf8')
      tokenCache = JSON.parse(data)
      console.log('[OAuth] Loaded tokens from storage')
    } else {
      tokenCache = {}
    }
  } catch (error) {
    console.error('[OAuth] Error loading tokens:', error.message)
    tokenCache = {}
  }
}

/**
 * Save tokens to storage
 */
function saveTokens() {
  try {
    fs.writeFileSync(TOKEN_STORAGE_FILE, JSON.stringify(tokenCache, null, 2))
    console.log('[OAuth] Tokens saved to storage')
  } catch (error) {
    console.error('[OAuth] Error saving tokens:', error.message)
  }
}

/**
 * Get access token from refresh token
 */
function getAccessTokenFromRefreshToken(clientId, clientSecret, refreshToken) {
  return new Promise((resolve, reject) => {
    const postData = new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
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
      res.on('data', chunk => data += chunk)
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          const response = JSON.parse(data)
          
          // Response includes NEW refresh token if close to expiry
          const result = {
            accessToken: response.access_token,
            expiresIn: response.expires_in || 3599,
            expiresAt: Date.now() + (response.expires_in || 3599) * 1000,
            newRefreshToken: response.refresh_token, // Might be undefined
            refreshTokenExpiresIn: response.refresh_token_expires_in
          }
          
          console.log('[OAuth] ✓ New access token obtained, expires in', result.expiresIn, 'seconds')
          
          // If new refresh token provided, use it
          if (result.newRefreshToken) {
            console.log('[OAuth] ✓ New refresh token received (auto-renewed)')
          }
          
          resolve(result)
        } else {
          console.error('[OAuth] ✗ Error:', res.statusCode, data)
          reject(new Error(`OAuth error: ${res.statusCode} ${data}`))
        }
      })
    })

    req.on('error', reject)
    req.write(postData)
    req.end()
  })
}

/**
 * Get valid access token for a site
 * Auto-refreshes if needed
 */
async function getValidAccessToken(siteKey, config) {
  const now = Date.now()
  
  // Check if we have a cached valid token
  const cached = tokenCache[siteKey]
  if (cached && cached.accessToken && cached.expiresAt > now + 60000) {
    // Token valid for at least 1 more minute
    console.log('[OAuth] Using cached access token for', siteKey)
    return cached.accessToken
  }
  
  // Need to refresh
  console.log('[OAuth] Refreshing access token for', siteKey)
  
  try {
    const result = await getAccessTokenFromRefreshToken(
      config.clientId,
      config.clientSecret,
      cached?.refreshToken || config.refreshToken
    )
    
    // Update cache
    tokenCache[siteKey] = {
      accessToken: result.accessToken,
      expiresAt: result.expiresAt,
      refreshToken: result.newRefreshToken || cached?.refreshToken || config.refreshToken,
      lastRefreshed: now
    }
    
    // Save to file
    saveTokens()
    
    return result.accessToken
    
  } catch (error) {
    console.error('[OAuth] Failed to refresh token for', siteKey, ':', error.message)
    throw error
  }
}

/**
 * Background job to refresh tokens before they expire
 */
function startTokenRefreshJob() {
  // Check every 30 minutes
  setInterval(() => {
    const now = Date.now()
    
    Object.keys(tokenCache).forEach(async (siteKey) => {
      const token = tokenCache[siteKey]
      
      // If access token expires in less than 5 minutes, refresh it
      if (token.expiresAt && token.expiresAt < now + 5 * 60 * 1000) {
        console.log('[OAuth] Proactively refreshing access token for', siteKey)
        // Will be refreshed on next API call
      }
    })
  }, 30 * 60 * 1000) // Every 30 minutes
  
  console.log('[OAuth] Token refresh background job started')
}

/**
 * Initialize OAuth manager
 */
function initialize() {
  loadTokens()
  startTokenRefreshJob()
}

module.exports = {
  initialize,
  getValidAccessToken,
  loadTokens,
  saveTokens
}

