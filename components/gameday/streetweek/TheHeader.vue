<template>
  <div 
    uk-sticky
    @click.stop.prevent="chosenDropDown=0"
    v-click-outside="hideDropDown"
    style="outline:0;"
    tabindex="0">
      <nav 
        class="uk-navbar-container uk-navbar uk-margin header uk-margin-remove-bottom uk-light" 
        style="outline:0;background-color:#3c9e25;"
        uk-navbar>
        <div class="header-wrapper">
          <div class="uk-navbar-left uk-flex-nowrap">
              <span
                class="uk-flex uk-flex-middle">
                <nuxt-link
                  class="uk-navbar-item uk-margin-left uk-logo"
                  :to="localePath('/street-week')">
                  <img
                    src="/streetweek/street_week_shop_logo_2022.svg"
                    alt="Street Week Shop"
                    style="width:150px;margin-top:-20px;"
                  />
                </nuxt-link>
              </span>
          </div>

          <div
            style="flex-wrap:nowrap"
            class="uk-navbar-right uk-text-center"
          >
            <nuxt-link
              v-if="cid!=null"
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
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside'
import TheHamburger from "../TheHamburger";
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    TheHamburger
  },
  data(){
    return{
      logo:process.env.LOGO_URL,
      chosenDropDown: 0,
      timeout: null
    }
  },
  computed: {
    ...mapGetters({
      counter: 'basket/counter',
      cid: 'cid',
      global_labels: 'labels',
      nbaMenu: 'nbaMenu',
      nflMenu: 'nflMenu',
      mlbMenu: 'mlbMenu',
      nhlMenu: 'nhlMenu',
      productTypeMenu: 'productTypeMenu',
      brandMenu: 'brandMenu'
    })
  },
  directives: {
    ClickOutside
  },
  methods:{
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

<style lang="scss">
.header-wrapper {
  position: relative;
  display: flex;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
}
.uk-logo{
  padding:0;margin:0 15px 0 0;
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
  height: 75px;
}

.logo {
  @media (max-width: 420px) { 
    width: 190px;
  }
  @media (min-width: 421px) { 
    width: 250px;
  }
  
}

.hamburger {
  color: #00bbe0;
}
.hamburger:hover {
  color: #00bbe0;
}

.gd-subnav{
  padding-top:8px;
  padding-bottom:8px;
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  width:100%;
  &::-webkit-scrollbar {
    display: none;
  }
  > li > a{
    color:#fff !important;
  }
}
.uk-navbar-nav > li > a.subnav{
  min-height:auto;
  white-space:nowrap;
}

#dropdowns > .uk-navbar-dropdown{
  left:0;
  width:100%;
  max-height:440px;
  overflow-y:hidden;
  padding:10px 0 0 10px;
}
#dropdowns > .gradient{
  content: "";
  position: absolute;
  left: 0;
  margin-left: 0;
  height: 50px;
  width: 100%;
  bottom: 0;
  background: linear-gradient(hsla(0,0%,100%,0),#fff);
}

#dropdowns > .uk-navbar-dropdown > .uk-navbar-dropdown-nav{
  max-height:400px;
  padding-bottom:20px;
  width:100%;
  overflow-y:scroll;
}
</style>
