<template>
  <div 
    v-editable="blok"
    class="uk-flex uk-grid-small uk-child-width-1-2">
    <component 
      v-for="child in blok.body" :key="child._uid" :blok="child" :is="child.component"/>
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