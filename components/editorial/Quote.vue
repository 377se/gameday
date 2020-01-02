<template>
  <div class="quote uk-margin">
    &raquo; {{ blok.editorial_quote }} &raquo;
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
.quote{
  font-size:1.5rem;
}
</style>