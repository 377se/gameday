<template>
  <div 
    class="uk-alert-danger" 
    uk-alert>
    <a class="uk-alert-close" uk-close></a>
    <div
      v-for="er in errorlist"
      :key="er.Name"
    >{{ er.Value }}</div>
  </div>
</template>

<script>
export default {
  props:{
    errorlist:{
      type: Array,
      default: () => [],
      required: true
    }
  }
}
</script>

<style>

</style>