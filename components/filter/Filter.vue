<template>
  <div class="uk-container uk-padding-small">
    <div class="uk-text-center">
      <a 
        href="#filter-menu"
        type="button"
        class="uk-button uk-button-primary"
        @click.prevent
        uk-toggle><span uk-icon="icon: settings;"/> Filter</a>
    </div>


    <div 
      id="filter-menu" 
      class="uk-offcanvas"
      uk-offcanvas="overlay:true;flip:true">
      <div class="uk-offcanvas-bar menu">
        <div
          style="height:80px;background:#00bbe0"
          class="uk-flex">
          <h3 style="line-height:80px;margin-left:12px;">Filter</h3>
          <button 
            id="close-sidebar" 
            class="uk-offcanvas-close uk-icon uk-close"
            style="top:27px;" 
            type="button" uk-close></button>
        </div>
        <ul uk-accordion="multiple: true">
          <li 
            v-if="productTypes!=null && productTypes.length>0"
            class="uk-open">
            <a
              style="color:#000" 
              class="uk-accordion-title" href="#">Produkttyper</a>
            <div class="uk-accordion-content">
              <ul class="uk-list">
                <li 
                  v-for="pt in productTypes"
                  :key="pt.GarmentId"
                  style="color:#000">
                  {{ pt.Name }}
                </li>
              </ul>
            </div>
          </li>
          <li
            v-if="colors!=null && colors.length>0">
            <a 
              class="uk-accordion-title" 
              href="#"
              style="color:#000">Färger</a>
            <div class="uk-accordion-content">
              <ul class="uk-list">
                <li 
                  v-for="c in colors"
                  :key="c.SeoName"
                  style="color:#000">
                  {{ c.Name }}
                </li>
              </ul>
            </div>
          </li>
          <li
            v-if="sizes!=null && sizes.length>0">
            <a 
              class="uk-accordion-title" 
              href="#"
              style="color:#000">Storlekar</a>
            <div class="uk-accordion-content">
              <ul class="uk-list">
                <li 
                  v-for="s in sizes"
                  :key="s.Value"
                  style="color:#000">
                  {{ s.Name }}
                </li>
              </ul>
            </div>
          </li>
        </ul>
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
  mounted(){

  }
}
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
