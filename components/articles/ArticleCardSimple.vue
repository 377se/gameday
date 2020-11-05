<template>
  <div>
    <div class="uk-card uk-card-hover bottom-line">
      <div class="article-image uk-card-media-top">
        <nuxt-link :to="getUrl()">
          <img 
            :src="list_src +article.ImageIdThumb" alt ref="mainImage">
          <span
            v-if="article.Label"
            class="label-article"
            :class="article.Label.LabelClass">{{ article.Label.LabelMessage }}</span>
        </nuxt-link>
      </div>
      <div class="uk-card-body uk-padding-small uk-padding-remove-bottom uk-text-small">
        <strong>{{ article.HeadCategory }}</strong>
        <br>
        <span>{{ article.Name }}</span>
      </div>
      <div
        class="uk-card-footer uk-padding-small uk-padding-remove-top uk-text-small"
      >
        <template
          v-if="article.DiscountType==1">
          <span 
            class="your-price"
            >{{ article.DiscountedPriceDisplay }}</span> 
          <span 
            class="orig-price"
            :class="{'line-through':article.DiscountedPriceDisplay}">
            (ord. {{ article.PriceDisplay }})
          </span>
        </template>
        <template
          v-else-if="article.DiscountType==2">
          <span 
            class="your-price"
            >{{ article.PriceDisplay }}</span> 
          <span 
            v-if="memberprices"
            class="orig-price">
            (medlem {{ article.DiscountedPriceDisplay }})
          </span>
        </template>
        <template
          v-else>
          <span 
            class="your-price"
            >{{ article.PriceDisplay }}</span>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapMutations } from 'vuex'

export default {
  components: {},
  props: {
    article: {},
    url: ''
  },
  data() {
    return{
      list_src:process.env.LIST_SRC,
      memberprices: process.env.MEMBER_PRICES
    }
  },
  methods:{
    getUrl(){
      if(this.url!=undefined){
        return this.$nuxt.context.app.localePath(this.url)
      }
      return this.$nuxt.context.app.localePath('/article/'+this.article.Id+'/'+this.article.UrlSafeName)
    }
  }
}
</script>
<style lang="scss">
.your-price{
  color:$global-primary-background;
  font-weight:bold;
}
.orig-price{
  font-weight:bold;
}
.line-through{
  text-decoration:line-through;
}
.orig-price.line-through{
  font-weight:normal;
}
.bottom-line {
  border-bottom: 3px solid $global-primary-background;
}

.article-image{
  position:relative;
}
.label-article{
  font-size:0.8rem;
  line-height:1;
  padding: 8px 8px;
  position:absolute;
  min-width:60px;
  text-align:center;
  position:absolute;
  top:20px;
  left:0;
}
.label-campaign, .label-member-package{
  background: yellow;
  color: #000;
}
.label-percentage-discount{
  background: #ec6a18;
  color:#fff;
}
.label-new-product{
  background: $global-slider-background;
  color:#fff;
}
.label-preorder-product{
  background: rgb(79, 151, 79);
  color:#fff;
}
</style>

