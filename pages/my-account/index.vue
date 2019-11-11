<template>
  <section>
    <div class="uk-container uk-padding-small">
      <ul
        id="myaccountmenu" 
        uk-tab>
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
#myaccountmenu{
  overflow-y:hidden;
  overflow-x:scroll;
  flex-wrap:nowrap;
  margin-right:-15px;
  border-bottom: 1px solid #e5e5e5;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none;  /* Internet Explorer 10+ */
}
#myaccountmenu::-webkit-scrollbar { /* WebKit */
    width: 0;
    height: 0;
}
#myaccountmenu::before{
  border:none;
}
</style>