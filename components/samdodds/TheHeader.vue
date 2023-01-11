<template>
  
  <div style="background-color: #222;"
    uk-sticky>
    <nav 
      class="uk-navbar-container uk-navbar uk-margin header uk-margin-remove-bottom uk-light" 
      uk-navbar>
    <div class="header-wrapper">
      <div class="uk-navbar-left uk-flex-nowrap">
        <TheHamburger/>
        <nuxt-link 
          class="uk-navbar-item uk-padding-small uk-logo" 
          :to="localePath('/')"><img :src="logo" class="logo" alt="Sam Dodds Logo"></nuxt-link>
        <!--Candle /-->
      </div>

      <div 
        style="flex-wrap:nowrap"
        class="uk-navbar-right uk-text-center"
      >
        <span style="color:#fff;margin-right:4px;"><img :src="'/flags/'+locale+'.svg'" style="width:20px;" /> 
          <span 
            uk-icon="icon:chevron-down;ratio:1.0"/>
        </span>
        <div 
          class="uk-dropdown uk-padding-small"
          uk-dropdown>
            <ul 
              class="uk-nav uk-dropdown-nav uk-text-left">
                <li>
                  <a
                    href="https://www.samdodds.dk"
                    style="vertical-align:middle"><img src="/flags/da-dk.svg" style="width:30px;margin-right:5px;" /> Denmark</a>
                </li>
                <li>
                  <a
                    href="https://www.samdodds.com/fi-fi"
                    style="vertical-align:middle"><img src="/flags/fi-fi.svg" style="width:30px;margin-right:5px;" /> Suomi</a>
                </li>
                <li>
                  <a
                    href="https://www.kopshop.no"
                    style="vertical-align:middle"><img src="/flags/nb-no.svg" style="width:30px;margin-right:5px;" /> Norway</a>
                </li>
                <li>
                  <a
                    href="https://www.samdodds.com/sv-se"
                    style="vertical-align:middle"><img src="/flags/sv-se.svg" style="width:30px;margin-right:5px;" /> Sweden</a>
                </li>
                <!--li>
                  <a
                    href="https://www.samdodds.com/en"
                    style="vertical-align:middle"><img src="/flags/en.svg" style="width:30px;margin-right:5px;" /> International</a>
                </li-->
            </ul>
        </div>
        <nuxt-link
          v-if="cid==null"
          :to="localePath('/login')"
          >
          <span 
            style="color:#fff;"
            uk-icon="icon:user;ratio:1.0"/>
          <span
            style="display:block;font-size:0.6rem;color:#fff;white-space:nowrap">
            {{ $getCMSEntry(global_labels,'header_login', 'Logga in') }}
          </span>
        </nuxt-link>
        <nuxt-link
          v-else
          :to="localePath('my-account-index')"
          >
          <span 
            style="color:#fff;"
            uk-icon="icon:user;ratio:1.0"/>
          <span
            style="display:block;font-size:0.6rem;color:#fff;white-space:nowrap">
            {{ $getCMSEntry(global_labels,'header_myaccount', 'Mitt konto') }}
          </span>
        </nuxt-link>
        <a 
          href="#offscreen-basket" 
          uk-toggle="target: #offscreen-basket" 
          style="margin-right:10px;position:relative;"
          @click.stop.prevent
          >
          <span 
            class="basket-counter uk-text-small">{{ counter }}</span>
          <svg style="min-width:40px;" height='40px' width='40px' fill="#ffffff" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" version="1.1" x="0px" y="0px" viewBox="0 0 100 100"><g transform="translate(0,-952.36218)"><path style="text-indent:0;text-transform:none;direction:ltr;block-progression:tb;baseline-shift:baseline;color:#000000;enable-background:accumulate;" d="m 8.9999999,965.36223 c -1.1046,0 -2,0.8954 -2,2 0,1.1046 0.8954,2 2,2 l 12.3750001,0 10.5312,49.74997 c 0.2555,1.2291 1.0765,2.2629 2.0938,2.25 l 50,0 c 1.0566,0.015 2.0312,-0.9433 2.0312,-2 0,-1.0567 -0.9746,-2.015 -2.0312,-2 l -48.375,0 -10.6562,-50.43747 c -0.1983,-0.884 -1.0629,-1.5702 -1.9688,-1.5625 z m 22.0000001,12 6,29.99997 49,0 7,-29.99997 z m 13,47.99997 c -3.8659,0 -7,3.134 -7,7 0,3.866 3.1341,7 7,7 3.866,0 7,-3.134 7,-7 0,-3.866 -3.134,-7 -7,-7 z m 30,0 c -3.8659,0 -7,3.134 -7,7 0,3.866 3.1341,7 7,7 3.866,0 7,-3.134 7,-7 0,-3.866 -3.134,-7 -7,-7 z" fill="#ffffff" fill-opacity="1" stroke="none" marker="none" visibility="visible" display="inline" overflow="visible"></path></g></svg>
        </a>
      </div>
      </div>
    </nav>
    <div class="header-wrapper">
    <ul
      class="gd-subnav uk-subnav uk-margin-remove-top uk-margin-remove-bottom uk-flex-nowrap uk-margin-remove-left">
      <li
        v-for="cat in menu"
        :key="cat.Id">
        <nuxt-link
          :to="getCatLink(cat.Id, cat.UrlSafeName)">{{ cat.Name }}</nuxt-link>
      </li>
    </ul>
  </div>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside'
