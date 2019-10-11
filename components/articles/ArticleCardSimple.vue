<template>
  <div>
    <div class="uk-card uk-card-hover bottom-line">
      <div class="uk-card-media-top">
        <nuxt-link :to="getUrl()">
          <img 
            :src="list_src +article.ImageIdThumb" alt ref="mainImage">
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
          <span class="your-price">{{ article.DiscountedPriceDisplay }}</span> 
          <span 
            class="orig-price"
            :class="{'line-through':article.DiscountedPriceDisplay}">{{ article.PriceDisplay }}</span>
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
      list_src:process.env.LIST_SRC
    }
  },
  methods:{
    getUrl(){
      if(this.url!=undefined){
        return this.url
      }
      return '/article/'+this.article.Id+'/'+this.article.UrlSafeName
    }
  }
}
</script>
<style lang="scss">
@import '~/assets/scss/vars.scss';
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
</style>

