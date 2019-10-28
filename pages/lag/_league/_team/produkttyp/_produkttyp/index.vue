<template>
  <section>
    <div class="uk-container uk-padding-small">
      <h1>{{ article.SeoTitle }}</h1>
      <div v-html="article.SeoContentDescription"/>
    </div>
    <FilterItems
      :product-types="producttypes"/>
    <div class="uk-container uk-padding-small">
      <div
        class="uk-grid-small uk-child-width-1-2 uk-child-width-1-4@m"
        uk-height-match="target: > a > .uk-card"
        uk-grid>
        <ArticleCardSimple
          v-for="article in articles"
          :key="article.Id"
          :article="article"
          :url="`/lag/${$route.params.league}/${$route.params.team}/${article.SeoName}`"
        />
      </div>
    </div>
  </section>
</template>
<script>
import ArticleCardSimple from "@/components/articles/ArticleCardSimple";
import FilterItems from "@/components/filter/Filter";
export default {
  head () {
    return {
      title: this.article.MetaTitle,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.article.MetaDescription
        }
      ]
    }
  },
  components:{
    ArticleCardSimple,
    FilterItems
  },
  data () {
    return {
      story: { content: {} },
      article: {},
      articles: [],
      producttypes: [] //To filter on
    }
  },
  mounted(){

  },
  async asyncData (context) {
    try {
      const [a,p] = await Promise.all([
        await context.app.$axios.$get(
          'https://beta.supporterprylar.se/webapi/Article/GetArticleList?pageNum=1&seoName=' +context.route.params.team
        ),
        await context.app.$axios.$get(
          'https://beta.supporterprylar.se/webapi/Filter/GetProductTypeList?seoName='+context.route.params.league+'&teamName='+context.route.params.team
        )
      ]);
      return {
        articles: a[0].ArticleList,
        producttypes: p,
        article: a[0]
        
      };
    } catch (err) {
      console.log(err);
      console.log(err.request);
    }

  }
}
</script>
<style lang="scss">
@import '~/assets/scss/vars.scss';

.lfc-green{
  color: $global-secondary-background;
}
</style>
