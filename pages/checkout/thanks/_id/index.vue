<template>
  <section>
    <div
      v-if="klarnahtml" 
      class="uk-container">
      <h1>{{ klarnahtml.Ordernumber }}</h1>
    </div>
    <div 
      id="klarna-checkout"
      class="uk-container"
      v-html="klarnahtml.Html"/>
  </section>
</template>
<script>
export default {
  head () {
    return {
      title: 'Checkout',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Checkout'
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
  async asyncData({ app, route }) {
    try {
      const url = `https://beta.supporterprylar.se/webapi/klarnacheckout3?id=${route.params.id}`;
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