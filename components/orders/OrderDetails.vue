<template>
  <section 
    class="uk-container uk-margin-small-top uk-background-default">
    <div 
      class="uk-grid uk-grid-small"
      uk-grid>
      

        <div class="uk-width-1-1 uk-margin-small">
          <h1>Order {{order.OrderId}}</h1>
          {{ $getCMSEntry(labels,'orderDate', 'Orderdatum') }}: {{order.OrderDate}}<br />
          {{ $getCMSEntry(labels,'orderStatus', 'Orderstatus') }}:  {{order.StatusDisplay}}<br />
          {{ $getCMSEntry(labels,'trackingNumber', 'Kollinummer') }}:  {{order.TrackingNumber}}<br />
          {{ $getCMSEntry(labels,'paymentMethod', 'Betalningsmetod') }}:  {{order.PaymentMethod}}<br />

          <hr class="uk-divider-icon">

          {{order.Address.FirstName}} {{order.Address.LastName}} <br />
          {{order.Address.Address1}}<br />
          {{order.Address.PostalCode}} {{order.Address.City}}<br />
            {{order.Address.Country}}<br />
            {{order.Address.Email}}<br />
            {{order.Address.Mobile}}

        <table class="uk-table">

          <thead>
            <tr>
              <th></th>
              <th>Produkt</th>
              <th>Artikelnummer</th>
              <th>Storlek</th>
              <th>Färg</th>
              <th class="uk-text-right">Pris</th>
            </tr>
          </thead>

          
         <tr v-for="item in order.ItemList"
            :key="item.ItemId">
            <td><img :src="thumb_src + item.ImageThumb" /></td>
            <td>{{item.ProductName}}</td>
            <td>{{item.ArticleNumber}}</td>
            <td>{{item.SizeDisplay}}</td>
            <td>{{item.Color}}</td>
            <td class="uk-text-right">{{item.PriceToPayDisplay}}</td>
             
          </tr>

          <tfoot>
            <tr>
              <td colspan="4"></td>
              <td>Ordersumma:</td>
              <td class="uk-text-right">{{order.OrderSummary.OrderSumDisplay}}</td>
            </tr> 

<tr>
              <td colspan="4"></td>
              <td>Frakt:</td>
              <td class="uk-text-right">{{order.OrderSummary.ShippingAndHandlingDisplay}}</td>
            </tr> 

<tr>
              <td colspan="4"></td>
              <td>Totalt:</td>
              <td class="uk-text-right">{{order.OrderSummary.TotalDisplay}}</td>
            </tr> 

<tr>
              <td colspan="4"></td>
              <td>Varav moms:</td>
              <td class="uk-text-right">{{order.OrderSummary.VatDisplay}}</td>
            </tr> 

          </tfoot>
        </table>


        </div>
      
    </div>
  </section>
</template>



<script>

export default {
async fetch () {
    try{
      let [storyblok] = await Promise.all([
          this.$axios.$get("https://api.storyblok.com/v1/cdn/datasource_entries?dimension="+this.$i18n.locale +"&datasource=fe-labels-myaccount&token="+process.env.STORYBLOK +"&cv="+this.$store.getters.version)
      ]);
      this.labels = storyblok.datasource_entries
    }catch(error){
      logger.error(error);
    }
  },

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
      thumb_src:process.env.THUMB_SRC,  
      labels: [],
      story: { content: {} },
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
