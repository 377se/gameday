<template>
  <div>
    <p v-if="loggedIn">Logging in...</p>
    <div v-else>
      <p>You are not logged in.</p>
      <button @click="loginWithSubrite" class="uk-button uk-button-primary">Login with Subrite</button>
      
      <div class="uk-card uk-card-default uk-card-body uk-margin" v-if="pkce.show">
        <h4 class="uk-margin-remove">PKCE details (copy for backend/manual exchange)</h4>
        <div class="uk-text-small uk-margin-small">code_verifier:</div>
        <pre><code>{{ pkce.verifier }}</code></pre>
        <div class="uk-text-small uk-margin-small">state:</div>
        <pre><code>{{ pkce.state }}</code></pre>
        <div class="uk-text-small uk-margin-small">Authorization URL:</div>
        <pre><code>{{ pkce.authUrl }}</code></pre>

        <div class="uk-margin">
          <button class="uk-button uk-button-default uk-margin-small-right" @click="openAuthUrl">Open Subrite login</button>
          <small class="uk-text-muted">If a popup was blocked, click "Open Subrite login".</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loggedIn: false,
      pkce: {
        show: false,
        verifier: '',
        state: '',
        authUrl: ''
      }
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

        // Show PKCE immediately so you can copy it
        this.pkce.show = true
        this.pkce.verifier = codeVerifier
        this.pkce.state = state
        this.pkce.authUrl = authUrl

        // Also open the Subrite login in a new tab (will be blocked if not user-initiated)
        window.open(authUrl, '_blank', 'noopener')
      } catch (error) {
        console.error('Error starting Subrite login:', error)
        // Optional: show a user-friendly message or retry
      }
    },

    openAuthUrl() {
      if (this.pkce && this.pkce.authUrl) {
        window.open(this.pkce.authUrl, '_blank', 'noopener')
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