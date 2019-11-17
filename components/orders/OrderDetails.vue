<template>
  <section 
    class="uk-container uk-margin-small-top uk-background-default">
    <div 
      class="uk-grid uk-grid-small"
      uk-grid>
      

        <div class="uk-width-1-1 uk-margin-small">
          <strong>{{order.OrderId}}</strong><br />
          {{order.OrderDate}}<br />
          {{order.Address.FirstName}} {{order.Address.LasttName}} <br />
          {{order.Address.Address1}}<br />
          {{order.Address.PostalCode}} {{order.Address.City}}<br />
            {{order.Address.Country}}<br />
            {{order.Address.Email}}<br />
            {{order.Address.Mobile}}

            <div
            v-for="item in order.ItemList"
            :key="item.ItemId"
            class="uk-width-1-3 uk-width-1-4@s uk-grid-margin">
                {{item.ImageThumb}}
                {{item.ProductName}}
                {{item.ArticleNumber}}
                {{item.Color}}
                {{item.PriceToPayDisplay}}
            </div>

<br /><br />
            Ordersummering
            <div>
  Ordersumma: {{order.OrderSummary.OrderSumDisplay}}<br />
  Frakt: {{order.OrderSummary.ShippingAndHandlingDisplay}}<br />
  Totalt: {{order.OrderSummary.TotalDisplay}}<br />
  Varav moms: {{order.OrderSummary.VatDisplay}}<br />
            </div>

        </div>
      
    </div>
  </section>
</template>



<script>

export default {
  components: {
    
  },
  props: {
    order: {
      type: Object,
      required: true
    }
  },
  data() {
    return{
      
    }
  },
  mounted() {
    
  },
  methods:{
   
  }
};
</script>


<style lang="scss">
</style>
