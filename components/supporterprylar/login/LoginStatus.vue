<template>
  <div class="text-container">
    <nuxt-link class="uk-link-reset" :to="localePath('/login')">LOGGA IN</nuxt-link>
  </div>
</template>

<script>
</script>

<style lang="scss">
.text-container {
  color: $global-inverse-color !important;
  margin-right: 18px;
  font-size: 15px;
}
</style>
