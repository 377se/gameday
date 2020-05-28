<template>
  <section>
    <div class="uk-container">
      <h1>{{ $getCMSEntry(labels,'orderHistory', 'Orderhistorik') }}</h1>
      <ul class="uk-list">
        <li 
          v-for="order in orders"
          :key="order.OrderId">
            <nuxt-link
              :to="'/my-account/'+order.OrderId">{{ order.OrderId }}
            </nuxt-link>
        </li>
      </ul>
    </div>
  </section>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'


export default {
  head () {
    return {
      title: "Orderhistorik",
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: "Orderhistorik"
        },
        {
          hid: 'og:title',
          name:  'og:title',
          content:  'Orderhistorik',
        },
        {
          hid: 'og:description',
          name:  'og:description',
          content: 'Orderhistorik',
        }
      ]
    }
  },
  components:{

  },

  async fetch () {
    try{
      let [storyblok] = await Promise.all([
          this.$axios.$get("https://api.storyblok.com/v1/cdn/datasource_entries?dimension="+process.env.ISO_LANG_COUNTRY.toLowerCase() +"&datasource=fe-labels-myaccount&token="+process.env.STORYBLOK +"&cv="+this.$store.getters.version)
      ]);
      this.labels = storyblok.datasource_entries
    }catch(error){
      logger.error(error);
    }
  },
  
  data () {
    return {
      labels: [],
      story: { content: {} },
      orders: []
    }
  },
  mounted(){

  },
  async asyncData (context) {
    try {
      const [o] = await Promise.all([
        await context.app.$axios.$get(
          '/webapi/Order/GetOrderlist'
        )
      ]);
      return {
        orders: o
      };
    } catch (err) {
      console.log(err);
      console.log(err.request);
    }

  }
}
</script>
<style lang="scss">


</style>