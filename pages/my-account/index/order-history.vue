<template>
  <section>
    <div class="uk-container">
      <h1>Orderhistorik</h1>
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
  data () {
    return {
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