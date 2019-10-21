<template>
  <section>
    <div class="uk-container uk-padding-small">
      <h1>{{ article.SeoTitle }}</h1>
      <div v-html="article.SeoContentDescription"/>
    </div>
    <FilterItems
      :product-types="producttypes"
      :colors="colors"
      :sizes="sizes"/>
    <div class="uk-container uk-padding-small">
      <div
        class="uk-grid-small uk-child-width-1-2 uk-child-width-1-4@m"
        uk-height-match="target: > a > .uk-card"
        uk-grid>
        <ArticleCardSimple
          v-for="article in articles"
          :key="article.Id"
          :article="article"
          :url="`/lag/nfl/${article.HeadCategorySeoName}/${article.SeoName}`"
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
      producttypes: [], //To filter on
      colors: [],
      sizes: []
    }
  },
  mounted(){
  },
  async asyncData (context) {
    try {
      const [a, p, c, s] = await Promise.all([
        await context.app.$axios.$get(
          'https://beta.supporterprylar.se/webapi/Article/GetArticleList?pageNum=1&seoName=nfl'
        ),
        await context.app.$axios.$get(
          'https://beta.supporterprylar.se/webapi/Filter/GetProductTypeList?seoName=nfl&teamName=null'
        ),
        await context.app.$axios.$get(
          'https://beta.supporterprylar.se/webapi/Filter/GetColourList?categoryName=nfl&teamName=null&garmentName=null'
        ),
        await context.app.$axios.$get(
          'https://beta.supporterprylar.se/webapi/Filter/GetSizeList?categoryName=nfl&teamName=null&garmentName=null'
        )
      ]);
      return {
        articles: a[0].ArticleList,
        producttypes: p,
        colors: c,
        sizes: s,
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
</style>
