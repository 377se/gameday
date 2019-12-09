<template>
  <div>
    <TheHeader/>
    <div>
      <div
        class="uk-slider gd-slider" 
        uk-slider="autoplay:true">
        <div 
          style="position:relative">
          <div uk-slider-container>
            <ul class="uk-slider-items uk-child-width-1-1 uk-text-small">
              <li>
                <div class="uk-text-center gd-slider-item uk-padding-small">
                  30 dagars öppet köp
                </div>
              </li>
              <li>
                <div class="uk-text-center gd-slider-item uk-padding-small">
                  Fria returer
                </div>
              </li>
            </ul>
          </div>

          <a 
            class="uk-position-center-left uk-visible@s" 
            href="#" 
            uk-slidenav-previous
            uk-slider-item="previous"
            @click.prevent/>
          <a 
            class="uk-position-center-right uk-visible@s" 
            href="#" 
            uk-slidenav-next
            uk-slider-item="next"
            @click.prevent/>

        </div>
      </div>
    </div>
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
  head () {
    return this.$nuxtI18nSeo()
  },
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
    //UIkit.notification("", {status:'primary'})
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
.gd-slider{
  background: #fce0cc;
}
</style>
