<template>
  <div 
    v-editable="blok"
    class="uk-position-relative uk-grid-small"
    style="margin-right:-15px;"
    tabindex="-1"
    uk-slider>
    <ul 
      class="uk-slider-items uk-grid-small">
      <li 
        class="uk-width-5-6"
        :class="{
            'uk-width-1-2@s uk-width-1-2@m  uk-width-1-2@l  uk-width-1-2@xl':blok.body.length==2,
            'uk-width-2-5@s uk-width-1-3@m  uk-width-1-3@l  uk-width-1-3@xl':blok.body.length==3,
            'uk-width-2-5@s uk-width-2-5@m  uk-width-1-4@l  uk-width-1-4@xl':blok.body.length>3,
            }"
        v-for="child in blok.body" :key="child._uid">
        <component 
          :blok="child" 
          :is="child.component"
          :promo-list="true"/>
      </li>
    </ul>
  </div>
</template>
<script>
import promo from '@/components/promo/Promo'
import promo_video from '@/components/promo/PromoVideo'
export default {
  components:{
    promo,
    promo_video
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