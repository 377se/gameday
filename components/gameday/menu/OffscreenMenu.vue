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
        id="offscreenmenu-accordion"
        class="uk-padding-small uk-nav uk-nav-default uk-nav-parent-icon" uk-nav>
        <li
          v-for="cat in menu"
          :key="cat.CategoryId"
          :class="{'uk-parent':cat.SubList && cat.SubList.length>0}">
          <a
            v-if="!cat.SubList || !cat.SubList.length>0"
            :href="localePath(cat.Url)"
            @click.stop.prevent="$router.push({path:localePath(cat.Url)})">
            <img
              v-if="cat.ImageName" 
              :alt="cat.Name"
              :src="cat.ImageName" style="width:20px;margin-right:8px;">{{ cat.Name }}</a>
          <a v-else href="#">
            <img
              v-if="cat.ImageName" 
              :alt="cat.Name"
              :src="cat.ImageName" style="width:20px;margin-right:8px;">{{ cat.Name }}</a>
            <ul
              v-if="cat.SubList && cat.SubList.length>0">
              <li
                v-for="(sub) in cat.SubList"
                :key="sub.CategoryId">
                <a 
                  :href="localePath(sub.Url)"
                  @click.stop.prevent="$router.push({path:localePath(sub.Url)})">
                <img
                  v-if="sub.ImageName" 
                  :alt="sub.Name"
                  :src="'https://res.cloudinary.com/supportersplace/image/fetch/w_60,f_auto/'+sub.ImageName" style="width:20px;margin-right:8px;" />
                <span
                  v-else 
                  style="width:20px;margin-right:8px;" />{{ sub.Name }}</a>
              </li>
            </ul>
        </li>
      </ul>
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
      let [storyblok, menu] = await Promise.all([
          this.$axios.$get("https://api.storyblok.com/v1/cdn/datasource_entries?dimension="+this.$i18n.locale +"&datasource=gameday-fe-labels-offscreenmenu&token="+process.env.STORYBLOK +"&cv="+this.$store.getters.version),
          this.$axios.$get('/webapi/'+this.$i18n.locale+'/Navigation/Get')
      ]);
      this.menu = menu
      this.labels = storyblok.datasource_entries
    }catch(error){
      console.log('No data sources '+error);
    }
  },
  data() {
    return {
      menu: [],
      labels: [],
      isolang: process.env.ISO_LANG
    }
  },
  mounted(){
  },
  computed: {
    ...mapGetters({
      nbaMenu: 'nbaMenu',
      nflMenu: 'nflMenu',
      mlbMenu: 'mlbMenu',
      nhlMenu: 'nhlMenu',
      productTypeMenu: 'productTypeMenu',
      brandMenu: 'brandMenu',
      global_labels: 'labels'
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

<style lang="scss">
#offscreenmenu-accordion > li > a{
  color: #333;
}

#offscreenmenu-accordion > :nth-child(n+2) {
    margin-top: 4px;
}

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
