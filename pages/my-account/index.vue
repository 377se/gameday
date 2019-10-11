<template>
  <section>
    <div class="uk-container uk-padding-small">
      <ul uk-tab>
        <li class="uk-active">
          <nuxt-link to="/my-account/">Mitt konto</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/my-account/member-info">Medlemsinformation</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/my-account/order-history">Orderhistorik</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/my-account/coins">Coins</nuxt-link>
        </li>
      </ul>
      <nuxt-child/>
    </div>
  </section>
</template>

<script>
export default {
  
}
</script>
<style lang="scss">

</style>