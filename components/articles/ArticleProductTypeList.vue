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
      <div 
        class="uk-container uk-container-large uk-padding-small">
        <div 
          class="ts-filter uk-flex uk-flex-middle uk-margin-small-bottom"
          uk-sticky="offset:118;width-element:body;bottom:true">
          <strong>{{ article.TotalNumberOfProducts }} {{ $getCMSEntry(global_labels,'info_products', 'produkter') }}</strong> 
          <FilterItems
            :product-types="producttypes"
            :colors="colors"
            :sizes="sizes"
            :gender="gender"
            :brands="brands"
            :teams="teams"
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
            :url="(siteid==6)?`/article/${article.HeadCategorySeoName}/${article.SeoName}`:`/a/${article.Id}/${article.SeoName}`"
          />
          <div
            v-if="articles.length<1"
            class="uk-margin-bottom uk-margin-top" 
          >
            {{ $getCMSEntry(global_labels,'info_no_items_found', 'Vi hittade inga produkter för det aktuella urvalet.') }}
          </div>
        </div>
        <ul 
          v-if="article.TotalPages>1"
          class="uk-pagination uk-flex-center uk-margin-large uk-margin-bottom">
          <li>
            <a 
              href="#"
              @click.stop.prevent="previous()"><span uk-pagination-previous></span> {{ $getCMSEntry(global_labels,'paging_previous', 'Föregående') }}</a></li>
          <li><span>{{ pageNum }}/{{ article.TotalPages }}</span></li>
          <li>
            <a 
              href="#"
              @click.stop.prevent="next()">{{ $getCMSEntry(global_labels,'paging_next', 'Nästa') }} <span uk-pagination-next></span></a></li>
        </ul>
      </div>
    </template>
  </section>
</template>
<script>
import {mapGetters} from 'vuex'
import ArticleCardSimple from "@/components/articles/ArticleCardSimple";
import FilterItems from "@/components/filter/Filter";

export default {
  async fetch () {
    let pageNum = this.$route.query.page?this.$route.query.page:1
    let color = this.$route.query.color?this.$route.query.color:null
    let gender = this.$route.query.gender?this.$route.query.gender:null
    let productType = this.$route.params.typeId?this.$route.params.typeId:null
    let size = this.$route.query.size?this.$route.query.size:null
    let attribute = this.$route.query.attribute?this.$route.query.attribute:null
    let sale = this.$route.query.sale?this.$route.query.sale:false
    let brand = this.$route.query.brand?this.$route.query.brand:null
    let team = this.$route.query.team?this.$route.query.team:null
    
    try {
      const [a, c, s, g, b] = await Promise.all([
        this.$axios.$get(
          '/webapi/Article/getArticleList?pageSize=0&lookUpBrand=false&brand='+brand+'&attribute=null&teamList='+team+'&color='+color+'&size='+size+'&gender='+gender+'&productType='+productType+'&sale='+sale+'&pageNum='+ pageNum +'&seoName=null'
        ),
        this.$axios.$get(
          '/webapi/Filter/GetColourList?categoryName=null&teamName=null&garmentName='+productType+'&brandName=null'
        ),
        this.$axios.$get(
          '/webapi/Filter/GetSizeList?categoryName=null&teamName=null&garmentName='+productType+'&brandName=null'
        ),
        this.$axios.$get(
          '/webapi/Filter/GetGenderList?categoryName=null&teamName=null&garmentName='+productType+'&brandName=null'
        ),
        this.$axios.$get(
          '/webapi/Filter/GetBrandList?categoryName=null&teamName=null&garmentName='+productType+'&brandName=null'
        )
      ]);
      this.articles=a[0].ArticleList
      this.brands=b
      this.colors=c
      this.sizes=s
      this.gender=g
      this.article=a[0]
      this.pageNum=pageNum
      this.teams = team
    } catch (err) {
      console.log('_team error')
      console.log(err);
      console.log(err.request);
    }

  }/*,
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
  }*/,
  components:{
    ArticleCardSimple,
    FilterItems
  },
  computed: {
    ...mapGetters({
      global_labels:'labels'})
  },
  data () {
    return {
      article: {},
      articles: [],
      producttypes: [], //To filter on
      colors: [],
      sizes: [],
      gender: [],
      brands: [],
      sale: [],
      teams: [],
      pageNum: 1,
      totalPages:1,
      numOfProducts: 1,
      readmore: true,
      siteid: process.env.SITE_ID,
    }
  },
  watch: {
    '$route.query': function(oldQuery, newQuery){
      window.scrollTo(0,0)
      this.$fetch()
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
  activated(){
    console.log('activated')
    if (this.$fetchState.timestamp <= Date.now() - 600000) {
      this.$fetch()
    }
  }
}
</script>
<style lang="scss">
.ph-img{
  height:200px;
  margin-bottom:10px;
}
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
