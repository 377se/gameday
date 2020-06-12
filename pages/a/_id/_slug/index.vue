<template>
  <div class="uk-padding-small uk-padding-remove-horizontal uk-padding-remove-bottom">
    <ArticleDetails 
      v-bind:article="article"/>
  </div>
</template>

<script>
import ArticleDetails from "@/components/articles/ArticleDetails";

export default {
  head () {
    return {
      title: this.article.SEO_Name,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.article.SEO_Description
        },
        {
          hid: 'og:title',
          name:  'og:title',
          content:  this.article.SEO_Name,
        },
        {
          hid: 'og:description',
          name:  'og:description',
          content: `${this.article.SEO_Description}`.replace(/<\/?[^>]+(>|$)/g, ""),
        }
      ]
    }
  },
  components: {
    ArticleDetails
  },
  data() {
    return {
      article: {}
    };
  },
  async fetch() {
    try {
      const url = `/webapi/article/GetArticleDetailsById?teamName=null&articleId=${route.params.id}`;
      const article = await this.$axios.$get(url);

      this.article=article
      var _this = this
      try{
        this.$gtm.push({event:'ViewContent',
          data: {
            content_name: _this.article.Name,
            content_category: _this.article.HeadCategory,
            content_ids: [_this.article.ArticleNumber],
            content_type: 'product',
            value: _this.article.DiscountedPrice.toFixed(2),
            currency: process.env.CURRENCY_CODE
          }
        })
      }catch(err){
        console.log(err)
      }
    } catch (err) {
      console.log(err);
    }
  }
};
</script>

<style lang="scss">
</style>
