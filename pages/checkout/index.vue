<template>
  <section>
    <div 
      id="klarna-checkout"
      class="uk-container"
      v-html="klarnahtml"/>
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
      const url = `https://beta.supporterprylar.se/webapi/klarnacheckout3`;
      const klarnahtml = await app.$axios.$post(url);

      return { klarnahtml };
    } catch (err) {
      console.log(err);
    }
  }
}
</script>
<style lang="scss">

</style>