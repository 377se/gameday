<template>
  <div v-html="content"></div>
</template>

<script>
export default {
  components: {},
  props: {
    content: ""
  },
  mounted() {}
};
</script>

<style lang="scss">
@import '~/assets/scss/vars.scss';
</style>
