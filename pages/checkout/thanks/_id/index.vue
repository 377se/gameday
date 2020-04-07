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
    if(this.klarnahtml!=null && this.klarnahtml.Order){
      try{
        dataLayer.push({
          'event':'paymentThanks',
          'ecommerce': this.klarnahtml.Order
        });}catch(err){console.log(err)}
    }
  },
  async asyncData({ app, route }) {
    try {
      const url = `/webapi/klarnacheckout3/GetKlarnaAcknowledge?id=${route.params.id}`;
      const klarnahtml = await app.$axios.$get(url);

      return { klarnahtml };
    } catch (err) {
      console.log(err);
    }
  }
}
</script>
<style lang="scss">

</style>