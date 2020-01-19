<template>
  <section>
    <div class="uk-container uk-container-large uk-padding-small">
      <ul class="uk-breadcrumb">
        <li>
          <nuxt-link to="/">
            <span style="vertical-align: bottom;
              margin-bottom: 2px;" uk-icon="icon:home;ratio:0.7"/></nuxt-link></li>
        <li><nuxt-link :to="'/'+$route.params.league+'-shop'">{{ $route.params.league.toUpperCase() }}-shop</nuxt-link></li>
        <li><nuxt-link :to="'/lag/'+$route.params.league+'/'+$route.params.team">{{ $route.params.team }}</nuxt-link></li>
        <li><nuxt-link :to="'/lag/'+$route.params.league+'/'+$route.params.team+'/produkttyp/'+$route.params.produkttyp">{{ $route.params.produkttyp }}</nuxt-link></li>
      </ul>
      <h1 class="uk-margin-remove-top">{{ article.SeoTitle }}</h1>
    </div>
    <div class="uk-container uk-container-large uk-padding-small">
      <div class="uk-flex uk-flex-middle uk-margin-small-bottom">
        <strong>{{ article.TotalNumberOfProducts }} produkter</strong>
        <FilterItems
          :colors="colors"
          :sizes="sizes"
          :gender="gender"
          :show_sale="true"
          :sale="sale"/>
      </div>
      <div
        class="uk-grid uk-grid-small uk-child-width-1-2 uk-child-width-1-3@s uk-child-width-1-4@m uk-child-width-1-5@l"
        uk-grid
        uk-height-match="target: .uk-card">
        <ArticleCardSimple
          v-for="article in articles"
          :key="article.Id"
          :article="article"
          :url="`/lag/${$route.params.league}/${$route.params.team}/${article.SeoName}`"
        />
      </div>
      <ul 
        v-if="article.TotalPages>1"
        class="uk-pagination uk-flex-center uk-margin-large uk-margin-bottom">
        <li>
          <a 
            href="#"
            @click.stop.prevent="previous()"><span uk-pagination-previous></span> Föregående</a></li>
        <li><span>{{ pageNum }}/{{ article.TotalPages }}</span></li>
        <li>
          <a 
            href="#"
            @click.stop.prevent="next()">Nästa <span uk-pagination-next></span></a></li>
      </ul>
    </div>
  </section>
</template>
<script>
import ArticleCardSimple from "@/components/articles/ArticleCardSimple";
import FilterItems from "@/components/filter/Filter";
export default {
  watchQuery: ['page','color','size','producttype','attribute','gender','sale'],
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
          content: `${this.article.MetaDescription}`.replace(/<\/?[^>]+(>|$)/g, ""),
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
      colors: [],
      sizes: [],
      gender: [],
      sale: false,
      pageNum: 1,
      totalPages:1,
      numOfProducts: 1,
      readmore: true
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
    let color = context.route.query.color?context.route.query.color:null
    let gender = context.route.query.gender?context.route.query.gender:null
    let size = context.route.query.size?context.route.query.size:null
    let attribute = context.route.query.attribute?context.route.query.attribute:null
    let sale = context.route.query.sale?context.route.query.sale:false
    sale = sale=='true'?true:false
    try {
      const [a, c, s, g] = await Promise.all([
        await context.app.$axios.$get(
          '/webapi/Article/getArticleList?attribute=null&teamList=null&color='+color+'&size='+size+'&gender='+gender+'&productType='+context.route.params.produkttyp+'&sale=false&pageNum='+ pageNum +'&seoName=' +context.route.params.team
        ),
        await context.app.$axios.$get(
          '/webapi/Filter/GetColourList?categoryName='+context.route.params.league+'&teamName='+context.route.params.team +'&garmentName='+context.route.params.produkttyp
        ),
        await context.app.$axios.$get(
          '/webapi/Filter/GetSizeList?categoryName='+context.route.params.league+'&teamName='+context.route.params.team +'&garmentName='+context.route.params.produkttyp
        ),
        await context.app.$axios.$get(
          '/webapi/Filter/GetGenderList?categoryName='+context.route.params.league+'&teamName='+context.route.params.team +'&garmentName='+context.route.params.produkttyp
        )
      ]);
      return {
        articles: a[0].ArticleList,
        colors: c,
        sizes: s,
        gender: g,
        article: a[0],
        pageNum: pageNum,
        sale: sale
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
