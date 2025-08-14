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
    loginWithSubrite() {
      try {
        // Use Nuxt Auth to handle the OAuth flow
        this.$auth.loginWith("subrite");
      } catch (error) {
        console.error('Error with Subrite login:', error)
        // Fallback to direct redirect
        window.location.href = this.subriteLoginUrl
      }
    },
    
    // Keep the old method for reference (commented out)
    // login() {
    //   this.$auth.loginWith("awsCognito");
    // }
  }
};
</script>