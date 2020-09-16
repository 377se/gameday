<template>
  <div 
    id="offscreen-menu" 
    class="uk-offcanvas"
    uk-offcanvas="overlay:true">
    <div class="uk-offcanvas-bar menu">
      <div
        style="height:80px;background:#00bbe0"
        class="uk-flex">
        <h3 style="color:#fff;line-height:80px;margin-left:12px;">{{ $getCMSEntry(labels,'menu', 'Meny') }}</h3>
        <button 
          id="close-sidebar" 
          class="uk-offcanvas-close uk-icon uk-close"
          style="color:#fff;top:27px;" 
          type="button" uk-close></button>
      </div>
      <ul 
        class="uk-child-width-expand uk-tab"
        style="margin-top:0;"
        uk-tab>
        <li>
          <a href="#"
          style="line-height:28px"
          @click.prevent>NHL</a>
        </li>
        <li>
          <a href="#"
          style="line-height:28px"
          @click.prevent>NFL</a>
        </li>
        <li>
          <a href="#"
          style="line-height:28px"
          @click.prevent>NBA</a>
        </li>
        <li>
          <a href="#"
          style="line-height:28px"
          @click.prevent>MLB</a>
        </li>
        <li>
          <a href="#"
          style="line-height:14px"
          @click.prevent>Premier League</a>
        </li>
      </ul>
      <div class="uk-switcher">
        <div>
          <ul class="uk-nav-default uk-nav-parent-icon uk-list" uk-nav>
            <li>
              <nuxt-link
                :to="localePath('/nhl-shop')">{{ $getCMSEntry(labels,'to-nhl-shop', 'Till NHL Shopen') }}</nuxt-link>
            </li>
            <li>
              <nuxt-link
                class="menu-item-sale"
                :to="localePath('/nhl-shop/sale')">{{ $getCMSEntry(labels,'nhl-sale', 'NHL REA') }}</nuxt-link>
            </li>
            <li class="uk-nav-header">{{ $getCMSEntry(labels,'most-popular-teams', 'Populäraste lagen') }}</li>
            <li><nuxt-link :to="localePath('/lag/nhl/boston-bruins')">Boston Bruins</nuxt-link></li>
            <li><nuxt-link :to="localePath('/lag/nhl/chicago-blackhawks')">Chicago Blackhawks</nuxt-link></li>
            <li><nuxt-link :to="localePath('/lag/nhl/new-york-rangers')">New York Rangers</nuxt-link></li>
            <li><nuxt-link :to="localePath('/lag/nhl/pittsburgh-penguins')">Pittsburgh Penguins</nuxt-link></li>
            <li class="uk-nav-header">{{ $getCMSEntry(labels,'all-teams-a-z', 'Alla lag (A-Z)') }}
            <li
              v-for="team in nhlMenu"
              :key="team.TeamId">
              <nuxt-link
                :to="localePath('/lag/nhl/'+team.SeoName)">{{ team.Name }}</nuxt-link>
            </li>
          </ul>
        </div>
        <div>
          <ul class="uk-nav-default uk-nav-parent-icon uk-list" uk-nav="multiple:true">
            <li>
              <nuxt-link
                :to="localePath('/nfl-shop')">{{ $getCMSEntry(labels,'to-nfl-shop', 'Till NFL Shopen') }}</nuxt-link>
            </li>
            <li>
              <nuxt-link
                class="menu-item-sale"
                :to="localePath('/nfl-shop/sale')">{{ $getCMSEntry(labels,'nfl-sale', 'NFL REA') }}</nuxt-link>
            </li>
            <li class="uk-nav-header">{{ $getCMSEntry(labels,'most-popular-teams', 'Populäraste lagen') }}</li>
            <li><nuxt-link :to="localePath('/lag/nfl/new-england-patriots')">New England Patriots</nuxt-link></li>
            <li><nuxt-link :to="localePath('/lag/nfl/las-vegas-raiders')">Las Vegas Raiders</nuxt-link></li>
            <li><nuxt-link :to="localePath('/lag/nfl/seattle-seahawks')">Seattle Seahawks</nuxt-link></li>
            <li><nuxt-link :to="localePath('/lag/nfl/dallas-cowboys')">Dallas Cowboys</nuxt-link></li>
            <li class="uk-nav-header">{{ $getCMSEntry(labels,'all-teams-a-z', 'Alla lag (A-Z)') }}</li>
            <li
              v-for="team in nflMenu"
              :key="team.TeamId">
              <nuxt-link
                :to="localePath('/lag/nfl/'+team.SeoName)">{{ team.Name }}</nuxt-link>
            </li>
          </ul>
        </div>
        <div>
          <ul class="uk-nav-default uk-nav-parent-icon uk-list" uk-nav="multiple:true">
            <li>
              <nuxt-link
                :to="localePath('/nba-shop')">{{ $getCMSEntry(labels,'to-nba-shop', 'Till NBA Shopen') }}</nuxt-link>
            </li>
            <li>
              <nuxt-link
                class="menu-item-sale"
                :to="localePath('/nba-shop/sale')">{{ $getCMSEntry(labels,'nba-sale', 'NBA REA') }}</nuxt-link>
            </li>
            <li class="uk-nav-header">{{ $getCMSEntry(labels,'most-popular-teams', 'Populäraste lagen') }}</li>
            <li><nuxt-link :to="localePath('/lag/nba/chicago-bulls')">Chicago Bulls</nuxt-link></li>
            <li><nuxt-link :to="localePath('/lag/nba/cleveland-cavaliers')">Cleveland Cavaliers</nuxt-link></li>
            <li><nuxt-link :to="localePath('/lag/nba/golden-state-warriors')">Golden State Warriors</nuxt-link></li>
            <li><nuxt-link :to="localePath('/lag/nba/brooklyn-nets')">Brooklyn Nets</nuxt-link></li>
            <li class="uk-nav-header">{{ $getCMSEntry(labels,'all-teams-a-z', 'Alla lag (A-Z)') }}</li>
            <li
              v-for="team in nbaMenu"
              :key="team.TeamId">
              <nuxt-link
                :to="localePath('/lag/nba/'+team.SeoName)">{{ team.Name }}</nuxt-link>
            </li>
          </ul>
        </div>
        <div>
          <ul class="uk-nav-default uk-nav-parent-icon uk-list" uk-nav>
            <li>
              <nuxt-link
                :to="localePath('/mlb-shop')">{{ $getCMSEntry(labels,'to-mlb-shop', 'Till MLB Shopen') }}</nuxt-link>
            </li>
            <li>
              <nuxt-link
                class="menu-item-sale"
                :to="localePath('/mlb-shop/sale')">{{ $getCMSEntry(labels,'mlb-sale', 'MLB REA') }}</nuxt-link>
            </li>
            <li class="uk-nav-header">{{ $getCMSEntry(labels,'most-popular-teams', 'Populäraste lagen') }}</li>
            <li><nuxt-link :to="localePath('/lag/mlb/new-york-yankees')">New York Yankees</nuxt-link></li>
            <li><nuxt-link :to="localePath('/lag/mlb/detroit-tigers')">Detroit Tigers</nuxt-link></li>
            <li><nuxt-link :to="localePath('/lag/mlb/los-angeles-dodgers')">Los Angeles Dodgers</nuxt-link></li>
            <li><nuxt-link :to="localePath('/lag/mlb/new-york-mets')">New York Mets</nuxt-link></li>
            <li class="uk-nav-header">{{ $getCMSEntry(labels,'all-teams-a-z', 'Alla lag (A-Z)') }}</li>
            <li
              v-for="team in mlbMenu"
              :key="team.TeamId">
              <nuxt-link
                :to="localePath('/lag/mlb/'+team.SeoName)">{{ team.Name }}</nuxt-link>
            </li>
          </ul>
        </div>
        <div>
          <ul class="uk-nav-default uk-nav-parent-icon uk-list" uk-nav>
            <li>
              <nuxt-link
                :to="localePath('/premier-league')">{{ $getCMSEntry(labels,'to-premier-league', 'Till Premier League') }}</nuxt-link>
            </li>
            <li>
              <nuxt-link
                class="menu-item-sale"
                :to="localePath('/premier-league/sale')">{{ $getCMSEntry(labels,'premier-league-sale', 'Premier League REA') }}</nuxt-link>
            </li>
            <li class="uk-nav-header">{{ $getCMSEntry(labels,'all-teams-a-z', 'Alla lag (A-Z)') }}
            <li
              v-for="team in plMenu"
              :key="team.TeamId">
              <nuxt-link
                :to="localePath('/lag/premier-league/'+team.SeoName)">{{ team.Name }}</nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

