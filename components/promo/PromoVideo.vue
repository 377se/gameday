<template>
  <div
    class="uk-margin-bottom">
    <h1
      v-if="blok.category_header">{{ blok.category_header }}</h1>
    <a 
      style="position:relative;display:block;"
      :href="blok.promo_url.url">
      <video :src="blok.promo_image" autoplay loop muted playsinline uk-cover/>
      <div
        style="position:absolute;bottom:20px;left:20px;">
        <h4 
          class="promo-pre-header uk-animation-fade">{{ blok.promo_subheader }}</h4>
        <h1 
          class="promo-header uk-animation-fade">{{ blok.promo_header }}</h1>
        <nuxt-link 
          v-for="b in blok.promo_buttons"
          :key="b._uid"
          style="background:#fff;"
          class="uk-button uk-button-default uk-animation-fade"
          :to="b.button_url.url">{{ b.button_text }}</nuxt-link>
      </div>
    </a>
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
.promo-pre-header{
  color:#fff;
  margin-bottom:0;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
  /*-webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #000;*/
  @media (max-width: 640px){
    font-size:1.1rem;
  }
}
.promo-header{
  margin-top:0;color:#fff;
  font-weight:bold;
  text-transform:uppercase;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
  /*-webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #000;*/
  @media (max-width: 640px){
    font-size:2rem;
  }
}
</style>