<template>
  <div>
    <p v-if="loggedIn">Logging in...</p>
    <div v-else>
      <p>You are not logged in.</p>
      <button @click="loginWithSubrite" class="uk-button uk-button-primary">Login with Subrite</button>
      <!-- Fallback direct link for testing -->
      <p class="uk-margin-top">
        <small>
          Or <a :href="subriteLoginUrl" class="uk-link">click here for direct Subrite login</a>
        </small>
      </p>

      <!-- Debug / Manual Test Panel -->
      <div class="uk-card uk-card-default uk-card-body uk-margin" v-if="debug.show">
        <h4 class="uk-margin-remove">PKCE Debug</h4>
        <div class="uk-text-small uk-margin-small">code_verifier (current tab):</div>
        <pre><code>{{ debug.verifier || '(none)' }}</code></pre>
        <div class="uk-text-small uk-margin-small">state (current tab):</div>
        <pre><code>{{ debug.state || '(none)' }}</code></pre>

        <div class="uk-margin">
          <button class="uk-button uk-button-default uk-margin-small-right" @click="startLoginInNewTab">Open Subrite login in new tab</button>
          <button class="uk-button uk-button-text" @click="refreshDebug">Refresh values</button>
        </div>

        <div class="uk-margin">
          <div class="uk-text-small uk-margin-small">Paste code and state from the redirected URL (new tab):</div>
          <input class="uk-input uk-margin-small" placeholder="code from URL" v-model="debug.manualCode" />
          <input class="uk-input uk-margin-small" placeholder="state from URL (optional)" v-model="debug.manualState" />
          <div class="uk-text-small uk-margin-small">Manual token exchange curl:</div>
          <pre><code>{{ debug.manualCurl }}</code></pre>
        </div>
      </div>

      <button class="uk-button uk-button-text uk-margin-top" @click="toggleDebug">{{ debug.show ? 'Hide' : 'Show' }} PKCE debug</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loggedIn: false
    };
  },
  
  computed: {
    subriteLoginUrl() {
      // Fallback direct URL construction for testing
      const subriteUrl = process.env.SUBRITE_URL || 'https://stage.minside.liverpool.no'
      const clientId = process.env.SUBRITE_CLIENT_ID || '7b35e1436d73411880f2'
      const redirectUri = encodeURIComponent(process.env.SUBRITE_REDIRECT_URI || 'https://kopshop.no/callback/subrite/login')
      
      return `${subriteUrl}/api/oidc/auth?client_id=${clientId}&scope=openid%20offline_access&response_type=code&redirect_uri=${redirectUri}&code_challenge_method=S256`
    }
  },
  
  methods: {
    toggleDebug() {
      this.debug.show = !this.debug.show
      if (this.debug.show) {
        this.refreshDebug()
      }
    },

    refreshDebug() {
      this.debug.verifier = sessionStorage.getItem('subrite_pkce_verifier') || ''
      this.debug.state = sessionStorage.getItem('subrite_oauth_state') || ''
      this.buildManualCurl()
    },

    buildManualCurl() {
      const tokenEndpoint = (process.env.SUBRITE_URL || 'https://stage.minside.liverpool.no') + '/api/oidc/token'
      const clientId = process.env.SUBRITE_CLIENT_ID || '7b35e1436d73411880f2'
      const redirectUri = process.env.SUBRITE_REDIRECT_URI || 'https://kopshop.no/callback/subrite/login'
      const code = this.debug.manualCode || ''
      const verifier = this.debug.verifier || ''

      if (!verifier || !code) {
        this.debug.manualCurl = '(Waiting for code and code_verifier)'
        return
      }

      const parts = [
        'curl -X POST',
        `'${tokenEndpoint}'`,
        "-H 'Content-Type: application/x-www-form-urlencoded'",
        "-d 'grant_type=authorization_code'",
        `-d 'code=${encodeURIComponent(code)}'`,
        `-d 'redirect_uri=${encodeURIComponent(redirectUri)}'`,
        `-d 'client_id=${encodeURIComponent(clientId)}'`,
        `-d 'code_verifier=${encodeURIComponent(verifier)}'`
      ]
      this.debug.manualCurl = parts.join(' ')
    },

    async loginWithSubrite() {
      try {
        const subriteUrl = process.env.SUBRITE_URL || 'https://stage.minside.liverpool.no'
        const clientId = process.env.SUBRITE_CLIENT_ID || '7b35e1436d73411880f2'
        const redirectUri = process.env.SUBRITE_REDIRECT_URI || 'https://kopshop.no/callback/subrite/login'

        const codeVerifier = this.generateCodeVerifier(64)
        sessionStorage.setItem('subrite_pkce_verifier', codeVerifier)

        const codeChallenge = await this.generateCodeChallenge(codeVerifier)
        const state = this.generateState(32)
        sessionStorage.setItem('subrite_oauth_state', state)

        const authUrl = `${subriteUrl}/api/oidc/auth?` +
          `client_id=${encodeURIComponent(clientId)}` +
          `&scope=${encodeURIComponent('openid offline_access')}` +
          `&response_type=code` +
          `&redirect_uri=${encodeURIComponent(redirectUri)}` +
          `&code_challenge=${encodeURIComponent(codeChallenge)}` +
          `&code_challenge_method=S256` +
          `&state=${encodeURIComponent(state)}`

        window.location.href = authUrl
      } catch (error) {
        console.error('Error starting Subrite login:', error)
        // Fallback to direct redirect (will not work without code_challenge)
        window.location.href = this.subriteLoginUrl
      }
    },

    async startLoginInNewTab() {
      try {
        const subriteUrl = process.env.SUBRITE_URL || 'https://stage.minside.liverpool.no'
        const clientId = process.env.SUBRITE_CLIENT_ID || '7b35e1436d73411880f2'
        const redirectUri = process.env.SUBRITE_REDIRECT_URI || 'https://kopshop.no/callback/subrite/login'

        const codeVerifier = this.generateCodeVerifier(64)
        sessionStorage.setItem('subrite_pkce_verifier', codeVerifier)

        const codeChallenge = await this.generateCodeChallenge(codeVerifier)
        const state = this.generateState(32)
        sessionStorage.setItem('subrite_oauth_state', state)

        const authUrl = `${subriteUrl}/api/oidc/auth?` +
          `client_id=${encodeURIComponent(clientId)}` +
          `&scope=${encodeURIComponent('openid offline_access')}` +
          `&response_type=code` +
          `&redirect_uri=${encodeURIComponent(redirectUri)}` +
          `&code_challenge=${encodeURIComponent(codeChallenge)}` +
          `&code_challenge_method=S256` +
          `&state=${encodeURIComponent(state)}`

        this.refreshDebug()
        window.open(authUrl, '_blank', 'noopener')
      } catch (error) {
        console.error('Error starting Subrite login in new tab:', error)
      }
    },

    generateCodeVerifier(length = 64) {
      const allowed = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~'
      const random = new Uint8Array(length)
      window.crypto.getRandomValues(random)
      let result = ''
      for (let i = 0; i < random.length; i++) {
        result += allowed.charAt(random[i] % allowed.length)
      }
      return result
    },

    async generateCodeChallenge(codeVerifier) {
      const data = new TextEncoder().encode(codeVerifier)
      const digest = await window.crypto.subtle.digest('SHA-256', data)
      return this.base64UrlEncode(new Uint8Array(digest))
    },

    base64UrlEncode(bytes) {
      let str = ''
      for (let i = 0; i < bytes.byteLength; i++) {
        str += String.fromCharCode(bytes[i])
      }
      return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
    },

    generateState(length = 32) {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      const arr = new Uint8Array(length)
      window.crypto.getRandomValues(arr)
      return Array.from(arr, n => chars[n % chars.length]).join('')
    }
    
    // Keep the old method for reference (commented out)
    // login() {
    //   this.$auth.loginWith("awsCognito");
    // }
  }
};
</script>