<template>
  <div
    v-html="blok.editorial_youtube" />
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
    console.log(this.blok)
  }
}
</script>
<style lang="scss">

</style>