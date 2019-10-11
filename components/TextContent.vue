<template>
  <div 
    v-editable="blok" 
    class="uk-container uk-padding">
    <div v-html="blok.text.html"/>
  </div>
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