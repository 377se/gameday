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
  async asyncData({ app, route }) {
    try {
      const url = `/webapi/article/GetArticleDetailsById?teamName=null&articleId=${route.params.id}`;
      const article = await app.$axios.$get(url);

      return { article };
    } catch (err) {
      console.log(err);
    }
  }
};
</script>

<style lang="scss">
</style>
