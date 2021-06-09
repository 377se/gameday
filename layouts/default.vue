<template>
  <div>
    <ShopTopPromo v-if="(siteId==6 && siteLang=='sv') || (siteId==2 && siteLang=='sv') || (siteId==7 && siteLang=='sv')"/>
    <TheRollingText />
    <TheHeader/>
    <nuxt keep-alive/>
    <client-only>
      <OffscreenMenu/>
      <OffscreenProductTypeMenu/>
      <OffscreenBrandMenu/>
      <OffscreenBasket/>
    </client-only>
    <TheFooter/>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import OffscreenBasket from "@/components/basket/TheBasket";
import TheRollingText from "@/components/TheRollingText";
import ShopTopPromo from "@/components/ShopTopPromo";

export default {
  head () {
    let i18nHead = this.$nuxtI18nSeo()
    if(process.env.SITE_ID==2){ //Sam Dodds
      var _route=this.$route.path.replace('/sv-se','').replace('/da-dk').replace('/fi-fi')
      let _obj_sv = {
                    'hid':'i18n-alt-sv',
                    'rel': 'alternate',
                    'href': 'https://www.samdodds.com/sv-se'+_route,
                    'hreflang': 'sv'
                  }
      let _obj_da = {
                    'hid':'i18n-alt-da',
                    'rel': 'alternate',
                    'href': 'https://www.samdodds.dk'+_route,
                    'hreflang': 'da'
                  }
      let _obj_fi = {
                    'hid':'i18n-alt-fi',
                    'rel': 'alternate',
                    'href': 'https://www.samdodds.com/fi-fi'+_route,
                    'hreflang': 'fi'
                  }
      let _obj_xd = {
                    'hid':'i18n-xd',
                    'rel': 'alternate',
                    'href': 'https://www.samdodds.com/sv-se'+_route,
                    'hreflang': 'x-default'
                  }
      i18nHead.link.push(_obj_sv)
      i18nHead.link.push(_obj_da)
      i18nHead.link.push(_obj_fi)
      i18nHead.link.push(_obj_xd)
    }
      
    /*try{
      let links = i18nHead.link.filter(el => (el.rel!='canonical'))
      i18nHead.link = links
    }catch(err){console.log(err)}*/
    return i18nHead
  },
  components: {
    OffscreenBasket,
    TheRollingText,
    ShopTopPromo,
  },
  computed: {
    ...mapGetters({
      global_labels:'labels'})
  },
  data() {
    return {
      siteId: process.env.SITE_ID,
      siteLang: process.env.ISO_LANG
    }
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
    
    this.$nextTick(() => {
      try{
      UIkit.offcanvas('#offscreen-menu').hide();
      }catch(err){}
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
