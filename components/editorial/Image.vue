<template>
   <div>
     <img :src="blok.editorial_image" />
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