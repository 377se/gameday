<template>
  <div 
    v-editable="blok"
    class="uk-position-relative uk-grid-small"
    tabindex="-1"
    uk-slider>
    <ul class="uk-slider-items uk-grid-small">
      <li class="uk-width-5-6"
        v-for="child in blok.body" :key="child._uid">
        <component 
          :blok="child" :is="child.component"/>
      </li>
    </ul>
  </div>
</template>
<script>
import promo from '@/components/promo/Promo'
export default {
  components:{
    promo
  },
  props: {
    blok: {
      type: Object,
      required: true,
    }
  },
  mounted(){

  }
}
</script>
<style lang="scss">

</style>