<template>
  <div>
    <span class="uk-text-center">
      <a 
        href="#filter-menu"
        type="button"
        class="uk-button uk-button-secondary uk-button-small"
        @click.prevent="showFilter()"><span uk-icon="icon: settings;"/> {{ $getCMSEntry(global_labels,'filter_header', 'Filter') }} <span v-if="numfilters>0">({{ numfilters }})</span></a>
    </span>  
    <div 
      id="filter-menu" 
      class="uk-modal-full uk-open uk-modal"
      uk-modal="container:false;">
      <div 
        class="uk-modal-dialog"
        style="min-height:100%;">
        <form 
          @submit.prevent="setFilter()">
          <div 
            class="uk-modal-body uk-overflow-auto" 
            style="padding:0px;height:100vh;background:#ffffff;"
            uk-overflow-auto>
            <div
              class="uk-flex sd-modal-header">
              <h3 style="line-height:80px;margin-left:12px;color:#fff;">{{ $getCMSEntry(global_labels,'filter_header', 'Filter') }}</h3>
              <button 
                class="uk-offcanvas-close uk-icon uk-close"
                style="top:27px;right:6px;color:#fff;" 
                type="button" 
                uk-close
                uk-toggle="target: #filter-menu"></button>
            </div>  
            <ul
              class="uk-nav uk-list uk-list-divider"
              style="margin-top:10px;">
              <li 
                v-if="show_sale">
                <label><input type="checkbox" class="uk-checkbox" value="true" v-model="sale_list" /> {{ $getCMSEntry(global_labels,'filter_sale', 'REA') }}</label>
              </li>
            </ul>
            <ul 
              class="uk-nav uk-list uk-list-divider"
              style="margin-top:10px;padding-bottom:150x;"
              uk-accordion="multiple:true">
              <li 
                v-if="teams!=null && teams.length>0">
                <a
                  class="uk-accordion-title" href="#">
                    {{ $getCMSEntry(global_labels,'filter_team', 'Lag') }}
                    <span 
                      style="font-size:0.7rem;display:block;">{{ team_list.length }} {{ $getCMSEntry(global_labels,'filter_selected', 'filter valt') }}</span>
                </a>
                <div class="uk-accordion-content">
                  <ul class="uk-nav uk-list uk-list-divider">
                    <li 
                      v-for="t in teams"
                      :key="t.TeamId">
                      <label><input type="checkbox" class="uk-checkbox" :value="t.TeamId" v-model="team_list" /> {{ t.Name }}</label>
                    </li>
                  </ul>
                </div>
              </li>
              <li 
                v-if="productTypes!=null && productTypes.length>0">
                <a
                  class="uk-accordion-title" href="#">
                    {{ $getCMSEntry(global_labels,'filter_producttype', 'Produkttyper') }}
                    <span 
                      style="font-size:0.7rem;display:block;">{{ products_list.length }} {{ $getCMSEntry(global_labels,'filter_selected', 'filter valt') }}</span>
                </a>
                <div class="uk-accordion-content">
                  <ul class="uk-nav uk-list uk-list-divider">
                    <li 
                      v-for="pt in productTypes"
                      :key="pt.GarmentId">
                      <label><input type="checkbox" class="uk-checkbox" :value="pt.GarmentId" v-model="products_list" /> {{ pt.Name }}</label>
                    </li>
                  </ul>
                </div>
              </li>
              <li 
                v-if="gender!=null && gender.length>0">
                <a
                  class="uk-accordion-title" href="#">
                    {{ $getCMSEntry(global_labels,'filter_gender', 'Kön') }}
                    <span 
                      style="font-size:0.7rem;display:block;">{{ gender_list.length }} {{ $getCMSEntry(global_labels,'filter_selected', 'filter valt') }}</span>
                </a>
                <div class="uk-accordion-content">
                  <ul class="uk-nav uk-list uk-list-divider">
                    <li 
                      v-for="g in gender"
                      :key="g.Id">
                      <label><input type="checkbox" class="uk-checkbox" :value="g.Id" v-model="gender_list" /> {{ g.Name }}</label>
                    </li>
                  </ul>
                </div>
              </li>
              <li
                v-if="colors!=null && colors.length>0">
                <a 
                  class="uk-accordion-title" 
                  href="#">
                  {{ $getCMSEntry(global_labels,'filter_color', 'Färger') }}
                  <span 
                      style="font-size:0.7rem;display:block;">{{ colors_list.length }} {{ $getCMSEntry(global_labels,'filter_selected', 'filter valt') }}</span>
                </a>
                <div class="uk-accordion-content">
                  <ul class="uk-nav uk-list uk-list-divider">
                    <li 
                      v-for="c in colors"
                      :key="c.SeoName">
                      <label><input type="checkbox" class="uk-checkbox" :value="c.Id" v-model="colors_list" /> {{ c.Name }}</label>
                    </li>
                  </ul>
                </div>
              </li>
              <li
                v-if="sizes!=null && sizes.length>0">
                <a 
                  class="uk-accordion-title" 
                  href="#">
                  {{ $getCMSEntry(global_labels,'filter_sizes', 'Storlekar') }}
                  <span 
                      style="font-size:0.7rem;display:block;">{{ sizes_list.length }} {{ $getCMSEntry(global_labels,'filter_selected', 'filter valt') }}</span>
                </a>
                <div class="uk-accordion-content">
                  <ul class="uk-nav uk-list uk-list-divider">
                    <li 
                      v-for="s in sizes"
                      :key="s.Id">
                      <label><input type="checkbox" class="uk-checkbox" :value="s.Id" v-model="sizes_list" /> {{ s.Id }}</label>
                    </li>
                  </ul>
                </div>
              </li>
              <li
                v-if="brands!=null && brands.length>0">
                <a 
                  class="uk-accordion-title" 
                  href="#">
                  {{ $getCMSEntry(global_labels,'filter_brand', 'Varumärken') }}
                  <span 
                      style="font-size:0.7rem;display:block;">{{ brands_list.length }} {{ $getCMSEntry(global_labels,'filter_selected', 'filter valt') }}</span>
                </a>
                <div class="uk-accordion-content">
                  <ul class="uk-nav uk-list uk-list-divider">
                    <li 
                      v-for="b in brands"
                      :key="b.Id">
                      <label><input type="checkbox" class="uk-checkbox" :value="b.Id" v-model="brands_list" /> {{ b.Name }}</label>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
          <div 
            class="uk-modal-footer"
            style="padding:0;border:0;">
            <div class="filter-button uk-padding-small uk-margin-small uk-margin-remove-bottom">
              <button class="uk-button uk-button-primary uk-width-1-1" type="submit">{{ $getCMSEntry(global_labels,'filter_button', 'Filtrera') }}</button>
            </div>
          </div>
        </form>
      </div>
    </div>  
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  props:{
    productTypes:{
      type: Array,
      default: () => [],
      required: false
    },
    gender:{
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
    brands:{
      type: Array,
      default: () => [],
      required: false
    },
    sizes:{
      type: Array,
      default: () => [],
      required: false
    },
    teams: {
      type: Array,
      default: () => [],
      required: false
    },
    show_sale:{
      type: Boolean,
      default: true,
      required: false
    }
  },
  data() {
    return{
      colors_list: [],
      sizes_list: [],
      products_list: [],
      gender_list: [],
      team_list: [],
      brands_list: [],
      sale_list: [],
      labels: [],
      numfilters:0
    }
  },
  computed: {
    ...mapGetters({
      global_labels:'labels'})
  },
  mounted(){
    this.setNumFilters();
    try{
      UIkit.modal('#filter-menu').hide()
    }catch(err){}
  },
  methods:{
    showFilter(){
      UIkit.modal('#filter-menu').show()
    },
    setNumFilters(){
      let nf = 0
      if(this.$route.query.color){
        this.colors_list = this.$route.query.color.split(',')
        nf+=this.colors_list.length
      }
      if(this.$route.query.gender){
        this.gender_list = this.$route.query.gender.split(',')
        nf+=this.gender_list.length
      }
      if(this.$route.query.team){
        this.team_list = this.$route.query.team.split(',')
        nf+=this.team_list.length
      }
      if(this.$route.query.brand){
        this.brands_list = this.$route.query.brand.split(',')
        nf+=this.brands_list.length
      }
      if(this.$route.query.size){
        this.sizes_list = this.$route.query.size.split(',')
        nf+=this.sizes_list.length
      }
      if(this.$route.query.producttype){
        this.products_list = this.$route.query.producttype.split(',')
        nf+=this.products_list.length
      }
      if(this.$route.query.sale){
        this.sale_list = this.$route.query.sale.split(',')
        nf+=this.sale_list.length
      }
      
      this.numfilters = nf
    },
    setFilter(){
      let g = this.gender_list.length>0?this.gender_list.join(','):null
      let c = this.colors_list.length>0?this.colors_list.join(','):null
      let s = this.sizes_list.length>0?this.sizes_list.join(','):null
      let p = this.products_list.length>0?this.products_list.join(','):null
      let t = this.team_list.length>0?this.team_list.join(','):null
      let sa = this.sale_list.length>0?this.sale_list.join(','):null
      let b = this.brands_list.length>0?this.brands_list.join(','):null
      UIkit.modal('#filter-menu').hide()
      this.$router.push(
        {
          path: this.$route.path, 
          query: { 
            sale: sa,
            gender: g,
            color: c, 
            size: s,
            producttype:p,
            team: t,
            brand: b
          }
        }
      ) 
      this.numfilters = this.brands_list.length + this.sale_list.length + this.gender_list.length + this.colors_list.length + this.sizes_list.length + this.products_list.length + this.team_list.length
    }
  }
}
</script>
<style lang="scss" scoped>
.filter-button{
  width:310px;
  position:fixed;
  background: #fff;
  bottom:0;
  box-shadow: 0px 0px 8px 2px rgba(0,0,0,0.08);
}

#filter-menu{
  z-index: 999999; //ZD was on top otherwise
}

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

.sd-modal-header{
  height:80px;background:$global-primary-background;
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
  .filter-button{
    width:310px;
  }
}

#filter-menu.uk-modal-full {
  background: rgba(0, 0, 0, 0.6);
}
#filter-menu .uk-modal-dialog{
  margin-left: auto;
  max-width:340px !important;
}
</style>
