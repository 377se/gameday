<template>
    <img :src="blok.image" />
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