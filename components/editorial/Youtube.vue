<template>
  <div
    v-editable="blok"
    class="youtube-container uk-margin"
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
.youtube-container {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 56.25%;
}
.youtube-container > iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
</style>