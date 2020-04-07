<template>
  <section>
    <div class="uk-container uk-container-large uk-padding-small">
      <ul class="uk-breadcrumb">
        <li>
          <nuxt-link to="/">
            <span style="vertical-align: bottom;
              margin-bottom: 2px;" uk-icon="icon:home;ratio:0.7"/></nuxt-link></li>
        <li><nuxt-link :to="'/'+shop.toLowerCase()">{{ shop }}</nuxt-link></li>
        <li><nuxt-link :to="'/lag/'+$route.params.league+'/'+$route.params.team">{{ article.HeadCategory }}</nuxt-link></li>
        <li><span>{{ article.Name }}</span></li>
      </ul>
    </div>
    <ArticleDetails v-bind:article="article"></ArticleDetails>
  </section>
</template>

<script>
import ArticleDetails from "@/components/articles/ArticleDetails";

export default {
  head () {
    return {
      title: this.article.MetaTitle,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.article.MetaDescription
        },
        {
          hid: 'og:title',
          name:  'og:title',
          content:  this.article.MetaTitle,
        },
        {
          hid: 'og:description',
          name:  'og:description',
          content: `${this.article.MetaTitle}`.replace(/<\/?[^>]+(>|$)/g, ""),
        }
      ]
    }
  },
  components: {
    ArticleDetails
  },
  data() {
    return {
      article: {},
      shop:''
    };
  },
  mounted(){
    var _this = this
    try {
      fbq('track', 'ViewContent', {
          content_name: _this.article.Name,
          content_category: _this.shop + '/lag/'+_this.$route.params.league+'/'+_this.$route.params.team+'/'+article.HeadCategory,
          content_ids: [_this.article.ArticleNumber],
          content_type: 'product',
          value: _this.article.DiscountedPrice.toFixed(2),
          currency: 'SEK'
      });
    } catch (err) { }
  },
  async asyncData({ route, app }) {
    let shop = route.params.league=='premier-league'?route.params.league:route.params.league.toUpperCase()+'-shop'
    try {
      const url = `/webapi/article/GetArticleDetails?teamName=${
        route.params.team
      }&articleName=${route.params.article}`;
      const article = await app.$axios.$get(url);

      return { 
        article: article,
        shop: shop
      };
    } catch (err) {
      console.log(err);
    }
  }
};
</script>

<style lang="scss" scoped>
  
</style>
