<template>
  <ArticleDetails v-bind:article="article"></ArticleDetails>
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
      const url = `/webapi/article/GetArticleDetails?teamName=${
        route.params.team
      }&articleName=${route.params.article}`;
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
