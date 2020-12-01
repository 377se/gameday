<template>
  <div
    class="uk-margin-bottom uk-text-center promo-textual"
    :style="{'background-color':blok.background_color.color}">
      <div v-html="blok.content.html" />
      <div class="uk-text-center">
        <nuxt-link 
          v-for="b in blok.promo_buttons"
          :key="b._uid"
          style="background:#fff;"
          class="uk-button uk-button-default uk-animation-fade"
          :to="b.button_url.url">{{ b.button_text }}</nuxt-link>
      </div>
  </div>
</template>
<script>
export default {
  props: {
    blok: {
      type: Object,
      required: true,
    }
  },
  mounted(){

  }
}
</script>
<style lang="scss">
.promo-textual{
  max-width:600px;
  margin-left:auto;
  margin-right:auto;
}

</style>