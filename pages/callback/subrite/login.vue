<template>
  <div>
    <div v-if="errors">{{errors}}</div>
    <div v-else>
      <div class="uk-margin">
        <h3>Manual token exchange</h3>
        <p class="uk-text-small">Copy this command and run it locally to exchange the authorization code for tokens.</p>
        <pre><code>{{ debugCurl }}</code></pre>
        <p class="uk-text-meta">Values used: code={{ code }}, state={{ state }}, redirect_uri={{ redirectUri }}</p>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  data(){
    return{
      errors: null,
      debugCurl: null,
      code: null,
      state: null,
      redirectUri: null
    }
  },
  async mounted(){
    this.handleSubriteCallback()
  },
  methods:{
    async handleSubriteCallback(){
      var _this = this
      // Get the authorization code from the URL query parameters
      const code = this.$route.query.code
      const state = this.$route.query.state
      this.code = code
      this.state = state
      
      if (!code) {
        _this.errors = 'Authorization code not found'
        return
      }

      // Get verifier and expected state from sessionStorage
      const codeVerifier = sessionStorage.getItem('subrite_pkce_verifier')
      const expectedState = sessionStorage.getItem('subrite_oauth_state')
      if (!codeVerifier) {
        _this.errors = 'Missing code_verifier. Please start the login again.'
        return
      }
      if (expectedState && state && expectedState !== state) {
        _this.errors = 'State mismatch. Please start the login again.'
        return
      }

      // Build manual curl for testing
      const tokenEndpoint = (process.env.SUBRITE_URL || 'https://minside.liverpool.no') + '/api/oidc/token'
      const clientId = process.env.SUBRITE_CLIENT_ID || 'dca4a564d8e54f5bb070'
      const redirectUri = process.env.SUBRITE_REDIRECT_URI || 'https://kopshop.no/callback/subrite/login'
      this.redirectUri = redirectUri

      const curl = [
        'curl -X POST',
        `'${tokenEndpoint}'`,
        "-H 'Content-Type: application/x-www-form-urlencoded'",
        "-d 'grant_type=authorization_code'",
        `-d 'code=${encodeURIComponent(code)}'`,
        `-d 'redirect_uri=${encodeURIComponent(redirectUri)}'`,
        `-d 'client_id=${encodeURIComponent(clientId)}'`,
        `-d 'code_verifier=${encodeURIComponent(codeVerifier)}'`
      ].join(' ')

      this.debugCurl = curl

      // Note: We are intentionally NOT calling the backend here so we can test manually first.
    }
  }
};

</script> 