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
        v-if="$i18n.locale=='en' || siteid==8"
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
    </template>
    <div 
      id="klarna-checkout"
      class="uk-container uk-padding-remove"/>
  </section>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  async fetch(){
    if(this.$route.params.version){
      localStorage.version = '_v2'
    }
    if(this.$i18n.locale=='en' || this.siteid==8){
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
        if(!process.server){
          this.loadScripts()
        }
      } catch (err) {
        console.log(err);
      }
    }
  },
  activated(){
    this.$fetch()
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
      siteid: -1, //process.env.SITE_ID,
      klarnahtml: null,
      countries: [],
      chosenCountry: null
    };
  },
  computed: {
    ...mapGetters({
      counter: 'basket/counter'
    })
  },
  watch:{
    counter(oldQuery, newQuery){
      this.$fetch()
    }
  },
  mounted(){
    if(this.klarnahtml!=null){
      this.loadScripts()
    }
    // ✅ Unified Tracking - Single call distributes to GTM, Google Ads, Meta, GA4
    if (this.$track && this.$track.beginCheckout) {
      try {
        const cart = this.$store.getters['basket/cart']
        this.$track.beginCheckout(cart)
      } catch(err) {
        // Silent - tracking errors don't block page
      }
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