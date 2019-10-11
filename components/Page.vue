<template>
  <div 
    v-editable="blok" 
    class="uk-container uk-padding">
    <component v-for="child in blok.body" :key="child._uid" :blok="child" :is="child.component"></component>
  </div>
</template>

<script>
import TextContent from '@/components/TextContent'

export default {
  components: {
    TextContent
  },
  props: {
    blok: {
      type: Object,
      required: true,
    }
  }
}
</script>