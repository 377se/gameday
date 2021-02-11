<template>
   <div
    v-editable="blok" 
    class="uk-margin">
     <img 
      :src="blok.editorial_image"
      alt="" />
  </div>
</template>
<script>
export default {
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