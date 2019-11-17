<template>
  <OrderDetails v-bind:order="order"></OrderDetails>
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
      order: {}
    };
  },
  async asyncData({ app, route }) {
    try {
      const url = `/webapi/Order/GetOrderDetails?orderId=${
        route.params.id
      }`;
      const order = await app.$axios.$get(url);

      return { order };
    } catch (err) {
      console.log(err);
    }
  }
};
</script>

<style lang="scss">
</style>
