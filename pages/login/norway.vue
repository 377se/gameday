<template>
  <div>
    <p v-if="loggedIn">Logging in...</p>
    <div
      v-else>
      <p>You are not logged in. </p>
      <button class="uk-button" @click="login">Login</button>
    </div>
  </div>
</template>

<script>
export default {
  middleware: "auth",
  data() {
    return {
      loggedIn: false
    };
  },
  created() {
    this.loggedIn = this.$auth.strategy.token.get();
  },
  methods: {
    login() {
      this.$auth.loginWith("awsCognito");
    }
  }
};
</script>