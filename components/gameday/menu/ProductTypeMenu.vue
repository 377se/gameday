<template>
  <div 
    v-if="productTypeMenu"
    id="offscreen-producttype-menu" 
    class="uk-offcanvas"
    uk-offcanvas="overlay:true">
    <div class="uk-offcanvas-bar menu">
      <div
        style="height:80px;background:#00bbe0"
        class="uk-flex">
        <h3 style="color:#fff;line-height:80px;margin-left:12px;">{{ $getCMSEntry(labels,'menu-producttype', 'Produkttyper') }}</h3>
        <button 
          id="close-menu-producttype-sidebar" 
          class="uk-offcanvas-close uk-icon uk-close"
          style="color:#fff;top:27px;" 
          type="button" uk-close></button>
      </div>
      <div>
        <div
          class="uk-padding-small">
          <ul class="uk-nav uk-nav-default uk-nav-parent-icon" uk-nav>
            <li
              v-for="brand in productTypeMenu"
              :key="brand.GarmentId">
              <nuxt-link
                :to="localePath('/produkttyp/'+brand.GarmentId+'/'+brand.SeoName)">{{ brand.Name }}</nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      productTypeMenu: 'productTypeMenu',
      labels: 'labels'
    })
  },
  watch:{
    $route (to, from){
      setTimeout(function(){
        document.getElementById('close-menu-producttype-sidebar').click();
      },10);
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
