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
      <div class="uk-margin-small-bottom"><strong>{{ article.TotalNumberOfProducts }} produkter</strong></div>
      <div
        class="uk-grid uk-grid-small uk-child-width-1-2 uk-child-width-1-4@m"
        uk-height-match="target: > * > .uk-card"
        uk-grid>
        <ArticleCardSimple
          v-for="article in articles"
          :key="article.Id"
          :article="article"
          :url="`/lag/nhl/${article.HeadCategorySeoName}/${article.SeoName}`"
        />
      </div>
      <ul 
        class="uk-pagination uk-flex-right" uk-margin>
        <li>
          <a 
            href="#"
            @click.stop.prevent="previous()"><span uk-pagination-previous></span> Previous</a></li>
        <li><span>{{ pageNum }}/{{ article.TotalPages }}</span></li>
        <li>
          <a 
            href="#"
            @click.stop.prevent="next()">Next <span uk-pagination-next></span></a></li>
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
      sizes: [],
      pageNum: 1,
      totalPages:1,
      numOfProducts: 1
    }
  },
  mounted(){
  },
  methods:{
    next(){
      if(this.pageNum<this.article.TotalPages){
        this.$router.push({ query: { page: (parseInt(this.pageNum)+1) }})
      } 
    },
    previous(){
      if(this.pageNum>1){
        this.$router.push({ query: { page: (parseInt(this.pageNum)-1) }})
      } 
    }
  },
  async asyncData (context) {
    let pageNum = context.route.query.page?context.route.query.page:1
    try {
      const [a, p, c, s] = await Promise.all([
        await context.app.$axios.$get(
          'https://beta.supporterprylar.se/webapi/Article/GetArticleList?pageNum='+ pageNum +'&seoName=nhl'
        ),
        await context.app.$axios.$get(
          'https://beta.supporterprylar.se/webapi/Filter/GetProductTypeList?seoName=nhl&teamName=null'
        ),
        await context.app.$axios.$get(
          'https://beta.supporterprylar.se/webapi/Filter/GetColourList?categoryName=nhl&teamName=null&garmentName=null'
        ),
        await context.app.$axios.$get(
          'https://beta.supporterprylar.se/webapi/Filter/GetSizeList?categoryName=nhl&teamName=null&garmentName=null'
        )
      ]);
      return {
        articles: a[0].ArticleList,
        producttypes: p,
        colors: c,
        sizes: s,
        article: a[0],
        pageNum: pageNum
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
