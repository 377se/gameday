<template>
  <h1>
    <span class="uk-heading-xsmall" style="font-family:'Source Sans 3';font-size:16px;">{{teamtitle}}</span>
    <div class="uk-h2 uk-margin-remove">{{title}}</div>
    <span class="uk-heading-xsmall" style="font-family:'Source Sans 3';font-size:16px;">{{subtitle}}</span>
  </h1>
</template>

<script>
export default {
  components: {},
  props: {
    title: String,
    subtitle: String,
    teamtitle: String
  },
  mounted() {}
};
</script>

<style lang="scss">

h2 {
  width: 100%;
  margin-bottom: 0;
}

.uppercase {
  text-transform: uppercase;
}
</style>
