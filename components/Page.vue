<template>
  <div 
    v-editable="blok"
    class="uk-container uk-container-large uk-padding">
    <h1
      v-if="blok.title"
      class="uk-margin-remove-top">{{ blok.title }}</h1>
    <div
      v-if="blok.description"
      :class="{'read-more':readmore}" 
      @click="setReadMore()"
      v-html="blok.description.html"/>
    <component v-for="child in blok.body" :key="child._uid" :blok="child" :is="child.component"></component>
  </div>
</template>

<script>
import TextContent from '@/components/TextContent'
import promo from '@/components/promo/Promo'
import products_list from '@/components/promo/ProductsList'
import promo_button from '@/components/promo/PromoButton'

import editorial_header from '@/components/editorial/Header'
import editorial_text from '@/components/editorial/Text'
import editorial_image from '@/components/editorial/Image'
import editorial_youtube from '@/components/editorial/Youtube'
import editorial_quote from '@/components/editorial/Quote'

export default {
  components: {
    TextContent,
    promo,
    products_list,
    promo_button,
    editorial_header,
    editorial_text,
    editorial_image,
    editorial_youtube,
    editorial_quote
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