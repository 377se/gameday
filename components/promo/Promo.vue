<template>
  <div
    class="uk-margin-bottom">
    <h1
      v-if="blok.category_header">{{ blok.category_header }}</h1>
    <a 
      style="position:relative;display:block;"
      :href="blok.promo_url.url">
      <picture
        v-if="!promoList">
        <source 
          media="(max-width: 480px)" 
          :srcset="'https://res.cloudinary.com/supportersplace/image/fetch/h_1.0,ar_1:1,c_crop/w_480,c_scale,fl_lossy,f_auto,fl_progressive/http:'+blok.promo_image">
        <source 
          media="(max-width: 768px)" 
          :srcset="'https://res.cloudinary.com/supportersplace/image/fetch/y_0,x_0.25,w_1200,c_crop/w_768,c_scale,fl_lossy,f_auto,fl_progressive/http:'+blok.promo_image">
        <source 
          media="(max-width: 1440px)" 
          :srcset="'https://res.cloudinary.com/supportersplace/image/fetch/w_1440,fl_lossy,f_auto,fl_progressive/http:'+blok.promo_image">
        <source 
          :srcset="'https://res.cloudinary.com/supportersplace/image/fetch/w_2560,fl_lossy,f_auto,fl_progressive/http:'+blok.promo_image">
        <img 
          alt="Promotion Image" 
          :src="'https://res.cloudinary.com/supportersplace/image/fetch/w_2560,fl_lossy,f_auto,fl_progressive/http:'+blok.promo_image">
      </picture>
      <picture
        v-else>
        <source 
          media="(max-width: 768px)" 
          :srcset="'https://res.cloudinary.com/supportersplace/image/fetch/h_1.0,c_fill,ar_1:1,c_crop/w_400,c_scale,fl_lossy,f_auto,fl_progressive/http:'+blok.promo_image">
        <source 
          media="(max-width: 1440px)" 
          :srcset="'https://res.cloudinary.com/supportersplace/image/fetch/h_1.0,c_fill,ar_1:1,c_crop/w_600,c_scale,fl_lossy,f_auto,fl_progressive/http:'+blok.promo_image">
        <source 
          :srcset="'https://res.cloudinary.com/supportersplace/image/fetch/h_1.0,c_fill,ar_1:1,c_crop/w_800,c_scale,fl_lossy,f_auto,fl_progressive/http:'+blok.promo_image">
        <img 
          alt="Promotion Image" 
          :src="'https://res.cloudinary.com/supportersplace/image/fetch/h_1.0,c_fill,ar_1:1,c_crop/w_800,c_scale,fl_lossy,f_auto,fl_progressive/http:'+blok.promo_image">
      </picture>
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
    },
    promoList:{
      type: Boolean,
      required: false,
      default: false
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