//To be added to store. Top team list
//”https://beta.supporterprylar.se/webapi/Filter/GetTopTeamListBySeoName?seoName=mlb”
export default {
  async fetch () {
    try{
      let [storyblok] = await Promise.all([
          this.$axios.$get("https://api.storyblok.com/v1/cdn/datasource_entries?dimension="+process.env.ISO_LANG_COUNTRY.toLowerCase() +"&gameday-fe-labels-offscreenmenu&token="+process.env.STORYBLOK +"&cv="+this.$store.getters.version)
      ]);
      this.labels = storyblok.datasource_entries
    }catch(error){
      logger.error(error);
    }
  },
  data() {
    return {
      labels: []
    }
  },
  computed: {
    ...mapGetters({
      nbaMenu: 'nbaMenu',
      nflMenu: 'nflMenu',
      mlbMenu: 'mlbMenu',
      nhlMenu: 'nhlMenu',
      plMenu: 'plMenu'
    })
  },
  watch:{
    $route (to, from){
      setTimeout(function(){
        document.getElementById('close-sidebar').click();
      },10);
    }
  }
};
</script>

<style lang="scss" scoped>
#offscreen-menu.uk-open{
  z-index:9999999;
}
.menu {
  background-color: #ffffff !important;
  width: 310px;
  height: 100%;
}

.uk-offcanvas-bar{
  padding:0;
  background:#ffffff;
}
.uk-tab > li.uk-active > a
{
  background:#ffffff;
  color:#333333;
  border-color:#ffffff;
}
.uk-tab > li.uk-active > a > svg {
  fill: #333333;
}


.uk-switcher{
  background:#ffffff;
  color:#000000;
  margin:0;
  padding:20px 10px 10px 10px;
}
.sidebar-header{
  background:#333333;
  margin:-20px;
  min-height:50px;
}
.sidebar-header-content{
  min-height:50px;
}
.uk-tab{
  margin:0;
}
.uk-tab > li > a{
  padding-top:10px;
  padding-bottom:10px;
  text-align:center;
  font-size:9px;
  text-transform:none;
  background:#c0eef7;
  color:#8C8C8C;
}
.uk-tab > li > a > svg{
  fill: #8C8C8C;
}
.uk-tab > li > a:hover{
  color:#333333;
}
.uk-tab > li > a:hover > svg{
  fill:#333333;
}

.uk-tab > li{
  padding-left:0;
}

.uk-tab::before{
  left:0px;
}
@media (min-width: 960px){
  .sidebar-header{
    margin:-40px;
  }
}

.menu-item-sale, .menu-item-sale:hover,.menu-item-sale:active{
  color: #ec6a18;
}
</style>
