<template>
  <div
    uk-sticky
    @click.stop.prevent="chosenDropDown=0"
    v-click-outside="hideDropDown"
    style="outline:0; background-color: #EAEAEA;"
    tabindex="0">
    <nav 
      class="uk-navbar-container uk-navbar uk-margin header uk-margin-remove-bottom uk-light" 
      uk-navbar>
      <div class="header-wrapper">
      <div class="uk-navbar-left uk-flex-nowrap">
        <TheHamburger/>
        <nuxt-link 
          class="uk-navbar-item uk-logo" 
          :to="localePath('/')"><img :src="logo" class="logo"></nuxt-link>
      </div>

      <div 
        style="flex-wrap:nowrap"
        class="uk-navbar-right uk-text-center"
      >
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
      class="gd-subnav uk-subnav uk-margin-remove-top uk-margin-remove-bottom uk-flex-nowrap uk-flex-middle">
      <li
        v-for="(cat, index) in menu"
        :key="cat.Id"
        class="uk-flex uk-flex-middle">
        <nuxt-link
          v-if="cat.SubCategoryList.length==0"
          :to="localePath('/c/'+(!cat.SubCategoryList.length==0?'0':'0')+'/'+cat.Id+'/'+cat.UrlSafeName)">
            <img
              v-if="cat.ImageThumb" 
              :src="cat.ImageThumb" 
              alt=""
              style="width:20px;margin-right:8px;"><span>{{ cat.Name }}</span>
        </nuxt-link>
        <a 
          v-else
          :href="localePath('/c/'+(!cat.SubCategoryList.length==0?'0':'0')+'/'+cat.Id+'/'+cat.UrlSafeName)"
          class="subnav"
          @click.stop.prevent="showDropDown(index+1)">
          <img
            v-if="cat.ImageThumb" 
            alt=""
            :src="cat.ImageThumb" style="width:20px;margin-right:8px;"><span>{{ cat.Name }}</span><span v-if="cat.SubCategoryList.length>0" uk-icon="icon:triangle-down" class="uk-icon" style="width:20px;"/>
        </a>
      </li>
      <li>
      <nuxt-link
        :to="localePath('/produkttyp/18/kepsar')">
        <span>Kepsar</span>
      </nuxt-link>
      </li>
      <li>
        <nuxt-link
          :to="localePath('/produkttyp/12/t-shirt')">
          <span>T-Shirts</span>
        </nuxt-link>
      </li>
    </ul>
    <div 
      id="dropdowns">
      <div class="uk-navbar-dropdown"
        v-for="(cat, ind) in menu"
        :key="cat.Id"
        :class="{'uk-display-block':chosenDropDown == ind+1}">
        <ul class="uk-nav uk-navbar-dropdown-nav uk-flex uk-grid uk-grid-small uk-child-width-1-2 uk-child-width-1-2@s uk-child-width-1-4@m uk-child-width-1-6@l">
          <li
            v-for="(sub, index) in cat.SubCategoryList"
            :key="sub.Id"
            class="uk-padding-remove-left">
            <nuxt-link :to="localePath('/c/'+(index>0?cat.Id:0)+'/'+sub.Id+'/'+sub.UrlSafeName)">
              <img
                v-if="sub.ImageThumb" 
                alt=""
                :src="'https://res.cloudinary.com/supportersplace/image/fetch/w_60,f_auto/'+sub.ImageThumb" style="width:30px" />
              <img
                v-else-if="cat.ImageThumb" 
                alt=""
                :src="cat.ImageThumb" style="width:30px" /> {{ sub.Name }}
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside'
import TheHamburger from "./TheHamburger";
import { mapGetters, mapActions } from 'vuex'
export default {
  async mounted(){
    try {
      let [menu] = await Promise.all([
          this.$axios.$get('/webapi/'+this.$i18n.locale+'/category/get')
      ]);
      this.menu = menu
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
      timeout: null
    }
  },
  computed: {
    ...mapGetters({
      global_labels: 'labels',
      counter: 'basket/counter',
      cid: 'cid'
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
      timeout: null
    }
  },
  computed: {
    ...mapGetters({
      global_labels: 'labels',
      counter: 'basket/counter',
      cid: 'cid'
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

<style lang="scss" scoped>
/*Overriding styles in layout-default*/
.gd-slider{
  text-transform:uppercase;
  border-bottom:4px solid #fff;
}
/*end overriding*/
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
  height: 50px;
  width: auto;
}

.gd-subnav{
  border-top:1px solid #fff;
  font-family: 'Poppins';
  background: $global-secondary-background;
  padding-top:8px;
  padding-bottom:8px;
  display: flex;
  flex-direction: row;
  overflow: scroll;
  overflow-y: hidden;
  margin-left:0 !important;
  width:100%;
  &::-webkit-scrollbar {
    display: none;
  }
  > li > a{
    color:$global-color !important;
  }
  > li:first-child{
    padding-left: 10px !important;
  }
  > li:last-child{
    padding-right: 20px !important;
  }
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
  padding-bottom:5px;
  width:100%;
  overflow-y:scroll;
}
</style>

