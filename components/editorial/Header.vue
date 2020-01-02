<template>
   <div>
    <h3>{{ blok.editorial_text }}</h3>
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