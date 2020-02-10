<template>
  <section>
    <div class="uk-container uk-container-large uk-padding-small">
      <ul class="uk-breadcrumb">
        <li>
          <nuxt-link to="/">
            <span style="vertical-align: bottom;
              margin-bottom: 2px;" uk-icon="icon:home;ratio:0.7"/></nuxt-link></li>
        <li><nuxt-link to="/premier-league">Premier League</nuxt-link></li>
        <li><nuxt-link to="/premier-league/sale/">REA</nuxt-link></li>
      </ul>
      <component 
        v-if="story.content.component" 
        :key="story.content._uid" 
        :blok="story.content" 
        :is="story.content.component" />
    </div>
    <div class="uk-container uk-container-large uk-padding-small">
      <div 
        class="ts-filter uk-flex uk-flex-middle uk-margin-small-bottom"
        uk-sticky="offset:80;width-element:body;bottom:true">
        <strong>{{ article.TotalNumberOfProducts }} produkter</strong>
        <FilterItems
          :product-types="producttypes"
          :colors="colors"
          :sizes="sizes"
          :gender="gender"
          :teams="menu"
          :brands="brands"
          :show_sale="false"/>
      </div>
      <div
        class="ts-article-list uk-grid uk-grid-small uk-child-width-1-2 uk-child-width-1-3@s uk-child-width-1-4@m uk-child-width-1-5@l"
        uk-grid
        uk-height-match="target: .uk-card">
        <ArticleCardSimple
          v-for="article in articles"
          :key="article.Id"
          :article="article"
          :url="`/lag/premier-league/${article.HeadCategorySeoName}/${article.SeoName}`"
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
import { mapGetters, mapActions } from 'vuex'
import ArticleCardSimple from "@/components/articles/ArticleCardSimple";
import FilterItems from "@/components/filter/Filter";
import Page from "@/components/Page";
export default {
  watchQuery: ['page','color','size','producttype','attribute','gender','sale','brand','team'],
  head () {
    return {
      title: this.story.content.SEO.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.story.content.SEO.description
        },
        {
          hid: 'og:title',
          name:  'og:title',
          content:  this.story.content.SEO.title,
        },
        {
          hid: 'og:description',
          name:  'og:description',
          content: `${this.story.content.SEO.description}`.replace(/<\/?[^>]+(>|$)/g, ""),
        }
      ]
    }
  },
  components:{
    ArticleCardSimple,
    FilterItems,
    Page
  },
  data () {
    return {
      story: { content: {SEO:{title:'',description:''}} },
      article: {},
      articles: [],
      producttypes: [], //To filter on
      colors: [],
      sizes: [],
      brands: [],
      pageNum: 1,
      totalPages:1,
      numOfProducts: 1
    }
  },
  computed: {
    ...mapGetters({
      menu: 'nhlMenu'
    })
  },
  methods:{
    next(){
      if(this.pageNum<this.article.TotalPages){
        this.$router.push({query: {...this.$route.query, page: (parseInt(this.pageNum)+1)}})
      } 
    },
    previous(){
      if(this.pageNum>1){
        this.$router.push({query: {...this.$route.query, page: (parseInt(this.pageNum)-1)}})
      } 
    }
  },
  mounted () {
    this.$storybridge.on(['input', 'published', 'change'], (event) => {
      if (event.action == 'input') {
        if (event.story.id === this.story.id) {
          this.story.content = event.story.content
        }
      } else {
        window.location.reload()
      }
    })
  },
  async asyncData (context) {
    // Check if we are in the editor mode
    let version = context.query._storyblok || context.isDev ? 'draft' : 'published'

    let pageNum = context.route.query.page?context.route.query.page:1
    let color = context.route.query.color?context.route.query.color:null
    let gender = context.route.query.gender?context.route.query.gender:null
    let productType = context.route.query.producttype?context.route.query.producttype:null
    let size = context.route.query.size?context.route.query.size:null
    let attribute = context.route.query.attribute?context.route.query.size:null
    let team = context.route.query.team?context.route.query.team:null
    let brand = context.route.query.brand?context.route.query.brand:null
    try {
      const [a, p, c, s, g, b, sb] = await Promise.all([
        await context.app.$axios.$get(
          '/webapi/Article/getArticleList?brand='+brand+'&attribute=null&teamList='+team+'&color='+color+'&size='+size+'&gender='+gender+'&productType='+productType+'&sale=true&pageNum='+ pageNum +'&seoName=premier-league'
        ),
        await context.app.$axios.$get(
          '/webapi/Filter/GetProductTypeList?seoName=premier-league&teamName=null'
        ),
        await context.app.$axios.$get(
          '/webapi/Filter/GetColourList?categoryName=premier-league&teamName=null&garmentName=null'
        ),
        await context.app.$axios.$get(
          '/webapi/Filter/GetSizeList?categoryName=premier-league&teamName=null&garmentName=null'
        ),
        await context.app.$axios.$get(
          '/webapi/Filter/GetGenderList?categoryName=premier-league&teamName=null&garmentName=null'
        ),
        await context.app.$axios.$get(
          '/webapi/Filter/GetBrandList?categoryName=premier-league&teamName=null&garmentName=null'
        ),
        await context.app.$storyapi.get(`cdn/stories/premier-league/sale`, {
          version: version,
          cv: context.store.getters.version
        })
      ]);
      return {
        articles: a[0].ArticleList,
        producttypes: p,
        colors: c,
        sizes: s,
        gender: g,
        brands: b,
        story: sb.data.story,
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
.read-more{
  max-height: 74px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
}
.read-more:after{
    content: "";
    opacity: 1;
    display: block;
    background: linear-gradient(rgba(255,255,255,0) 0%, rgba(255,255,255,1) 70%);
    position: absolute;
    bottom: 0;
    padding: 20px 10px 0;
    left: 0;
    width: 100%;
    box-sizing: border-box;
}
</style>
