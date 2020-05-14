<template>
  <div class="uk-position-relative article-images uk-visible-toggle" tabindex="-1" uk-slideshow="ratio:1:1;animation: push">
    <span
      v-if="label" 
      class="label-article"
      :class="label.LabelClass">{{ label.LabelMessage }}</span>
    <ul class="uk-slideshow-items">
      <li 
        v-for="(image, index) in images"
        :key="index">
          <img
            v-bind:src="details_src+image.Name"
            uk-img
          >
      </li>
    </ul>
    <ul class="uk-slideshow-nav uk-dotnav uk-flex-center uk-margin"></ul>
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
  font-size:1.2rem;
  line-height:1;
  padding: 4px 0;
  position:absolute;
  min-width:60px;
  text-align:center;
  position:absolute;
  top:20px;
  left:0;
  z-index:1;
}
.label-percentage-discount{
  background: #ec6a18;
  color:#fff;
}
.label-new-product{
  background: $global-primary-background;
  color:#fff;
}
</style>
