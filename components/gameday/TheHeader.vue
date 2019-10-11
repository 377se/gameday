<template>
  <div
    uk-sticky>
    <nav 
      class="uk-navbar-container uk-navbar uk-margin header uk-margin-remove-bottom" 
      uk-navbar>
      <div class="uk-navbar-left">
        <TheHamburger/>
      </div>

      <div class="uk-navbar-left">
        <a class="uk-navbar-item uk-logo" href="/"><img src="~assets/gameday-logo.svg" class="logo"></a>
      </div>

      <div 
        class="uk-navbar-right"
      >
        <nuxt-link
          to="/login"
          >
          <span 
            style="color:#fff;margin-right:5px;"
            uk-icon="icon:user;ratio:1.5"/>
        </nuxt-link>
        <a 
          href="#offscreen-basket" 
          uk-toggle="target: #offscreen-basket" 
          style="margin-right:12px;position:relative;"
          @click.stop.prevent
          >
          <span 
            class="basket-counter uk-text-small">{{ counter }}</span>
          <svg height='40px' width='40px' fill="#ffffff" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" version="1.1" x="0px" y="0px" viewBox="0 0 100 100"><g transform="translate(0,-952.36218)"><path style="text-indent:0;text-transform:none;direction:ltr;block-progression:tb;baseline-shift:baseline;color:#000000;enable-background:accumulate;" d="m 8.9999999,965.36223 c -1.1046,0 -2,0.8954 -2,2 0,1.1046 0.8954,2 2,2 l 12.3750001,0 10.5312,49.74997 c 0.2555,1.2291 1.0765,2.2629 2.0938,2.25 l 50,0 c 1.0566,0.015 2.0312,-0.9433 2.0312,-2 0,-1.0567 -0.9746,-2.015 -2.0312,-2 l -48.375,0 -10.6562,-50.43747 c -0.1983,-0.884 -1.0629,-1.5702 -1.9688,-1.5625 z m 22.0000001,12 6,29.99997 49,0 7,-29.99997 z m 13,47.99997 c -3.8659,0 -7,3.134 -7,7 0,3.866 3.1341,7 7,7 3.866,0 7,-3.134 7,-7 0,-3.866 -3.134,-7 -7,-7 z m 30,0 c -3.8659,0 -7,3.134 -7,7 0,3.866 3.1341,7 7,7 3.866,0 7,-3.134 7,-7 0,-3.866 -3.134,-7 -7,-7 z" fill="#ffffff" fill-opacity="1" stroke="none" marker="none" visibility="visible" display="inline" overflow="visible"></path></g></svg>
        </a>
      </div>
    </nav>
  </div>
</template>

<script>
import TheHamburger from "./TheHamburger";
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    TheHamburger
  },
  computed: {
    ...mapGetters({
      counter: 'basket/counter'
    })
  },
  methods:{
    showBasket(){

    }
  }
};
</script>

<style lang="scss">
@import '~/assets/scss/vars.scss';
.basket-counter{
  position: absolute;
  top: 1px;
  left: 50%;
  margin-left: -5px;
  color: rgb(0, 42, 50);
  background: orange;
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
  height: 50px;
}

.hamburger {
  color: #00bbe0;
}
.hamburger:hover {
  color: #00bbe0;
}
</style>
