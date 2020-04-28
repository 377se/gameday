<template>
  <li>
    <nuxt-link
      :to="'/'+blok.url.cached_url">{{ blok.label }}</nuxt-link>
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