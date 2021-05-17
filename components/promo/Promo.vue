<template>
  <div
    v-editable="blok"
    class="uk-margin-bottom uk-overflow-hidden">
    <h1
      v-if="blok.category_header">{{ blok.category_header }}</h1>
    <a 
      style="position:relative;display:block;"
      :href="blok.promo_url.url">
      <picture
        v-if="!promoList">
        <source 
          media="(min-width: 1441px)" 
          :srcset="'https://res.cloudinary.com/supportersplace/image/fetch/w_2560,fl_lossy,f_auto,fl_progressive/http:'+blok.promo_image">
        <source 
          media="(min-width: 768px)" 
          :srcset="'https://res.cloudinary.com/supportersplace/image/fetch/w_1440,fl_lossy,f_auto,fl_progressive/http:'+blok.promo_image">
        <source 
          media="(min-width: 640px)" 
          :srcset="'https://res.cloudinary.com/supportersplace/image/fetch/y_0,x_0.25,w_1200,c_limit/w_768,c_scale,fl_lossy,f_auto,fl_progressive/http:'+blok.promo_image">
        <source 
          media="(min-width: 480px)" 
          :srcset="'https://res.cloudinary.com/supportersplace/image/fetch/h_1.0,ar_1:1,c_crop/w_640,c_scale,fl_lossy,f_auto,fl_progressive/http:'+blok.promo_image">
        <source 
          media="(min-width: 360px)" 
          :srcset="'https://res.cloudinary.com/supportersplace/image/fetch/h_1.0,ar_1:1,c_crop/w_480,c_scale,fl_lossy,f_auto,fl_progressive/http:'+blok.promo_image">
        <img 
          alt="Promotion Image" 
          :src="'https://res.cloudinary.com/supportersplace/image/fetch/w_2560,fl_lossy,f_auto,fl_progressive/http:'+blok.promo_image">
      </picture>
      <picture
        v-else>
        <source 
          media="(min-width: 1441px)"
          :src="'https://res.cloudinary.com/supportersplace/image/fetch/h_1.0,c_fill,ar_1:1,c_crop/w_800,c_scale,fl_lossy,f_auto,fl_progressive/http:'+blok.promo_image">
        <source 
          media="(min-width: 768px)" 
          :srcset="'https://res.cloudinary.com/supportersplace/image/fetch/h_1.0,c_fill,ar_1:1,c_crop/w_600,c_scale,fl_lossy,f_auto,fl_progressive/http:'+blok.promo_image">
         <source 
          media="(min-width: 361px)" 
          :srcset="'https://res.cloudinary.com/supportersplace/image/fetch/h_1.0,c_fill,ar_1:1,c_crop/w_400,c_scale,fl_lossy,f_auto,fl_progressive/http:'+blok.promo_image">
        <source 
          media="(min-width: 30px)" 
          :srcset="'https://res.cloudinary.com/supportersplace/image/fetch/h_1.0,c_fill,ar_1:1,c_crop/w_360,c_scale,fl_lossy,f_auto,fl_progressive/http:'+blok.promo_image">
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
      <transition v-if="blok.swipe" name="swipe">
          <div v-if="swiperActive" class="white-back"></div>
      </transition>
      <transition v-if="blok.swipe" name="swipe">
          <div v-if="swiperActive" class="swiper"></div>
      </transition>
      <transition v-if="blok.swipe" name="swipe">
          <div v-if="swiperActive" class="swipe-logo-container">
            <img style="width:30%" src="/sites/samdodds/samdodds-logo.png" alt="Samdodds Logo">
          </div>
      </transition>
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
  data(){
    return {
      swiperActive: false,
    }
  },
  mounted(){
    this.setSwiperActive()
  },
  methods:{
    setSwiperActive(){
      setTimeout(() => {
        this.swiperActive = true
      }, 200);
      setTimeout(() => {
        this.swiperActive = false
      }, 3050);
    }
  },
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
.white-back {
    position:absolute;
    top:0px;
    left:100%;
    width:400%;
    height:100%;
    background-color:#ffffff;
}
.swiper {
  position:absolute;
  top:0px;
  left:0px;
  width:150%;
  height:100%;
  background-color:#A91C30;
  opacity:1;
  clip-path: polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%);
}
.swipe-logo-container {
  position:absolute;
  top:0px;
  left:0px;
  width:150%;
  height:100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.swipe-enter {
  transform: translateX(-100%);
}
.swipe-enter-active {
  transition: transform 3s;
}
.swipe-enter-to {
  transform: translateX(100%);
}
.swipe-leave {
  transform: translateX(100%);
}

</style>