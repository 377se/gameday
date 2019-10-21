<template>
  <div 
    id="offscreen-menu" 
    class="uk-offcanvas"
    uk-offcanvas="overlay:true">
    <div class="uk-offcanvas-bar menu">
      <div
        style="height:80px;background:#00bbe0"
        class="uk-flex">
        <h3 style="line-height:80px;margin-left:12px;">Meny</h3>
        <button 
          id="close-sidebar" 
          class="uk-offcanvas-close uk-icon uk-close"
          style="top:27px;" 
          type="button" uk-close></button>
      </div>
      <ul 
        class="uk-child-width-expand uk-tab"
        style="margin-top:0;"
        uk-tab>
        <li>
          <a href="#"
          @click.prevent><br>NBA</a>
        </li>
        <li>
          <a href="#"
          @click.prevent><br>NFL</a>
        </li>
        <li>
          <a href="#"
          @click.prevent><br>MLB</a>
        </li>
        <li>
          <a href="#"
          @click.prevent><br>NHL</a>
        </li>
        <!--li>
          <a 
            href="#"
            @click.prevent><br>PL</a>
        </li-->
      </ul>
      <div class="uk-switcher">
        <div>
          <ul class="uk-list uk-list-divider">
            <li>
              <nuxt-link
                to="/nba-shop">All NBA</nuxt-link>
            </li>
            <li
              v-for="team in nbaMenu"
              :key="team.CategoryId">
              <nuxt-link
                :to="'/lag/nba/'+team.SeoName">{{ team.Name }}</nuxt-link>
            </li>
          </ul>
        </div>
        <div>
          <ul class="uk-list uk-list-divider">
            <li>
              <nuxt-link
                to="/nfl-shop">All NFL</nuxt-link>
            </li>
            <li
              v-for="team in nflMenu"
              :key="team.CategoryId">
              <nuxt-link
                :to="'/lag/nfl/'+team.SeoName">{{ team.Name }}</nuxt-link>
            </li>
          </ul>
        </div>
        <div>
          <ul class="uk-list uk-list-divider">
            <li>
              <nuxt-link
                to="/mlb-shop">All MLB</nuxt-link>
            </li>
            <li
              v-for="team in mlbMenu"
              :key="team.CategoryId">
              <nuxt-link
                :to="'/lag/mlb/'+team.SeoName">{{ team.Name }}</nuxt-link>
            </li>
          </ul>
        </div>
        <div>
          <ul class="uk-list uk-list-divider">
            <li>
              <nuxt-link
                to="/nhl-shop">All NHL</nuxt-link>
            </li>
            <li
              v-for="team in nhlMenu"
              :key="team.CategoryId">
              <nuxt-link
                :to="'/lag/nhl/'+team.SeoName">{{ team.Name }}</nuxt-link>
            </li>
          </ul>
        </div>
        <!--div>
          <ul class="uk-list uk-list-divider">
            <li
              v-for="team in plMenu"
              :key="team.CategoryId">
              <nuxt-link
                :to="'/lag/premier-league/'+team.SeoName">{{ team.Name }}</nuxt-link>
            </li>
          </ul>
        </div-->
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
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
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/vars.scss';

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

.uk-list > li > a{
  color: #8c8c8c;
}

.uk-list-divider > li:nth-child(n+2){
  border-color:#c0eef7;
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
</style>
