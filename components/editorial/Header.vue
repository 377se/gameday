<template>
  <h3
    v-editable="blok"
    class="uk-margin-auto uk-width-1-1 uk-width-3-4@m">{{ blok.editorial_text }}</h3>
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