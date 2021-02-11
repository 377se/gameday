<template>
  <div
    v-editable="blok"> 
    <component v-for="child in blok.body" :key="child._uid" :blok="child" :is="child.component"></component>
  </div>
</template>

<script>
import TextContent from '@/components/TextContent'
import promo from '@/components/promo/Promo'
import products_list from '@/components/promo/ProductsList'
import promo_button from '@/components/promo/PromoButton'

export default {
  components: {
    TextContent,
    promo,
    products_list,
    promo_button
  },
  props: {
    blok: {
      type: Object,
      required: true,
    }
  },
  data(){
    return {
      readmore: true
    }
  },
  methods:{
    setReadMore(){
      this.readmore = false
    }
  }
}
</script>