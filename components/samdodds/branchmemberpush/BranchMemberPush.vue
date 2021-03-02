<template>
  <div
    v-editable="blok"
    class="uk-margin-bottom">
    <h1
      v-if="blok.BranchMemberPushHeader">{{ blok.BranchMemberPushHeader }}</h1>
    <a 
      style="position:relative;display:block;"
      :href="blok.BranchMemberPushURL.url">


        <img src="https://a.storyblok.com/f/65534/2000x800/68bd2207f8/promo_lfc_caps_trent_samdodds_2000x800.jpg">

      <!-- <picture>
        <source 
          media="(min-width: 1441px)" 
          :srcset="'https://res.cloudinary.com/supportersplace/image/fetch/w_2560,fl_lossy,f_auto,fl_progressive/http:'+blok.BranchMemberPushImage">
        <source 
          media="(min-width: 768px)" 
          :srcset="'https://res.cloudinary.com/supportersplace/image/fetch/w_1440,fl_lossy,f_auto,fl_progressive/http:'+blok.BranchMemberPushImage">
        <source 
          media="(min-width: 640px)" 
          :srcset="'https://res.cloudinary.com/supportersplace/image/fetch/y_0,x_0.25,w_1200,c_limit/w_768,c_scale,fl_lossy,f_auto,fl_progressive/http:'+blok.BranchMemberPushImage">
        <source 
          media="(min-width: 480px)" 
          :srcset="'https://res.cloudinary.com/supportersplace/image/fetch/h_1.0,ar_1:1,c_crop/w_640,c_scale,fl_lossy,f_auto,fl_progressive/http:'+blok.BranchMemberPushImage">
        <source 
          media="(min-width: 360px)" 
          :srcset="'https://res.cloudinary.com/supportersplace/image/fetch/h_1.0,ar_1:1,c_crop/w_480,c_scale,fl_lossy,f_auto,fl_progressive/http:'+blok.BranchMemberPushImage">
        <img 
          alt="Promotion Image" 
          :src="'https://res.cloudinary.com/supportersplace/image/fetch/w_2560,fl_lossy,f_auto,fl_progressive/http:'+blok.BranchMemberPushImage">
      </picture> -->
      <div
        style="position:absolute;bottom:20px;left:20px;">
        <h4 
          class="promo-pre-header uk-animation-fade">{{ blok.BranchMemberPushSubheader }}</h4>
        <h1 
          class="promo-header uk-animation-fade">{{ blok.BranchMemberPushHeader }}</h1>
        <nuxt-link 
          v-for="b in blok.BranchMemberPushButton"
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
  },
  mounted(){

  },
}
</script>
<style lang="scss">
.promo-pre-header{
  color:#fff;
  margin-bottom:0;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
  @media (max-width: 640px){
    font-size:1.1rem;
  }
}
.promo-header{
  margin-top:0;color:#fff;
  font-weight:bold;
  text-transform:uppercase;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
  @media (max-width: 640px){
    font-size:2rem;
  }
}
</style>