<template>
  <div>
    <TheHeader/>

    <nuxt/>

    <OffscreenMenu/>
    <OffscreenBasket/>

    <TheFooter/>
  </div>
</template>

<script>
import TheHeader from "@/components/gameday/TheHeader";
import TheFooter from "@/components/gameday/TheFooter";
import OffscreenMenu from "@/components/gameday/menu/OffscreenMenu";
import OffscreenBasket from "@/components/basket/TheBasket";

export default {
  components: {
    TheHeader,
    TheFooter, 
    OffscreenMenu,
    OffscreenBasket
  },
  mounted(){
    /*if(localStorage.session!=undefined){
      this.$axios.setHeader('x-session', localStorage.session)
    }*/
    this.$on('zendeskLoaded', (event) => {
      this.$zendesk.zE('webWidget', 'setLocale', 'sv');
    })
    
    this.getSession()
  },
  methods:{
    async getSession(){
      var _this = this
      await this.$axios.$get('/webapi/cart')
      .then(res => {
        _this.$store.commit('basket/add', res)
        this.$cookies.set('session', res.SessionId)
        this.$axios.setHeader('x-session', res.SessionId)
      })
      .catch(function (error) {
        
      })
    }
  }
};
</script>

<style lang="scss">

</style>
