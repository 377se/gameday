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
            <hr>
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
  padding: 10px;
}
.head-category{
  align-self: start;
  color: #444;
  font-family: $base-heading-font-family;
  font-size: 1.0rem;
  line-height: 1;
  max-height: 2rem;
  & > .article-name{
    color: #000;
    font-family: $global-font-family;
    display: inline-block;
    vertical-align: top;
    font-size: 0.9rem;
    line-height: 1.2;
    @media (max-width: 420px) {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 130px;
    }
  }
  & hr {
    margin: 3px 0 0 0;
  }
}
.price-container {
  align-self: end;
  height: 65px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.your-price{
  color: $discounted-price-color;
  font-family: $base-heading-font-family;
  margin-top: 0.3rem;
  font-size: 1.0rem;
  line-height: 1.0;
  font-weight:bold;
}
.orig-price{
  color:$global-color;
  font-family: $base-heading-font-family;
  margin-top: 0.2rem;
  line-height: 1.0;
  font-size: 1.0rem;
  font-weight:bold;
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

