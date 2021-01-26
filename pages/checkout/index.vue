<template>
  <section>
    <template
      v-if="$fetchState.pending"
    >
      <div>Loading klarna...</div>
    </template>
    <template
      v-else>
      <div 
        v-if="$i18n.locale=='en'"
        class="uk-container uk-padding-small">
        <select
          v-model="chosenCountry"
          @change="loadKlarna"
          class="uk-select uk-margin">
          <option value="null">Choose your country</option>
          <option
            v-for="c in countries"
            v-bind:key="c.Iso"
            :value="c.Iso">{{ c.CountryName }}</option>
        </select>
      </div>
      <div 
        id="klarna-checkout"
        class="uk-container uk-padding-remove"/>
    </template>
  </section>
</template>
<script>
export default {
  async fetch(){
    if(this.$i18n.locale=='en'){
      try{
        const countries = await this.$axios.$get('/webapi/Country/GetKlarnaCountryList');
        this.countries = countries
      }catch(err){
        console.log(err)
      }
    }else{
      try {
        const url = `/webapi/klarnacheckout3`;
        const klarnahtml = await this.$axios.$post(url);

        this.klarnahtml = klarnahtml;
      } catch (err) {
        console.log(err);
      }
    }
    

  },
  head () {
    return {
      title: 'Checkout',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Checkout'
        },
        {
          hid: 'og:title',
          name:  'og:title',
          content:  'Checkout',
        },
        {
          hid: 'og:description',
          name:  'og:description',
          content: 'Checkout',
        }
      ]
    }
  },
  data() {
    return {
      klarnahtml: null,
      countries: [],
      chosenCountry: null
    };
  },
  mounted(){
    if(this.klarnahtml!=null){
      this.loadScripts()
    }
  },
  methods:{
    async loadKlarna(){
      if(this.chosenCountry!=null){
        try {
          const url = `/webapi/klarnacheckout3/PurchaseWithIso?iso=${this.chosenCountry}`;
          const klarnahtml = await this.$axios.$post(url);

          this.klarnahtml = klarnahtml;
          this.loadScripts()
        } catch (err) {
          console.log(err);
        }
      }else{
        UIkit.notification({message: 'You need to choose your country!', status: 'warning'})
      }
    },
    loadScripts(){
      var checkoutContainer = document.getElementById('klarna-checkout')
      checkoutContainer.innerHTML = this.klarnahtml
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
    }
  }
}
</script>
<style lang="scss">

</style>