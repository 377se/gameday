<template>
  <div>
    <TheRollingText />
    <TheHeader/>
    <nuxt keep-alive/>
    <OffscreenMenu/>
    <OffscreenProductTypeMenu/>
    <OffscreenBrandMenu/>
    <OffscreenBasket/>
    <TheFooter/>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import OffscreenBasket from "@/components/basket/TheBasket";
import TheRollingText from "@/components/TheRollingText";

export default {
  async fetch(){
    var _this = this
    if(this.$cookies.get('cid')!=undefined){
      this.$store.commit('setCid', this.$cookies.get('cid'))
    }

    await Promise.all(
      [this.$axios.$get('https://api.storyblok.com/v1/cdn/spaces/me?token='+process.env.STORYBLOK)]
    ).then(res =>{
      _this.$store.commit('setVersion', res[0].space)
    }).catch((err)=>{
      throw new Error("Error getting version:" + err)
    })

    try {
      let [storyblok] = await Promise.all([
        this.$axios.$get("https://api.storyblok.com/v1/cdn/datasource_entries?dimension="+context.app.i18n.locale +"&datasource=fe-labels-global&token="+process.env.STORYBLOK +"&per_page=1000&cv="+this.$store.getters.version)
      ]);
      _this.$store.commit('setLabels', storyblok.datasource_entries.concat(storyblok.datasource_entries))
    } catch (err) {
      console.log(err);
    }

    if(process.env.SITE_ID==6 || process.env.SITE_ID==1){ //Gameday
      await Promise.all([
        this.$axios.$get(process.env.API_URL + '/webapi/'+context.app.i18n.locale+'/Filter/GetProductTypeListByShopId'),
        this.$axios.$get(process.env.API_URL + '/webapi/'+context.app.i18n.locale+'/Filter/GetBrandListByShopId')
      ]).then(res => {
          _this.$store.commit('setProductTypeMenu', res[0])
          _this.$store.commit('setBrandMenu', res[1])
      }).catch((err)=>{
        throw new Error("Error getting productType or brand for menu:" + err)
      })

      await Promise.all([
        this.$axios.$get(process.env.API_URL + '/webapi/'+context.app.i18n.locale+'/Filter/GetTeamListByCategory?categoryId=202'),
        this.$axios.$get(process.env.API_URL + '/webapi/'+context.app.i18n.locale+'/Filter/GetTeamListByCategory?categoryId=327'),
        this.$axios.$get(process.env.API_URL + '/webapi/'+context.app.i18n.locale+'/Filter/GetTeamListByCategory?categoryId=328'),
        this.$axios.$get(process.env.API_URL + '/webapi/'+context.app.i18n.locale+'/Filter/GetTeamListByCategory?categoryId=329')
      ]).then(res => {
          _this.$store.commit('setNHLMenu', res[0])
          _this.$store.commit('setNBAMenu', res[1])
          _this.$store.commit('setNFLMenu', res[2])
          _this.$store.commit('setMLBMenu', res[3])
      }).catch((err)=>{
        throw new Error("Error getting teams for menu:" + err)
      })
    }
  },
  head () {
    let i18nHead = this.$nuxtI18nSeo()
    /*try{
      let links = i18nHead.link.filter(el => (el.rel!='canonical'))
      i18nHead.link = links
    }catch(err){console.log(err)}*/
    return i18nHead
  },
  components: {
    OffscreenBasket,
    TheRollingText,
  },
  computed: {
    ...mapGetters({
      global_labels:'labels'})
  },
  mounted(){
    /*if(localStorage.session!=undefined){
      this.$axios.setHeader('x-session', localStorage.session)
    }*/
    //UIkit.notification("", {status:'primary'})
    try{
      //Handle Android Chrome when kepyad is shown (vh is then less and this messes things up)
      var viewport = document.querySelector("meta[name=viewport]");
      viewport.setAttribute("content", viewport.content + ", height=" + innerHeight);
    }catch(err){}
    let lc = this.$i18n.locale=='en'?'en-gb':this.$i18n.locale
    this.$zendesk.load(process.env.ZENDESK)
    this.$zendesk.$on('loaded', (event) => {
      this.$zendesk.zE('webWidget', 'setLocale', lc)
      this.$zendesk.show()
    })
    
  }
};
</script>

<style lang="scss">
/*Header*/

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
  min-width:50px;
  width:20%;
  max-width:120px;
}
.team-slider-img{
  width:100%;
}
.show-all{
  font-size:1rem;
  font-weight:normal;
  text-decoration:underline;
  margin-left:15px;
  float:right;
}

.ts-filter.uk-active{
  padding:10px 10px 10px 0px;
  background:#fff;
  max-width: 1400px;
  border-left: 5px #fff;
}
.uk-offcanvas-page .ts-filter.uk-active{
  z-index:999999;
}

/*Transition animation*/
  .slide-left-enter-active,
  .slide-right-leave-active,
  .slide-left-leave-active,
  .slide-right-enter-active {
    transition: 1s;
  }

  .slide-left-enter,
  .slide-right-leave-active {
    transform: translateX(100%);
  }
  .slide-left-leave-active,
  .slide-right-enter {
    transform: translateX(100vw);
  }
</style>
