<template>
  <div 
    v-editable="blok">
    <h1
      v-if="blok.title">{{ blok.title }}</h1>
    <div
      v-if="blok.description"
      :class="{'read-more':readmore}" 
      @click="setReadMore()"
      v-html="blok.description"/>
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