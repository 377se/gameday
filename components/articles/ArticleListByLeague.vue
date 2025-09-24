<template>
  <section>
    <template v-if="$fetchState.pending">
      <div class="uk-container uk-container-large uk-padding-small">
        <content-placeholders :rounded="true">
          <content-placeholders-img />
          <content-placeholders-heading />
        </content-placeholders>
        <div class="uk-grid uk-grid-small uk-child-width-1-2 uk-child-width-1-3@s uk-child-width-1-4@m uk-child-width-1-5@l">
          <content-placeholders
            v-for="p in 20"
            :key="p"
            :rounded="true"
            class="uk-padding-small">
            <content-placeholders-img
            class="ph-img"/>
            <content-placeholders-text :lines="2" />
          </content-placeholders>
        </div>
      </div>
    </template>
    <template v-else>


      <!-- PRODUKTKATEGORIER PÅ SHOP-SIDORNA -->
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
              :to="localePath(`/${blok.league[0]}-shop?producttype=${pt.SeoName}`)"><span>{{ pt.Name }}</span></nuxt-link>
          </div>
        </div>


        <div
        class="ts-filter uk-flex uk-flex-middle uk-margin-small-bottom"
        uk-sticky="offset:118;width-element:body;bottom:true">
        <strong>{{ article.TotalNumberOfProducts }} {{ $getCMSEntry(global_labels,'info_products', 'produkter') }}</strong>
        <FilterItems
          :product-types="producttypes"
          :colors="colors"
          :sizes="sizes"
          :gender="gender"
          :teams="menu"
          :brands="brands"
          :show_sale="true"/>
        </div>
      <div
        class="ts-article-list uk-grid uk-grid-small uk-child-width-1-2 uk-child-width-1-3@s uk-child-width-1-4@m uk-child-width-1-5@l"
        uk-grid
        uk-height-match="target:.uk-card">

        <ArticleCardSimple
          v-for="article in articles"
          :key="article.Id"
          :article="article"
          :OLDurl="`/lag/mlb/${article.TeamNameSeo}/${$normalize(article.UrlSafeName)}`"
          :url="`/a/${article.ProductId}/${$normalize(article.UrlSafeName)}`"
        />
      </div>
      <ul
        class="uk-pagination uk-flex-center uk-margin-large uk-margin-bottom">
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
    </template>
  </section>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import ArticleCardSimple from "@/components/articles/ArticleCardSimple";
import FilterItems from "@/components/filter/Filter";
export default {
   // ['page','color','size','producttype','attribute','gender','sale'],
  components:{
    ArticleCardSimple,
    FilterItems
  },
  props: {
    blok: {
      type: Object,
      required: true,
    }
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
      pageNum: 1,
      totalPages:1,
      numOfProducts: 1,
      readmore: true
    }
  },
  computed: {
    ...mapGetters({
      nhlMenu: 'nhlMenu',
      mlbMenu: 'mlbMenu',
      nflMenu: 'nflMenu',
      nbaMenu: 'nbaMenu',
      global_labels:'labels'
    })
    ,menu(){
      var m = null
      switch(this.blok.league){
        case 'nhl':
          m = this.nhlMenu
          break;
        case 'nba':
          m = this.nbaMenu
          break;
        case 'nfl':
          m = this.nflMenu
          break;
        case 'mlb':
          m = this.mlbMenu
          break;
      }

      return m
    }
  },
  methods:{
    setReadMore(){
      this.readmore = false
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
  watch: {
    '$route.query': function(oldQuery, newQuery){
      if((this._inactive === false || this._inactive===null) && JSON.stringify(newQuery) !== JSON.stringify(oldQuery)){
        window.scrollTo(0,0)
        this.$fetch()
      }
    }
  },
  async fetch () {
    let pageNum = this.$route.query.page?this.$route.query.page:1
    let color = this.$route.query.color?this.$route.query.color:null
    let gender = this.$route.query.gender?this.$route.query.gender:null
    let productType = this.$route.query.producttype?this.$route.query.producttype:null
    let size = this.$route.query.size?this.$route.query.size:null
    let attribute = this.$route.query.attribute?this.$route.query.size:null
    let sale = this.$route.query.sale?this.$route.query.sale:'false'
    let team = this.$route.query.team?this.$route.query.team:null
    let brand = this.$route.query.brand?this.$route.query.brand:null
    try {
      const [a, p, c, s, g] = await Promise.all([
        this.$axios.$get(
          '/webapi/'+this.$i18n.locale+'/Article/getArticleList?sortorder=3&pageSize=0&lookUpBrand=false&brand='+brand+'&attribute=null&teamList='+team+'&color='+color+'&size='+size+'&gender='+gender+'&productType='+productType+'&sale='+sale+'&pageNum='+ pageNum +'&seoName='+this.blok.league
        ),
        this.$axios.$get(
          '/webapi/'+this.$i18n.locale+'/Filter/GetProductTypeList?teamName=null&seoName='+this.blok.league
        ),
        this.$axios.$get(
          '/webapi/'+this.$i18n.locale+'/Filter/GetColourList?categoryName='+this.blok.league+'&teamName=null&garmentName=null&brandName=null'
        ),
        this.$axios.$get(
          '/webapi/'+this.$i18n.locale+'/Filter/GetSizeList?categoryName='+this.blok.league+'&teamName=null&garmentName=null&brandName=null'
        ),
        this.$axios.$get(
          '/webapi/'+this.$i18n.locale+'/Filter/GetGenderList?categoryName='+this.blok.league+'&teamName=null&garmentName=null'
        )/*,
        this.$axios.$get(
          '/webapi/'+this.$i18n.locale+'/Filter/GetBrandList?categoryName='+this.blok.league+'&teamName=null&garmentName=null'
        )*/
      ]);
        this.articles= a.ArticleList
        this.producttypes= p
        this.colors= c
        this.sizes= s
        this.gender= g
        this.brands= null
        this.article= a
        this.pageNum= pageNum
    } catch (err) {
      console.log('league-shop error')
      console.log(err);
      console.log(err.request);
    }

  },
  activated(){
    if (this.$fetchState.timestamp <= Date.now() - 600000) {
      this.$fetch()
    }
  }
}
</script>
<style lang="scss">

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

