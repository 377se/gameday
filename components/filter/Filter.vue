<template>
  <div
    v-if="true">
    <a 
      href="#filter-menu"
      type="button"
      class="uk-button uk-button-primary uk-button-small uk-margin-small-left"
      @click.prevent
      uk-toggle><span uk-icon="icon: settings;"/> Filter</a>


    <div 
      id="filter-menu" 
      class="uk-offcanvas"
      uk-offcanvas="overlay:true;flip:true">
      <div class="uk-offcanvas-bar">
        <div
          style="height:80px;background:#00bbe0"
          class="uk-flex">
          <h3 style="line-height:80px;margin-left:12px;color:#fff;">Filter</h3>
          <button 
            class="uk-offcanvas-close uk-icon uk-close"
            style="top:27px;right:6px;color:#fff;" 
            type="button" uk-close></button>
        </div>
        
        <form @submit.prevent="setFilter()">
          <ul 
            class="uk-nav uk-list uk-list-divider"
            style="margin-top:10px;"
            uk-accordion="multiple:true">
            <li 
              v-if="productTypes!=null && productTypes.length>0">
              <a
                class="uk-accordion-title" href="#">Produkttyper</a>
              <div class="uk-accordion-content">
                <ul class="uk-nav uk-list uk-list-divider">
                  <li 
                    v-for="pt in productTypes"
                    :key="pt.GarmentId">
                    <label><input type="checkbox" class="uk-checkbox" :id="pt.SeoName" :value="pt.SeoName" v-model="products_list" /> {{ pt.Name }}</label>
                  </li>
                </ul>
              </div>
            </li>
            <li
              v-if="colors!=null && colors.length>0">
              <a 
                class="uk-accordion-title" 
                href="#">Färger</a>
              <div class="uk-accordion-content">
                <ul class="uk-nav uk-list uk-list-divider">
                  <li 
                    v-for="c in colors"
                    :key="c.SeoName">
                    <label><input type="checkbox" class="uk-checkbox" :id="c.Id" :value="c.Id" v-model="colors_list" /> {{ c.Name }}</label>
                  </li>
                </ul>
              </div>
            </li>
            <li
              v-if="sizes!=null && sizes.length>0">
              <a 
                class="uk-accordion-title" 
                href="#">Storlekar</a>
              <div class="uk-accordion-content">
                <ul class="uk-nav uk-list uk-list-divider">
                  <li 
                    v-for="s in sizes"
                    :key="s.Id">
                    <label><input type="checkbox" class="uk-checkbox" :id="s.Id" :value="s.Id" v-model="sizes_list" /> {{ s.Id }}</label>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
          <div class="uk-padding-small uk-margin-small">
            <button class="uk-button uk-button-primary uk-width-1-1" type="submit">Filtrera</button>
          </div>
        </form>
      </div>
    </div>    
  </div>
</template>
<script>
export default {
  props:{
    productTypes:{
      type: Array,
      default: () => [],
      required: false
    },
    filter:{
      type: Array,
      default: () => [],
      required: false
    },
    colors:{
      type: Array,
      default: () => [],
      required: false
    },
    sizes:{
      type: Array,
      default: () => [],
      required: false
    }
  },
  data() {
    return{
      colors_list:[],
      sizes_list: [],
      products_list:[]
    }
  },
  mounted(){

  },
  methods:{
    setFilter(){
      let c = this.colors_list.length>0?this.colors_list.join(','):null
      let s = this.sizes_list.length>0?this.sizes_list.join(','):null
      let p = this.products_list.length>0?this.products_list.join(','):null
      this.$router.push(
        {
          path: this.$route.path, 
          query: { 
            color: c, 
            size: s,
            producttype:p
          }
        }
      ) 
      UIkit.offcanvas('#filter-menu').hide();
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~/assets/scss/vars.scss';

#filter-menu .uk-nav a, #filter-menu .uk-nav label{
    padding-left: 12px;
    color: $global-color;
}
#filter-menu .uk-accordion-content{
  margin-top:10px;
}
#filter-menu .uk-accordion-title{
  color:$global-color;
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

.uk-list-divider > li:nth-child(n+2){
  border-color:#c0eef7;
}

.sidebar-header{
  background:#333333;
  margin:-20px;
  min-height:50px;
}
.sidebar-header-content{
  min-height:50px;
}

@media (min-width: 960px){
  .sidebar-header{
    margin:-40px;
  }
}
</style>
