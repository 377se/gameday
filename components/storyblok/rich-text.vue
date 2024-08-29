<template>
  <div v-html="richtext" />
</template>
<script>
export default {
  props: {
    blok: {
      type: Object,
      required: true,
    }
  },
  computed: {
    richtext() {
      return this.$storyapi.richTextResolver.render(this.blok.HTML)
    }
  }
}
</script>
<style lang="scss"></style>