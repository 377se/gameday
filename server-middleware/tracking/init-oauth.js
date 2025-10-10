/**
 * OAuth Initialization Script
 * One-time setup to get initial refresh tokens for all sites
 * 
 * Usage:
 *   node server-middleware/tracking/init-oauth.js
 * 
 * This will:
 * 1. Start a local server on http://localhost:3001
 * 2. Open OAuth flow for each site
 * 3. Get refresh tokens
 * 4. Save to .oauth-tokens.json
 * 
 * Run this ONCE per site to get initial tokens
 */

const https = require('https')
const http = require('http')
const url = require('url')
const fs = require('fs')
const path = require('path')

// Load site configs from event-hub
const SITES = {
  1: {
    name: 'Supporters Place',
    clientId: process.env.GOOGLE_ADS_CLIENT_ID_SP,
    clientSecret: process.env.GOOGLE_ADS_CLIENT_SECRET_SP,
  },
  2: {
    name: 'Sam Dodds',
    clientId: process.env.GOOGLE_ADS_CLIENT_ID_SAMDODDS,
    clientSecret: process.env.GOOGLE_ADS_CLIENT_SECRET_SAMDODDS,
  },
  3: {
    name: 'Kopshop',
    clientId: process.env.GOOGLE_ADS_CLIENT_ID_KOPSHOP,
    clientSecret: process.env.GOOGLE_ADS_CLIENT_SECRET_KOPSHOP,
  },
  6: {
    name: 'Gameday',
    clientId: process.env.GOOGLE_ADS_CLIENT_ID_GAMEDAY,
    clientSecret: process.env.GOOGLE_ADS_CLIENT_SECRET_GAMEDAY,
  },
  7: {
    name: 'Supporterprylar',
    clientId: process.env.GOOGLE_ADS_CLIENT_ID_SUPPORTERPRYLAR,
    clientSecret: process.env.GOOGLE_ADS_CLIENT_SECRET_SUPPORTERPRYLAR,
  },
  8: {
    name: 'StreetWeek',
    clientId: process.env.GOOGLE_ADS_CLIENT_ID_STREETWEEK,
    clientSecret: process.env.GOOGLE_ADS_CLIENT_SECRET_STREETWEEK,
  }
}

const REDIRECT_URI = 'http://localhost:3001/oauth/callback'
const SCOPES = 'https://www.googleapis.com/auth/adwords'

let currentSite = null
let tokens = {}

/**
 * Exchange authorization code for tokens
 */
function exchangeCodeForTokens(code, site) {
  return new Promise((resolve, reject) => {
    const postData = new URLSearchParams({
      code,
      client_id: site.clientId,
      client_secret: site.clientSecret,
      redirect_uri: REDIRECT_URI,
      grant_type: 'authorization_code'
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
          resolve(JSON.parse(data))
        } else {
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
 * Save tokens to file
 */
function saveTokensToFile() {
  const tokenFile = path.join(__dirname, '../../.oauth-tokens.json')
  fs.writeFileSync(tokenFile, JSON.stringify(tokens, null, 2))
  console.log('\n✅ Tokens saved to .oauth-tokens.json')
}

/**
 * Start OAuth server
 */
function startOAuthServer() {
  const server = http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url, true)
    
    if (parsedUrl.pathname === '/oauth/callback') {
      const code = parsedUrl.query.code
      
      if (!code) {
        res.writeHead(400, { 'Content-Type': 'text/html' })
        res.end('<h1>Error: No authorization code</h1>')
        return
      }
      
      try {
        console.log('\n✓ Authorization code received')
        console.log('  Exchanging for tokens...')
        
        const tokenResponse = await exchangeCodeForTokens(code, currentSite)
        
        // Store tokens
        tokens[`google_ads_${currentSite.id}`] = {
          accessToken: tokenResponse.access_token,
          refreshToken: tokenResponse.refresh_token,
          expiresAt: Date.now() + (tokenResponse.expires_in || 3599) * 1000,
          lastRefreshed: Date.now()
        }
        
        console.log('✅ Tokens received for', currentSite.name)
        console.log('   Access Token:', tokenResponse.access_token.substring(0, 20) + '...')
        console.log('   Refresh Token:', tokenResponse.refresh_token.substring(0, 20) + '...')
        console.log('   Expires in:', tokenResponse.expires_in, 'seconds')
        
        // Save to file
        saveTokensToFile()
        
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end(`
          <h1>✅ Success!</h1>
          <p>Tokens obtained for <strong>${currentSite.name}</strong></p>
          <p>Access Token: ${tokenResponse.access_token.substring(0, 30)}...</p>
          <p>Refresh Token: ${tokenResponse.refresh_token.substring(0, 30)}...</p>
          <p><strong>Tokens saved to .oauth-tokens.json</strong></p>
          <p>You can close this window and check the terminal.</p>
        `)
        
      } catch (error) {
        console.error('❌ Error exchanging code:', error.message)
        res.writeHead(500, { 'Content-Type': 'text/html' })
        res.end(`<h1>❌ Error</h1><p>${error.message}</p>`)
      }
    } else {
      res.writeHead(404)
      res.end('Not found')
    }
  })
  
  server.listen(3001, () => {
    console.log('🚀 OAuth server started on http://localhost:3001')
  })
  
  return server
}

/**
 * Generate OAuth URL
 */
function getOAuthUrl(site) {
  const params = new URLSearchParams({
    client_id: site.clientId,
    redirect_uri: REDIRECT_URI,
    response_type: 'code',
    scope: SCOPES,
    access_type: 'offline', // Important! Gets refresh token
    prompt: 'consent' // Force consent to get refresh token
  })
  
  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`
}

/**
 * Main setup flow
 */
async function setupOAuth() {
  console.log('═══════════════════════════════════════════')
  console.log('  Google Ads OAuth Setup')
  console.log('═══════════════════════════════════════════\n')
  
  // Start OAuth callback server
  const server = startOAuthServer()
  
  console.log('\n📋 Setup Instructions:\n')
  console.log('For each site, you need to:')
  console.log('1. Open the OAuth URL in your browser')
  console.log('2. Log in with your Google Ads account')
  console.log('3. Click "Allow" to grant permissions')
  console.log('4. Tokens will be saved automatically\n')
  console.log('═══════════════════════════════════════════\n')
  
  // Generate URLs for all sites
  Object.entries(SITES).forEach(([siteId, site]) => {
    if (!site.clientId || !site.clientSecret) {
      console.log(`⊘ Site ${siteId} (${site.name}): Missing OAuth credentials - skipping`)
      return
    }
    
    currentSite = { id: siteId, ...site }
    const authUrl = getOAuthUrl(site)
    
    console.log(`\n🔗 ${site.name} (Site ${siteId}):`)
    console.log(`   ${authUrl}`)
    console.log('')
  })
  
  console.log('\n═══════════════════════════════════════════')
  console.log('Open the URLs above to authorize each site')
  console.log('Press Ctrl+C when done')
  console.log('═══════════════════════════════════════════\n')
}

// Run setup
setupOAuth()

