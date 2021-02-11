<template>
  <div>
    <div class="uk-card uk-card-hover bottom-line card-border">
      <nuxt-link 
        :to="getUrl()"
        class="uk-link-reset">
        <div class="article-image uk-card-media-top">
          <img 
            :src="list_src +article.ImageIdThumb" 
            :alt="article.Name" 
            ref="mainImage">
          <span
            v-if="article.Label"
            class="label-article"
            :class="article.Label.LabelClass">{{ article.Label.LabelMessage }}</span>
        </div>
        <div class="vertical-spreader">
          <div class="uk-padding-remove-bottom head-category">
            <span>{{ article.HeadCategory }}</span>
            <br>
            <span class="article-name">{{ article.Name }}</span>

          </div>
          <div class="uk-padding-remove-top uk-text-small price-container">
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
                {{ $getCMSEntry(global_labels,'article_details_member', 'Medlem') }} {{ article.DiscountedPriceDisplay }}
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
      </nuxt-link>
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
  display: grid;
  padding: 8px;
}
.head-category{
  @include head-category; /* styling inside assets/scss/mixins */
}
.price-container {
  @include price-container; /* styling inside assets/scss/mixins */
}
.your-price{
  @include your-price; /* styling inside assets/scss/mixins */
}
.orig-price{
  @include orig-price; /* styling inside assets/scss/mixins */
}
.line-through{
  text-decoration:line-through;
}
.orig-price.line-through{
  font-family: $global-font-family;
  font-weight:normal;
}
.card-border {
  border: 1px solid #bbb;
}
.article-image{
  position:relative;
  padding: 3px;
}
.label-article{
  font-family: $base-heading-font-family;
  font-weight: bolder;
  font-size:0.75rem;
  line-height:1;
  padding: 2.5% 2.5%;
  position:absolute;
  min-width:23%;
  text-align:center;
  position:absolute;
  bottom:11px;
  left:-7px;
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
.label-soldout-product{
  background: rgb(184, 38, 38);
  color:#fff;
}
</style>

