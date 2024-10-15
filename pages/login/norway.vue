<template>
  <div>
    <p v-if="loggedIn">Logging in...</p>
    <div
      v-else>
      <p>You are not logged in. </p>
      <a href="https://auth.a.liverpool.no/login?client_id=65qi5lmu89hgcr4ma1aipaleus&response_type=code&scope=email+openid+phone+profile&redirect_uri=https%3A%2F%2Fkopshop.no%2Fcallback%2Fcognito%2Flogin" class="uk-button">Login</a>
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
  
  methods: {
    login() {
      this.$auth.loginWith("awsCognito");
    }
  }
};
</script>