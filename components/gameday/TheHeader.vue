<template>
  <div 
    uk-sticky
    @click.stop.prevent="chosenDropDown=0">
      <nav 
        class="uk-navbar-container uk-navbar uk-margin header uk-margin-remove-bottom uk-light" 
        uk-navbar>

        <div class="uk-navbar-left">
          <TheHamburger/>
          <nuxt-link 
            class="uk-navbar-item uk-margin-small-left uk-logo" 
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
            :to="localePath('/my-account')"
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
      </nav>
      <nav 
        class="uk-navbar-container">
      <ul 
      class="gd-subnav uk-navbar-nav uk-background-secondary uk-margin-remove-top uk-margin-remove-bottom uk-flex-nowrap uk-margin-remove-left">
      <li>
        <nuxt-link
          to="/produkttyp/18/kepsar"
          class="subnav">Kepsar</nuxt-link>
      </li>
      <li>
        <nuxt-link
          to="/produkttyp/12/t-shirt-pike"
          class="subnav">T-shirts</nuxt-link>
      </li>
      <li>
        <a 
          href="#"
          class="subnav"
          @click.stop.prevent="chosenDropDown=(chosenDropDown!=1)?1:0">Mer <span uk-icon="icon:triangle-down" class="uk-icon" style="width:20px;"></span></a>
      </li>
      <li>
        <a 
          href="#"
          class="subnav"
          @click.stop.prevent="chosenDropDown=(chosenDropDown!=2)?2:0">Varumärken <span uk-icon="icon:triangle-down" class="uk-icon" style="width:20px;"></span></a>
      </li>
      <li>
        <a 
          href="/nhl-shop"
          class="subnav"
          @click.stop.prevent="chosenDropDown=(chosenDropDown!=3)?3:0">NHL <span uk-icon="icon:triangle-down" class="uk-icon" style="width:20px;"></span></a>
      </li>
      <li>
        <a 
          href="/nfl-shop"
          class="subnav"
          @click.stop.prevent="chosenDropDown=(chosenDropDown!=4)?4:0">NFL <span uk-icon="icon:triangle-down" class="uk-icon" style="width:20px;"></span></a>
          
      </li>
      <li>
        <a 
          href="/nba-shop"
          class="subnav"
          @click.stop.prevent="chosenDropDown=(chosenDropDown!=5)?5:0">NBA <span uk-icon="icon:triangle-down" class="uk-icon" style="width:20px;"></span></a>
      </li>
      <li>
        <a 
          href="/mlb-shop"
          class="subnav"
          @click.stop.prevent="chosenDropDown=(chosenDropDown!=6)?6:0">MLB <span uk-icon="icon:triangle-down" class="uk-icon" style="width:20px;"></span></a>
      </li>
      </ul>
    </nav>
    <div id="dropdowns">
      <div 
        class="uk-navbar-dropdown"
        :class="{'uk-display-block':chosenDropDown == 1}">
        <ul class="uk-nav uk-navbar-dropdown-nav">
          <li
            v-for="p in productTypeMenu"
            :key="p.GarmentId">
            <nuxt-link
              :to="localePath('/produkttyp/'+p.GarmentId+'/'+p.SeoName)">{{ p.Name }}</nuxt-link>
          </li>
        </ul>
      </div>
      <div class="uk-navbar-dropdown"
        :class="{'uk-display-block':chosenDropDown == 2}">
        <ul class="uk-nav uk-navbar-dropdown-nav">
          <li
            v-for="brand in brandMenu"
            :key="brand.Id">
            <nuxt-link
              :to="localePath('/varumarke/'+brand.SeoName)">{{ brand.Name }}</nuxt-link>
          </li>
        </ul>
      </div>
      <div class="uk-navbar-dropdown"
        :class="{'uk-display-block':chosenDropDown == 3}">
        <ul class="uk-nav uk-navbar-dropdown-nav">
          <li
            v-for="team in nhlMenu"
            :key="team.TeamId">
            <nuxt-link
              :to="localePath('/lag/nhl/'+team.SeoName)">{{ team.Name }}</nuxt-link>
          </li>
        </ul>
      </div>
      <div class="uk-navbar-dropdown"
        :class="{'uk-display-block':chosenDropDown == 4}">
        <ul class="uk-nav uk-navbar-dropdown-nav">
          <li
            v-for="team in nflMenu"
            :key="team.TeamId">
            <nuxt-link
              :to="localePath('/lag/nfl/'+team.SeoName)">{{ team.Name }}</nuxt-link>
          </li>
        </ul>
      </div>
      <div class="uk-navbar-dropdown"
        :class="{'uk-display-block':chosenDropDown == 5}">
        <ul class="uk-nav uk-navbar-dropdown-nav">
          <li
            v-for="team in nbaMenu"
            :key="team.TeamId">
            <nuxt-link
              :to="localePath('/lag/nba/'+team.SeoName)">{{ team.Name }}</nuxt-link>
          </li>
        </ul>
      </div>
      <div class="uk-navbar-dropdown"
        :class="{'uk-display-block':chosenDropDown == 6}">
        <ul class="uk-nav uk-navbar-dropdown-nav">
          <li
            v-for="team in mlbMenu"
            :key="team.TeamId">
            <nuxt-link
              :to="localePath('/lag/mlb/'+team.SeoName)">{{ team.Name }}</nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import TheHamburger from "./TheHamburger";
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    TheHamburger
  },
  data(){
    return{
      logo:process.env.LOGO_URL,
      chosenDropDown: 1
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
  methods:{
    showMenu(num){
      try{
        UIkit.offcanvas('#offscreen-menu').show()
        //UIkit.accordion('#offscreenmenu-accordion').toggle(num, false);
      }catch(err){console.log(err)}
    }
  }
};
</script>

<style lang="scss">
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
  background-color: $global-primary-background !important;
  height: 80px;
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
}
</style>
