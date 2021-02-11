<template>
   <div 
    v-editable="blok"
    class="uk-child-width-1-2"
    uk-grid>
     <component v-for="child in blok.images" :key="child._uid" :blok="child" :is="child.component"></component>
  </div>
</template>
<script>
import image_list_image from '@/components/editorial/ImageListImage'
export default {
  components:{
    image_list_image
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