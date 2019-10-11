<template>
  <a
    @click="handleClick"
    @mousedown="mouseDown"
    @mouseover="mouseOver"
    @mouseleave="mouseLeave"
    v-bind:to="articleLink"
    class="uk-margin-small-bottom uk-link-reset"
  >
    <div class="uk-card uk-card-hover bottom-red-line">
      <div class="uk-card-media-top">
        <img :src="imageUrl" alt ref="mainImage">
      </div>
      <div class="uk-card-body uk-padding-small uk-padding-remove-bottom uk-text-small">
        <strong>{{ article.HeadCategory }}</strong>
        <br>
        <span>{{ article.ArticleName }}</span>
      </div>
      <div
        class="uk-card-footer uk-padding-small uk-padding-remove-top uk-text-small"
      >{{ article.PriceDisplay }}</div>
    </div>
  </a>
</template>

<script>
import { TweenLite, TimelineLite } from "gsap";

export default {
  components: {},
  props: {
    article: {}
  },
  computed: {
    imageUrl: function() {
      if (this.article)
        return (
          "https://res.cloudinary.com/supportersplace/image/fetch/w_300,f_auto/" +
          this.article.ImageIdThumb
        );
    },
    articleLink: function() {
      return { path: "article", query: { id: this.article.Id } };
    }
  },
  mounted() {},
  methods: {
    mouseDown: function(event) {
      const { currentTarget: el } = event;
      TweenLite.to(el, 0.08, { scale: 0.95 });
    },
    mouseOver: function(event) {
      const { currentTarget: el } = event;
      TweenLite.to(el, 0.08, { scale: 1.02 });
    },
    mouseLeave: function(event) {
      const { currentTarget: el } = event;
      TweenLite.to(el, 0.08, { scale: 1 });
    },
    handleClick: function(event) {
      const { currentTarget: el } = event;
      const t = new TimelineLite();
      t.to(el, 0.08, {
        scale: 0.95,
        zIndex: 0,
        clearProps: "all",
        onComplete: () => {
          const image = this.$refs.mainImage;

          this.$emit("showArticle", {
            articleId: this.article.Id,
            imageSrc: this.imageUrl,
            image
          });
        }
      });

      console.log("clicked", this.article);
    }
  }
};
</script>

<style lang="scss">
@import "~scss/vars";

.bottom-red-line {
  border-bottom: 3px solid $global-primary-background;
}
</style>
