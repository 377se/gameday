<template>
    <img 
      class="image-list-image"
      :src="blok.image"
      alt="" />
</template>
<script>
export default {
  props: {
    blok: {
      type: Object,
      required: true,
    }
  },
}
</script>
<style lang="scss">
.image-list-image{
  height:20%;
}
</style>