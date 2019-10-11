<template>
  <div>
    <span class="uk-heading-xsmall">{{teamtitle}}</span>
    <h2 class="uk-heading-xsmall uk-margin-remove-top">{{title}}</h2>
    <span class="uk-heading-xsmall">{{subtitle}}</span>
  </div>
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
@import '~/assets/scss/vars.scss';

h2 {
  width: 100%;
  margin-bottom: 0;
}

.uppercase {
  text-transform: uppercase;
}
</style>
