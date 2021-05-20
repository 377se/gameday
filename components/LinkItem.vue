<template>
  <li
    v-editable="blok">
    <a
      :href="'/'+blok.url.cached_url"
      @click.stop.prevent="$router.push({path:'/'+blok.url.cached_url})"
      >{{ blok.label }}</a>
  </li>
</template>
<script>
export default {
  props: {
    blok: {
      type: Object,
      required: true
    }
  }
}
</script>