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
        uk-height-match="target: > * > .uk-card"
        uk-grid>
        <ArticleCardSimple
          v-for="article in articles"
          :key="article.Id"
          :article="article"
          :url="`/lag/${$route.params.league}/${$route.params.team}/${article.SeoName}`"
        />
      </div>
      <ul 
        v-if="articles.PageNum>0"
        class="uk-pagination uk-flex-center" uk-margin>
        <li><a href="#"><span uk-pagination-previous></span></a></li>
        <li><nuxt-link :to="{query:{page:1}}">1</nuxt-link></li>
        <li class="uk-disabled"><span>...</span></li>
        <li><a href="#">5</a></li>
        <li><a href="#">6</a></li>
        <li class="uk-active"><span>7</span></li>
        <li><a href="#">8</a></li>
        <li><a href="#"><span uk-pagination-next></span></a></li>
      </ul>
    </div>
  </section>
</template>
<script>
import ArticleCardSimple from "@/components/articles/ArticleCardSimple";
import FilterItems from "@/components/filter/Filter";
export default {
  watchQuery: ['page'],
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
    let pageNum = context.route.query.page?context.route.query.page:1
    try {
      const [a, p, c, s] = await Promise.all([
        await context.app.$axios.$get(
          'https://api.gameday.shopping/webapi/Article/GetArticleList?pageNum='+ pageNum +'&seoName=' +context.route.params.team
        ),
        await context.app.$axios.$get(
          'https://api.gameday.shopping/webapi/Filter/GetProductTypeList?seoName='+context.route.params.league+'&teamName='+context.route.params.team
        ),
        await context.app.$axios.$get(
          'https://api.gameday.shopping/webapi/Filter/GetColourList?categoryName='+context.route.params.league+'&teamName='+context.route.params.team +'&garmentName=null'
        ),
        await context.app.$axios.$get(
          'https://api.gameday.shopping/webapi/Filter/GetSizeList?categoryName='+context.route.params.league+'&teamName='+context.route.params.team +'&garmentName=null'
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
