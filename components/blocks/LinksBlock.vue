<template>
  <div 
    v-editable="blok"
    class="uk-container">
    <h3 v-if="blok.header">{{ blok.header }}</h3>
    <ul
      class="uk-list">
      <component 
        v-for="child in blok.links" :key="child._uid" :blok="child" :is="child.component"/>
    </ul>
  </div>
</template>
<script>
import link_item from '@/components/LinkItem'

export default {
  components:{
    link_item
  },
  props: {
    blok: {
      type: Object,
      required: true
    }
  }
}
</script>
<style lang="scss">

</style>