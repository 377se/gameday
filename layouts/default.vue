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
                  <strong>Alltid 30 Dagars öppet köp och fria returer</strong>
                </div>
              </li>
              <li>
                <div class="uk-text-center gd-slider-item uk-padding-small">
                  <strong>Snabba leveranser från vårt lager i Stockholm</strong>
                </div>
              </li>
              <li>
                <div class="uk-text-center gd-slider-item uk-padding-small">
                  <strong>Every day is... Gameday!</strong>
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

.uk-breadcrumb > * > * {
      font-size: 0.7rem;
  }
  .uk-breadcrumb > :nth-child(n+2):not(.uk-first-column):before{
    margin: 0px 5px;
  }

  .category-list-slider{
  overflow-y:hidden;
  overflow-x:scroll;
  flex-wrap:nowrap;
  margin-right:-15px;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none;  /* Internet Explorer 10+ */
  padding-bottom:15px;
  padding-right:15px;
}

.category-list-slider::-webkit-scrollbar { /* WebKit */
    width: 0;
    height: 0;
}

.category-list-slider > div{
  padding-left:5px;
}
.category-list-slider .uk-label{
  padding-top:15px;
  padding-bottom:15px;
}
.category-list-slider .uk-label:focus, .category-list-slider .uk-label:hover{
  color:#fff;
  text-decoration:none;
}
.category-list-slider > div:first-child{
  padding-left:15px;
}
.category-list-slider > div:last-child{
  padding-right:15px;
}

.team-slider-item{
  margin-right:10px;
  min-width:50px;
}
.team-slider-img{
  width:50px;
}
.show-all{
  font-size:1rem;
  font-weight:normal;
  text-decoration:underline;
  margin-left:15px;
  float:right;
}
</style>
