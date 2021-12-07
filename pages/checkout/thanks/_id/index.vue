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
        <div class="uk-container" style="padding-left:20px;padding-right:20px;"><h3>Tack!</h3><p>Din order är nu hos oss. Var vänlig kolla din mail och se så att du fått en orderbekräftelse.</p></div>
      </div>
    </template>
    <div 
      v-if="klarnahtml"
      style="opacity:0;"
      id="klarna-checkout-thanks"
      class="uk-container uk-padding-remove"
      v-html="klarnahtml.Html"/>
    <div 
      v-if="klarnahtml"
      style="display:none;">
      {{ klarnahtml }}
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
      klarnahtml: null,
      obj: null,
      currencycode: process.env.CURRENCY_CODE
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
    try{
      var _this = this
      this.$gtm.push({ event: 'paymentThanks', ecommerce: _this.obj })
    }catch(err){console.log(err)}
  },
  methods:{
    loadScripts(){
      try{
        var checkoutContainer = document.getElementById('klarna-checkout-thanks')
        var scriptsTags = checkoutContainer.getElementsByTagName('script')
        // This is necessary otherwise the scripts tags are not going to be evaluated
        console.log('Script:' + scriptsTags.length)
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
    }
  },
  async fetch() {
    var _this = this;

    try {
      const url = localStorage.version!=undefined?`/webapi/klarnacheckout3/GetKlarnaAcknowledge_v2?id=${this.$route.params.id}`:`/webapi/klarnacheckout3/GetKlarnaAcknowledge?id=${this.$route.params.id}`;
      const klarnahtml = await this.$axios.$get(url);
      this.klarnahtml=klarnahtml;
      try{
        var _obj = {currencyCode: process.env.CURRENCY_CODE, purchase: {actionField: this.klarnahtml.Order.actionField, products: this.klarnahtml.Order.products}}
        this.obj = _obj
        this.$gtm.push({ event: 'paymentThanks', ecommerce: _obj })
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