<template>
  <section>
    <template v-if="$fetchState.pending">
      <content-placeholders-img />
      <content-placeholders-text :lines="4" />
    </template>
    <template v-else>
        <div class="uk-container">
          <h1>{{ $getCMSEntry(labels,'orderHistory', 'Orderhistorik') }}</h1>

          <div class="uk-overflow-auto">
            <table class="uk-table uk-table-striped uk-table-condensed uk-text-nowrap">
              <thead>
                <tr>
                  <th>{{ $getCMSEntry(labels,'orderNumber', 'Ordernummer') }}</th>
                  <th>{{ $getCMSEntry(labels,'orderDate', 'Orderdatum') }}</th>
                  <th class="uk-text-right">{{ $getCMSEntry(labels,'orderSum', 'Ordersumma') }}</th>
                  <th>{{ $getCMSEntry(labels,'paymentMethod', 'Betalningsmetod') }}</th>
                  <th>{{ $getCMSEntry(labels,'orderStatus', 'Status') }}</th>
                </tr> 
              </thead>
              <tbody>
                <tr v-for="order in orders"
                  :key="order.OrderId">
                  <td>
                    <nuxt-link
                      :to="localePath('/my-account/'+order.OrderId)">{{ order.OrderId }}
                    </nuxt-link>
                  </td>
                  <td>{{ order.OrderDate }}</td>
                  <td class="uk-text-right">{{ order.OrderSum | thousandsDelimiter }} {{ order.Currency }}</td>
                  <td>{{ order.PaymentMethod }}</td>
                  <td>{{ order.StatusDisplay }}</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
    </template>
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
          this.$axios.$get("https://api.storyblok.com/v1/cdn/datasource_entries?dimension="+this.$i18n.locale +"&datasource=fe-labels-myaccount&token="+process.env.STORYBLOK +"&cv="+this.$store.getters.version)
      ]);
      this.labels = storyblok.datasource_entries
    }catch(error){
      console.log(error);
    }
  },
  activated(){
    this.$fetch()
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
  async fetch () {
    try {
      const [o] = await Promise.all([
        await this.$nuxt.context.app.$axios.$get(
          process.env.API_URL + '/webapi/'+this.$i18n.locale+'/Order/GetOrderlist'
        )
      ]);
        this.orders = o
    } catch (err) {
      console.log(err);
      console.log(err.request);
    }

  }
}
</script>
<style lang="scss">


</style>