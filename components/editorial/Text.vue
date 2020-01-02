<template>
  <div
    v-html="blok.editorial_text.html"/>
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