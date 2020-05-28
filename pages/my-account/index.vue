<template>
  <section>
    <div class="uk-container uk-padding-small">
      <ul
        id="myaccountmenu" 
        uk-tab>
        <li class="uk-active">
          <nuxt-link to="/my-account/">{{ $getCMSEntry(labels,'myAccount', 'Mitt konto') }}</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/my-account/member-info">{{ $getCMSEntry(labels,'memberInformation', 'Medlemsinformation') }}</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/my-account/order-history">{{ $getCMSEntry(labels,'orderHistory', 'Orderhistorik') }}</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/my-account/coins">{{ $getCMSEntry(labels,'coins', 'Coins') }}</nuxt-link>
        </li>
      </ul>
      <nuxt-child/>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'


export default {
   async fetch () {
    try{
      let [storyblok] = await Promise.all([
          this.$axios.$get("https://api.storyblok.com/v1/cdn/datasource_entries?dimension="+process.env.ISO_LANG_COUNTRY.toLowerCase() +"&datasource=fe-labels-myaccount&token="+process.env.STORYBLOK +"&cv="+this.$store.getters.version)
      ]);
      this.labels = storyblok.datasource_entries.concat(storyblok_global.datasource_entries)
    }catch(error){
      logger.error(error);
    }
  },
  data() {
    return {
      labels: []
    }
  }
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