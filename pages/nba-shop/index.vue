<template>
  <section>
    <div class="uk-container uk-container-large uk-padding-small">
      <ul class="uk-breadcrumb">
        <li>
          <nuxt-link to="/">
            <span style="vertical-align: bottom;
              margin-bottom: 2px;" uk-icon="icon:home;ratio:0.7"/></nuxt-link></li>
        <li><nuxt-link to="/nba-shop">NBA-shop</nuxt-link></li>
      </ul>
      <h1 class="uk-margin-remove-top">{{ article.SeoTitle }}</h1>
      <div
        :class="{'read-more':readmore}" 
        @click="setReadMore()" 
        v-html="article.SeoContentDescription"/>
    </div>
    <div class="uk-container uk-container-large uk-padding-small">
      <h3>Populära lag 
        <span class="show-all">
          <a 
            href="#offscreen-menu"
            class="wrapper-menu"
            uk-toggle
            @click.stop.prevent>
            Visa alla
          </a>
        </span>
      </h3>
      <div
        class="uk-flex uk-flex-center uk-grid-small uk-margin uk-margin-large-bottom" uk-grid>
        <nuxt-link
          to="/lag/nba/chicago-bulls"
          class="team-slider-item">
          <img class="team-slider-img" src="https://static.supportersplace.se/category/chicago-bulls-logo-8530A1093D-seeklogo.com.png" alt="Chicago Bulls">
        </nuxt-link>
        <nuxt-link
          to="/lag/nba/cleveland-cavaliers"
          class="team-slider-item">
          <img class="team-slider-img" src="https://static.supportersplace.se/category/Cleveland-Cavaliers-logo (1).png" alt="Cleveland Cavaliers">
        </nuxt-link>
        <nuxt-link
          to="/lag/nba/golden-state-warriors"
          class="team-slider-item">
          <img class="team-slider-img" src="https://static.supportersplace.se/category/golden-state-warriors (1).png" alt="Golden State Warriors">
        </nuxt-link>
        <nuxt-link
          to="/lag/nba/brooklyn-nets"
          class="team-slider-item">
          <img class="team-slider-img" src="https://static.supportersplace.se/category/brooklyn-nets-logo (1).png" alt="Brooklyn Nets">
        </nuxt-link>
      </div>
      <div class="uk-flex uk-flex-middle uk-margin-small-bottom">
        <strong>{{ article.TotalNumberOfProducts }} produkter</strong>
        <FilterItems
          :product-types="producttypes"
          :colors="colors"
          :sizes="sizes"
          :gender="gender"
          :teams="menu"
          :show_sale="true"/>
      </div>
      <div
        class="uk-grid uk-grid-small uk-child-width-1-2 uk-child-width-1-3@s uk-child-width-1-4@m uk-child-width-1-5@l"
        uk-grid
        uk-height-match="target: .uk-card">
        <ArticleCardSimple
          v-for="article in articles"
          :key="article.Id"
          :article="article"
          :url="`/lag/nba/${article.HeadCategorySeoName}/${article.SeoName}`"
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
      producttypes: [], //To filter on
      colors: [],
      sizes: [],
      gender: [],
      pageNum: 1,
      totalPages:1,
      numOfProducts: 1,
      readmore: true
    }
  },
  computed: {
    ...mapGetters({
      menu: 'nbaMenu'
    })
  },
  methods:{
    setReadMore(){
      this.readmore = false
    },
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
    let productType = context.route.query.producttype?context.route.query.producttype:null
    let size = context.route.query.size?context.route.query.size:null
    let attribute = context.route.query.attribute?context.route.query.size:null
    let sale = context.route.query.sale?context.route.query.sale:false
    let team = context.route.query.team?context.route.query.team:null
    let brand = context.route.query.brand?context.route.query.brand:null
    try {
      const [a, p, c, s, g, b] = await Promise.all([
        await context.app.$axios.$get(
          '/webapi/Article/getArticleList?brand='+brand+'&attribute=null&teamList='+team+'&color='+color+'&size='+size+'&gender='+gender+'&productType='+productType+'&sale='+sale+'&pageNum='+ pageNum +'&seoName=nba'
        ),
        await context.app.$axios.$get(
          '/webapi/Filter/GetProductTypeList?seoName=nba&teamName=null'
        ),
        await context.app.$axios.$get(
          '/webapi/Filter/GetColourList?categoryName=nba&teamName=null&garmentName=null'
        ),
        await context.app.$axios.$get(
          '/webapi/Filter/GetSizeList?categoryName=nba&teamName=null&garmentName=null'
        ),
        await context.app.$axios.$get(
          '/webapi/Filter/GetGenderList?categoryName=nba&teamName=null&garmentName=null'
        ),
        await context.app.$axios.$get(
          '/webapi/Filter/GetBrandList?categoryName=nba&teamName=null&garmentName=null'
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
