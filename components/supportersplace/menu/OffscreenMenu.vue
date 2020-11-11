<template>
  <div 
    id="offscreen-menu" 
    class="uk-offcanvas"
    uk-offcanvas="overlay:true">
    <div class="uk-offcanvas-bar menu">
      <div
        class="uk-flex menu-ribbon">
        <h3 style="color:#fff;line-height:80px;margin-left:12px;">{{ $getCMSEntry(global_labels,'menu', 'Meny') }}</h3>
        <button 
          id="close-sidebar" 
          class="uk-offcanvas-close uk-icon uk-close"
          style="color:#fff;top:27px;" 
          type="button" uk-close></button>
      </div>
      
      <div>
        <div>
          <ul class="uk-padding-small uk-nav uk-nav-default uk-nav-parent-icon" uk-nav>
            <li
              v-for="cat in menu"
              :key="cat.Id"
              :class="{'uk-parent':cat.SubCategoryList.length>0}">
              <nuxt-link
                v-if="!cat.SubCategoryList.length>0"
                :to="localePath('/c/0/'+cat.Id+'/'+cat.UrlSafeName)">{{ cat.Name }}</nuxt-link>
              <a v-else href="#">{{ cat.Name }}</a>
                <ul
                  v-if="cat.SubCategoryList.length>0">
                  <li
                    v-for="(sub, index) in cat.SubCategoryList"
                    :key="sub.Id">{{ cat.parentId }}<nuxt-link :to="localePath('/c/'+(index>0?cat.Id:0)+'/'+sub.Id+'/'+sub.UrlSafeName)">{{ sub.Name }}</nuxt-link></li>
                </ul>
            </li>
            <li
              class="uk-parent">
              <a href="#">{{ $getCMSEntry(global_labels,'menu-brand', 'Varumärke') }}</a>
              <ul>
                <li
                  v-for="brand in brandMenu"
                  :key="brand.Id">
                  <nuxt-link
                    :to="localePath('/varumarke/'+brand.SeoName)">{{ brand.Name }}</nuxt-link>
                </li>
              </ul>
            </li>
            <li
              class="uk-parent">
              <a href="#">{{ $getCMSEntry(global_labels,'menu-producttypes', 'Produkttyper') }}</a>
              <ul>
                <li
                  v-for="brand in productTypeMenu"
                  :key="brand.GarmentId">
                  <nuxt-link
                    :to="localePath('/produkttyp/'+brand.SeoName+'/'+brand.GarmentId)">{{ brand.Name }}</nuxt-link>
                </li>
              </ul>
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
  async fetch() {
    try {
      let [menu] = await Promise.all([
          this.$axios.$get('/webapi/category')
      ]);
      this.menu = menu
    } catch (err) {
      console.log(err);
    }
  },
  data(){
    return{
      menu: []
    }
  },
  computed: {
    ...mapGetters({
      global_labels:'labels',
      brandMenu: 'brandMenu',
      productTypeMenu: 'productTypeMenu'
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
#offscreen-menu.uk-open{
  z-index:9999999;
}
.menu-ribbon{
  height:80px;
  background: $global-primary-background;
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
