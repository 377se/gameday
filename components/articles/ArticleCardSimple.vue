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
      <div class="vertical-spreader">

        <div class="uk-card-body uk-padding-remove-bottom head-category">
          <span>{{ article.HeadCategory }}</span>
          <br>
          <span class="article-name">{{ article.Name }}</span>
        </div>
        <div
          class="uk-padding-remove-top uk-text-small price-container"
        >
          <template
            v-if="article.DiscountType==1">
            <div 
              class="your-price"
              >{{ article.DiscountedPriceDisplay }}
            </div> 
            <div 
              class="orig-price"
              :class="{'line-through':article.DiscountedPriceDisplay}">
              ({{ $getCMSEntry(global_labels,'article_details_original_price', 'Ord.') }} {{ article.PriceDisplay }})
            </div>
          </template>
          <template
            v-else-if="article.DiscountType==2">
            <div 
              v-if="memberprices"
              class="your-price">
              Medlem {{ article.DiscountedPriceDisplay }}
            </div>
            <div 
              class="orig-price"
              >({{ $getCMSEntry(global_labels,'article_details_original_price', 'Ord.') }} {{ article.PriceDisplay }})
            </div> 
          </template>
          <template
            v-else>
            <span 
              class="orig-price"
              >{{ article.PriceDisplay }}</span>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'

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
  },
    computed: {
    ...mapGetters({
      global_labels:'labels'})
  },
}
</script>
<style lang="scss">
.vertical-spreader {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.price-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 10px !important;
    height: 35px;
}
.head-category{
  font-family: $base-heading-font-family;
  height: $vertical-space-articlecard;
  padding: 10px !important;
  font-size: 0.8rem;
}
.article-name{
  font-family: $global-font-family;
  display: inline-block;
  vertical-align: top;
  font-size: 0.9rem;
  line-height: 1.2;
}
.your-price{
  color: $discounted-price-color;
  font-family: $base-heading-font-family;
  margin-top: 0.5rem;
  font-size: 0.9rem;
  line-height: 0.9;
}
.orig-price{
  color:$global-color;
  font-family: $base-heading-font-family;
  margin-top: 0.3rem;
  line-height: 1;
  font-size: 0.9rem;
}
.line-through{
  text-decoration:line-through;
}
.orig-price.line-through{
  font-family: $global-font-family;
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

