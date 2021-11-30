<template>
  <div class="uk-position-relative article-images uk-visible-toggle" tabindex="-1" uk-slideshow="ratio:1:1;animation: push">
    <span
      v-if="label" 
      class="label-article"
      :class="label.LabelClass">{{ label.LabelMessage }}</span>
    <div class="uk-position-relative">
      <ul class="uk-slideshow-items">
        <li 
          v-for="(image, index) in images"
          :key="index">
            <img
              v-bind:src="details_src+image.Name"
              alt=""
              loading="lazy"
            >
        </li>
      </ul>
      <div class="uk-position-bottom-center uk-position-small">
        <ul class="uk-thumbnav">
            <li 
              v-for="(image, index) in images"
              :key="index"
              :uk-slideshow-item="index">
              <a 
                href="#"
                style="box-shadow: 4px 4px 41px 0px rgba(0,0,0,0.36);">
                <img 
                  :src="details_src+image.Name" style="width:60px" 
                  alt=""
                  loading="lazy">
              </a></li>
        </ul>
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
    
  }
};
</script>

<style lang="scss">

img {
  width: 100%;
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
