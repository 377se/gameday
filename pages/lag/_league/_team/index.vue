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
      </ul>
      <h1 class="uk-margin-remove-top">{{ article.SeoTitle }}</h1>
      <div 
        :class="{'read-more':readmore}"
        @click="setReadMore()"
        v-html="article.SeoContentDescription"/>
    </div>
    <div 
      class="uk-container uk-container-large uk-padding-small">
      <h3
        v-if="producttypes!=null && producttypes.length>0"
        >Populära kategorier</h3>
      <div
        v-if="producttypes!=null && producttypes.length>0"
        class="uk-grid uk-grid-small uk-margin-bottom uk-margin-top category-list-slider"
        uk-grid
        >
        <div
          v-for="pt in producttypes"
          :key="pt.GarmentId"
          >
          <nuxt-link
            class="uk-label"
            :to="`/lag/${$route.params.league}/${$route.params.team}/produkttyp/${pt.SeoName}`"><span>{{ pt.Name }}</span></nuxt-link>
        </div>
      </div>
      <div 
        class="ts-filter uk-flex uk-flex-middle uk-margin-small-bottom"
        uk-sticky="offset:80;width-element:body;bottom:true">
        <strong>{{ article.TotalNumberOfProducts }} produkter</strong> 
        <FilterItems
          :product-types="producttypes"
          :colors="colors"
          :sizes="sizes"
          :gender="gender"
          :brands="brands"
          :show_sale="true"/>
      </div>
      <div
        class="ts-article-list uk-grid uk-grid-small uk-child-width-1-2 uk-child-width-1-3@s uk-child-width-1-4@m uk-child-width-1-5@l"
        uk-grid
        uk-height-match="target: .uk-card">
        <ArticleCardSimple
          v-for="article in articles"
          :key="article.Id"
          :article="article"
          :url="`/lag/${$route.params.league}/${$route.params.team}/${article.SeoName}`"
        />
        <div
          v-if="articles.length<1"
          class="uk-margin-bottom uk-margin-top" 
        >
          Vi hittade inga produkter för det aktuella valet.
        </div>
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
  watchQuery: ['page','color','size','producttype','attribute','gender','sale', 'brand'],
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
      producttypes: [], //To filter on
      colors: [],
      sizes: [],
      gender: [],
      brands: [],
      sale: [],
      pageNum: 1,
      totalPages:1,
      numOfProducts: 1,
      readmore: true
    }
  },
  methods:{
    setReadMore(){
      this.readmore=false
    },
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
  async asyncData (context) {
    let pageNum = context.route.query.page?context.route.query.page:1
    let color = context.route.query.color?context.route.query.color:null
    let gender = context.route.query.gender?context.route.query.gender:null
    let productType = context.route.query.producttype?context.route.query.producttype:null
    let size = context.route.query.size?context.route.query.size:null
    let attribute = context.route.query.attribute?context.route.query.attribute:null
    let sale = context.route.query.sale?context.route.query.sale:false
    let brand = context.route.query.brand?context.route.query.brand:null
    try {
      const [a, p, c, s, g, b] = await Promise.all([
        await context.app.$axios.$get(
          '/webapi/Article/getArticleList?brand='+brand+'&attribute=null&teamList=null&color='+color+'&size='+size+'&gender='+gender+'&productType='+productType+'&sale='+sale+'&pageNum='+ pageNum +'&seoName=' +context.route.params.team
        ),
        await context.app.$axios.$get(
          '/webapi/Filter/GetProductTypeList?seoName='+context.route.params.league+'&teamName='+context.route.params.team
        ),
        await context.app.$axios.$get(
          '/webapi/Filter/GetColourList?categoryName='+context.route.params.league+'&teamName='+context.route.params.team +'&garmentName=null'
        ),
        await context.app.$axios.$get(
          '/webapi/Filter/GetSizeList?categoryName='+context.route.params.league+'&teamName='+context.route.params.team +'&garmentName=null'
        ),
        await context.app.$axios.$get(
          '/webapi/Filter/GetGenderList?categoryName='+context.route.params.league+'&teamName='+context.route.params.team +'&garmentName=null'
        ),
        await context.app.$axios.$get(
          '/webapi/Filter/GetBrandList?categoryName='+context.route.params.league+'&teamName='+context.route.params.team +'&garmentName=null'
        )
      ]);
      return {
        articles: a[0].ArticleList,
        producttypes: p,
        colors: c,
        sizes: s,
        gender: g,
        brands: b,
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
