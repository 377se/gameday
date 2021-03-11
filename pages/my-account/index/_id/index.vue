<template>
    <div>
      <div v-if="$fetchState.pending">
        <content-placeholders-img />
        <content-placeholders-text :lines="4" />
      </div>
      <div v-else>
        <div v-if="errors.length > 0">
          <div class="uk-container uk-padding">
            <h1>{{ errors[0].Value }} :(</h1>
            <p>Deppa inte över det, vi kan hjälpa dig hitta något kul:</p>
            <p>
              <nuxt-link :to="localePath('/')">Gå till startsidan</nuxt-link>
            </p>
          </div>
        </div>
        <OrderDetails v-else v-bind:order="order"></OrderDetails>
      </div>
    </div>
</template>
<script>
import OrderDetails from "@/components/orders/OrderDetails"; 

export default {
  head () {
    return {
      title: "Orderdetaljer",
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: "Orderdetaljer"
        },
        {
          hid: 'og:title',
          name:  'og:title',
          content:  'Orderdetaljer',
        },
        {
          hid: 'og:description',
          name:  'og:description',
          content: 'Orderdetaljer',
        }
      ]
    }
  },
  components: {
    OrderDetails
  },
  data() {
    return {
      order: {},
      errors: [],
    };
  },
  async fetch() {
    let _this = this
    await this.$axios.$get(process.env.API_URL + '/webapi/'+this.$i18n.locale+'/Order/GetOrderDetails?orderId='+this.$route.params.id)
    .then(function(response) {
        if (response.ErrorList !== null) {
            _this.errors = response.ErrorList
        } else {
          _this.order = response
        }
    })
    .catch(function (error) {
      console.log(error)
    })
  }

}
</script>

<style lang="scss">
</style>
