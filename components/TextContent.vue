<template>
  <div 
    v-editable="blok"
    v-html="blok.text.html"
  />
</template>

<script>
export default {
  props: {
    blok: {
      type: Object,
      required: true,
    }
  }
}
</script>