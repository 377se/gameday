<template>
  <section>
    <template
      v-if="$fetchState.pending"
    >
      <div><br><br><br><br><br><br><br><br></div>
    </template>
    <template
      v-else>
      <div
        v-if="klarnahtml" 
        class="uk-container uk-text-center">
        <h1>{{ klarnahtml.Ordernumber }}</h1>
      </div>
    </template>
    <div 
      id="klarna-checkout-thanks"
      class="uk-container uk-padding-remove"/>
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
      klarnahtml: null,
      obj: null,
      currencycode: process.env.CURRENCY_CODE,
      siteid: process.env.SITE_ID
    };
  },
  mounted(){
    try{
      //remove voucher-header and clear localStorage, if set
      if(localStorage.voucher!=undefined){
        try{
          this.voucher = null
          localStorage.removeItem('voucher')
          delete this.$axios.defaults.common.header['x-voucherid']
        }catch(err){
          console.log(err)
        }
      }if(this.klarnahtml!=null){
        this.loadScripts()
      }
    }catch(err){
      console.log(err)
    }
    //this.sendToGoogleAds()
  },
  methods:{
    loadScripts(){
      try{
        var checkoutContainer = document.getElementById('klarna-checkout-thanks')
        checkoutContainer.innerHTML = this.klarnahtml.Html
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
      }catch(err){
        console.log(err)
      }
    },
    sendToGoogleAds(){
      try{
        var _obj = this.obj
        console.log('Klarnahtml: ',this.klarnahtml)
        console.log('Obj: ',_obj)
        this.$gtm.push({ event: 'purchase', ecommerce: 
          {
            transaction_id: this.klarnahtml.Ordernumber,
            order_id: this.klarnahtml.Ordernumber,
            currency: process.env.CURRENCY_CODE,
            value: _obj?.actionField?.revenue || 0,
            tax: _obj?.actionField?.tax || 0,
            shipping: _obj?.actionField?.shipping || 0,
            items: _obj?.products || []
          }
        })
      }catch(err){console.log(err)}
    }
  },
  async fetch() {
    var _this = this;

    try {
      const _organic = '&clickid=organic'
      let clickIdValue = this.$cookies.get('click_id')
      if(!clickIdValue && process.client){
        try{ clickIdValue = localStorage.getItem('click_id') }catch(e){}
      }
      const click_id = clickIdValue ? '&clickid=' + clickIdValue : _organic;
      const url = `/webapi/klarnacheckout3/GetKlarnaAcknowledge?id=${this.$route.params.id}${click_id}`;
      const klarnahtml = await this.$axios.$get(url);
      this.klarnahtml=klarnahtml;
      try{
        const url = `/webapi/Google/GetPurchaseObject?orderId=${klarnahtml.Ordernumber}`;
        const google = await this.$axios.$get(url);
        this.obj = google;
        this.sendToGoogleAds()
        /*var _obj = {currencyCode: process.env.CURRENCY_CODE, purchase: {actionField: google.actionField, products: google.products}}
        this.obj = _obj
        this.$gtm.push({ event: 'purchase', ecommerce: _obj })
        zaraz.track('purchase',_obj)*/
      }catch(err){console.log(err)}
    } catch (err) {
      this.klarnahtml={Ordernumber:'', Html: '<div class="uk-container" style="padding-left:20px;padding-right:20px;"><h3>Tack!</h3><p>Din order är nu hos oss. Var vänlig kolla din mail och se så att du fått en orderbekräftelse.</p></div>'}
      console.log(err);
    }
    if(!process.server){
      this.loadScripts()
    }
    
    try{
      //Remove voucher-cookie if there is one
      if(this.$cookies.get('voucherid')!=undefined){
        this.$cookies.remove('voucherid')
      }
    }catch(err){console.log(err)}
 
  },
  activated(){
    this.$fetch()
  }
}
</script>
<style lang="scss">

</style>