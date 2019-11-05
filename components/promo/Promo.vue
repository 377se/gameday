<template>
  <a 
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
  </a>
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