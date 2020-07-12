<template>
  <section>
    <div
      v-if="klarnahtml" 
      class="uk-container uk-text-center">
      <h1>{{ klarnahtml.Ordernumber }}</h1>
    </div>
    <div 
      v-if="klarnahtml"
      id="klarna-checkout"
      class="uk-container uk-padding-remove"
      v-html="klarnahtml.Html"/>
    <div 
      v-if="klarnahtml.Order"
      style="display:none;">
      {{ klarnahtml.Order }}
    </div>
  </section>
</template>
<script>
export default {
  head () {
    return {
      title: 'Tack för din order',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Tack för din order'
        },
        {
          hid: 'og:title',
          name:  'og:title',
          content:  'Tack för din order',
        },
        {
          hid: 'og:description',
          name:  'og:description',
          content: 'Tack för din order',
        }
      ]
    }
  },
  data() {
    return {
      klarnahtml: null
    };
  },
  mounted(){
    var checkoutContainer = document.getElementById('klarna-checkout')
    var scriptsTags = checkoutContainer.getElementsByTagName('script')
    // This is necessary otherwise the scripts tags are not going to be evaluated
    for (var i = 0; i < scriptsTags.length; i++) {
        var parentNode = scriptsTags[i].parentNode
        var newScriptTag = document.createElement('script')
        newScriptTag.type = 'text/javascript'
        newScriptTag.text = scriptsTags[i].text
        parentNode.removeChild(scriptsTags[i])
        parentNode.appendChild(newScriptTag)
    }

    
    
  },
  async fetch() {
    var _this = this;
    try {
      const url = `/webapi/klarnacheckout3/GetKlarnaAcknowledge?id=${this.$route.params.id}`;
      const klarnahtml = await this.$axios.$get(url);
      this.klarnahtml=klarnahtml;
      try{
        var _this = this
        //Set CurrencyCode
        this.klarnahtml.Order.purchase = _this.klarnahtml.Order
        this.klarnahtml.Order.currencyCode = process.env.CURRENCY_CODE
        this.$gtm.push({ event: 'paymentThanks', ecommerce: _this.klarnahtml.Order })
        }catch(err){console.log(err)}
      
    } catch (err) {
      console.log(err);
    }
  }
}
</script>
<style lang="scss">

</style>