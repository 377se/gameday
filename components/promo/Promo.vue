<template>
  <div>
    <a 
      style="position:relative;display:block;"
      :href="blok.promo_url.url">
      <picture>
        <source 
          media="(max-width: 360px)" 
          :srcset="'https://res.cloudinary.com/supportersplace/image/fetch/x_800,y_0,w_1600,h_1200,c_crop/w_360,c_scale,fl_lossy,f_auto,fl_progressive/http:'+blok.promo_image">
        <source 
          media="(max-width: 768px)" 
          :srcset="'https://res.cloudinary.com/supportersplace/image/fetch/x_800,y_0,w_1600,h_1200,c_crop/w_768,c_scale,fl_lossy,f_auto,fl_progressive/http:'+blok.promo_image">
        <source 
          media="(max-width: 1440px)" 
          :srcset="'https://res.cloudinary.com/supportersplace/image/fetch/w_1440,fl_lossy,f_auto,fl_progressive/http:'+blok.promo_image">
        <source 
          :srcset="'https://res.cloudinary.com/supportersplace/image/fetch/w_2560,fl_lossy,f_auto,fl_progressive/http:'+blok.promo_image">
        <img 
          alt="Promotion Image" 
          src=""
          :srcset="'https://res.cloudinary.com/supportersplace/image/fetch/w_2560,fl_lossy,f_auto,fl_progressive/http:'+blok.promo_image">
      </picture>
      <div
        style="position:absolute;bottom:40px;left:20px;">
        <h4 
          style="color:#fff;margin-bottom:0;text-shadow: 2px 2px rgba(0,0,0,0.5);"
          class="uk-animation-fade uk-animation-slide-right">Welcome to the Shark tank!</h4>
        <h1 
          style="margin-top:0;color:#fff;font-weight:bold;text-transform:uppercase;text-shadow: 2px 2px rgba(0,0,0,0.5);"
          class="uk-animation-fade uk-animation-slide-right">San José Sharks</h1>
        <nuxt-link 
          style="background:#fff;"
          class="uk-button uk-button-default"
          :to="blok.promo_url.url">Köp Sharks!</nuxt-link>
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

</style>