import TheHamburger from "./TheHamburger";
import { mapGetters, mapActions } from 'vuex'
export default {
  async fetch() {
    try {
      let [menu] = await Promise.all([
          this.$axios.$get('/webapi/'+this.$i18n.locale+'/category')
      ]);
      this.menu = menu
      this.locale = this.$i18n.locale
    } catch (err) {
      console.log(err);
    }
  },
  components: {
    TheHamburger
  },
  data(){
    return{
      logo:process.env.LOGO_URL,
      menu: null,
      chosenDropDown: 0,
      timeout: null,
      locale: ''
    }
  },
  computed: {
    ...mapGetters({
      counter: 'basket/counter',
      cid: 'cid',
      global_labels: 'labels'
    }),
    availableLocales () {
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
    }
  },
  directives: {
    ClickOutside
  },
  mounted(){
    if(this.$cookies.get('cid')!=undefined){
      this.$store.commit('setCid', this.$cookies.get('cid'))
    }
  },
  methods:{
    getCatLink(lID, urlsafe){
      var cid = this.$nuxt.context.app.localePath('/c/0/'+lID+'/'+urlsafe)
      if(lID==61){
        cid='/sv-se/supporterklubben'
      }else if(lID==308){
        cid='/sv-se/medlemserbjudanden'
      }
      return cid
    },
    switchLang(code){
      this.$i18n.setLocaleCookie(code)
      location.href = '/'+code;
    },
    hideDropDown(){
      var _this = this
      setTimeout(function(){
        _this.chosenDropDown = 0
      },200)
    },
    showDropDown(num){
      var _this = this
      clearTimeout(_this.timeout)
      this.chosenDropDown = this.chosenDropDown!=num?num:0
    }
  }
};
</script>

<style lang="scss" scoped>
.header-wrapper {
  position: relative;
  display: flex;
  width: 100%;
  max-width: 1417px;
  margin: 0 auto;
}
.uk-logo{
  padding:0;margin:0 15px;
}
.basket-counter{
  position: absolute;
  top: 1px;
  left: 50%;
  margin-left: -5px;
  color: rgb(0, 42, 50);
  background: #fa6900;
  padding: 3px;
  border-radius: 50%;
  width: 14px;
  height: 14px;
  text-align: center;
  font-size: 10px;
  line-height: 14px;
  color: #fff;
  font-weight:700;
}
.header {
  background-color: $global-primary-background !important;
  height: 80px;
}

.logo {
  width: 150px;
}

.gd-subnav{
  background: #222;
  padding-top:8px;
  padding-bottom:8px;
  display: flex;
  flex-direction: row;
  overflow: scroll;
  overflow-y: hidden;
  width:100%;
  &::-webkit-scrollbar {
    display: none;
  }
  > li > a{
    color:#fff !important;
    font-family: $base-heading-font-family;
  }
}

</style>
