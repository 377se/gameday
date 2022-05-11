<template>
  <div>
    <div class="uk-flex article-images uk-visible-toggle uk-slider uk-slider-container" tabindex="-1" uk-slider="finite: true">
      <ul 
        class="uk-thumbnav uk-thumbnav-vertical uk-visible@m"
        >
        <li 
          v-for="(image, index) in images"
          :key="index"
          :uk-slider-item="index"
          class="uk-visible"
          style="width:125px;padding-right:15px;">
          <a 
            href="#"
            @click.prevent
            >
            <img 
              :src="details_src+image.Name" style="width:125px" 
              alt=""
              loading="lazy"
            >
          </a>
        </li>
      </ul>
      <div 
        class="uk-position-relative uk-slider-container"
        style="margin-left:-15px;margin-right:-15px;">
        <span
          v-if="label" 
          class="label-article"
          :class="label.LabelClass">{{ label.LabelMessage }}</span>
        <ul class="uk-slider-items uk-grid-small">
          <li 
            v-for="(image, index) in images"
            :key="index"
            :class="images.length>1?'uk-width-5-6 uk-width-1-1@m':'uk-width-1-1 one-image-padding'"
            @click="showFullImage(index)">
              <img
                v-bind:src="details_src+image.Name"
                alt=""
                style="width:100%"
                loading="lazy"
              >
          </li>
        </ul>
        <a 
          class="uk-position-center-left uk-position-small uk-hidden-hover"
          href="#"
          uk-slidenav-previous uk-slider-item="previous"
          style="background-color: #fff;border-radius: 50%;"></a>
        <a 
          class="uk-position-center-right uk-position-small uk-hidden-hover"
          href="#"
          uk-slidenav-next
          uk-slider-item="next"
          style="background-color: #fff;border-radius: 50%;"></a>
      </div>
    </div>

    <div id="image-modal-full" class="uk-modal-full" uk-modal="container:false">
        <div 
          class="uk-modal-dialog"
          style="height:100vh">
            <button class="uk-modal-close-full uk-close-large" type="button" uk-close></button>
            <div uk-slider>
              <div class="uk-position-relative">
                <div class="uk-slider-container">
                  <ul class="uk-slider-items">
                    <li 
                      v-for="(image, index) in images"
                      :key="index"
                      class="uk-width-1-1 uk-text-center">
                        <img
                          v-bind:src="details_src+image.Name"
                          alt=""
                          style="max-height:90vh;max-width:100%;margin:0 auto;"
                          loading="lazy"
                        >
                    </li>
                  </ul>
                </div>
                <a 
                  class="uk-position-center-left uk-position-small uk-hidden-hover"
                  href="#"
                  uk-slidenav-previous uk-slider-item="previous"
                  style="left:15px;background-color: #fff;border-radius: 50%;"></a>
                <a 
                  class="uk-position-center-right uk-position-small uk-hidden-hover"
                  href="#"
                  uk-slidenav-next
                  uk-slider-item="next"
                  style="background-color: #fff;border-radius: 50%;"></a>

                
                <ul class="uk-slider-nav uk-dotnav uk-flex-center uk-margin"/>

              </div>
            </div>
        </div>
    </div>

  </div>
</template>

<script>
export default {
  components: {},
  props: {
    images: Array,
    label:{
      type: Object,
      default:null,
      required: true
    }
  },
  data() {
    return{
      chosenSize:-1,
      details_src:process.env.DETAILS_SRC
    }
  },
  computed: {
    urls: function() {
      return this.images.map(image => {
        if (typeof image === "string") return image;
        //return "https://static.zara.net/photos///2018/I/0/2/p/7545/327/306/2/c-209-0-2048-3072/w/560/7545327306_1_1_1.jpg?ts=1531224923474";
        return urlHost + image.Name;
      });
    }
  },
  mounted() {},
  methods: {
    showFullImage(ind){
      try{
        UIkit.modal('#image-modal-full').show();
      }catch(err){

      }
      
    }
  }
};
</script>

<style lang="scss">
.one-image-padding{
  padding-right:15px;
}
.uk-thumbnav > li.uk-visible{
  display:inline!important;
}
.uk-slider-items > li{
  cursor:pointer;
}
.relative {
  position: relative;
}

.invisible {
  visibility: hidden;
}

.preloaded {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
}
.article-images .label-article{
  font-size: 1.15em;
  line-height:1;
  padding: 1.7% 2.5%;
  position: absolute;
  height: 1em;
  min-width:20%;
  text-align:center;
  top:11px;
  left:-7px;
  z-index: 1;
}
.label-campaign, .label-member-package{
  background: yellow;
  color: #000;
}
.label-percentage-discount{
  background: $discounted-price-color;
  color:#fff;
}
.label-new-product{
  background: $global-label-new-background;
  color:#fff;
}
.label-preorder-product{
  background: rgb(79, 151, 79);
  color:#fff;
}
</style>
