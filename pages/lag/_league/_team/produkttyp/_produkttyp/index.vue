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
      <div class="uk-container uk-container-large uk-padding-small">
        <ul class="uk-breadcrumb">
          <li>
            <nuxt-link :to="localePath('/')">
              <span style="vertical-align: bottom;
                margin-bottom: 2px;" uk-icon="icon:home;ratio:0.7"/></nuxt-link></li>
          <li><nuxt-link :to="localePath('/'+shop.toLowerCase())">{{ shop }}</nuxt-link></li>
          <li><nuxt-link :to="localePath('/lag/'+$route.params.league+'/'+$route.params.team)">{{ $route.params.team }}</nuxt-link></li>
          <li><nuxt-link :to="localePath('/lag/'+$route.params.league+'/'+$route.params.team+'/produkttyp/'+$route.params.produkttyp)">{{ $route.params.produkttyp }}</nuxt-link></li>
        </ul>
        <h1 class="uk-margin-remove-top">{{ article.SeoTitle }}</h1>
      </div>
      <div class="uk-container uk-container-large uk-padding-small">
        <div 
          class="ts-filter uk-flex uk-flex-middle uk-margin-small-bottom"
          uk-sticky="offset:118;width-element:body;bottom:true">
          <strong>{{ article.TotalNumberOfProducts }} {{ $getCMSEntry(global_labels,'info_products', 'produkter') }}</strong>
          <FilterItems
            :colors="colors"
            :sizes="sizes"
            :gender="gender"
            :brands="brands"
            :show_sale="true"
          />
        </div>
        <div
          class="ts-article-list uk-grid uk-grid-small uk-child-width-1-2 uk-child-width-1-3@s uk-child-width-1-4@m uk-child-width-1-5@l"
          uk-grid
          uk-height-match="target: .uk-card">
          <ArticleCardSimple
            v-for="article in articles"
            :key="article.Id"
            :article="article"
            :OLDurl="`/lag/${$route.params.league}/${$route.params.team}/${article.UrlSafeName.replace('ø', 'o')}`"
            :url="`/a/${article.ProductId}/${article.UrlSafeName.replace('ø', 'o')}`"
          />
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
   // ['page','color','size','producttype','attribute','gender','sale','brand','team'],
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
      brands: [],
      pageNum: 1,
      totalPages:1,
      numOfProducts: 1,
      readmore: true,
      shop:''
    }
  },
  computed: {
    ...mapGetters({
      global_labels:'labels'})
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
  watch: {
    '$route.query': function(oldQuery, newQuery){
      if(this._inactive === false && JSON.stringify(newQuery) !== JSON.stringify(oldQuery)){
        window.scrollTo(0,0)
        this.$fetch()
      }
    }
  },
  async fetch () {
    let pageNum = this.$route.query.page?this.$route.query.page:1
    let color = this.$route.query.color?this.$route.query.color:null
    let gender = this.$route.query.gender?this.$route.query.gender:null
    let size = this.$route.query.size?this.$route.query.size:null
    let attribute = this.$route.query.attribute?this.$route.query.attribute:null
    let sale = this.$route.query.sale?this.$route.query.sale:false
    let brand = this.$route.query.brand?this.$route.query.brand:null
    
    let shop = this.$route.params.league.toUpperCase()+'-shop'
    try {
      const [a, c, s, g, b] = await Promise.all([
        this.$axios.$get(
          '/webapi/'+this.$i18n.locale+'/Article/getArticleList?sortorder=0&pageSize=0&lookUpBrand=false&brand='+brand+'&attribute=null&teamList=null&color='+color+'&size='+size+'&gender='+gender+'&productType='+this.$route.params.produkttyp+'&sale=false&pageNum='+ pageNum +'&seoName=' +this.$route.params.team
        ),
        this.$axios.$get(
          '/webapi/'+this.$i18n.locale+'/Filter/GetColourList?categoryName='+this.$route.params.league+'&teamName='+this.$route.params.team +'&garmentName='+this.$route.params.produkttyp+'&brandName=null'
        ),
        this.$axios.$get(
          '/webapi/'+this.$i18n.locale+'/Filter/GetSizeList?categoryName='+this.$route.params.league+'&teamName='+this.$route.params.team +'&garmentName='+this.$route.params.produkttyp+'&brandName=null'
        ),
        this.$axios.$get(
          '/webapi/'+this.$i18n.locale+'/Filter/GetGenderList?categoryName='+this.$route.params.league+'&teamName='+this.$route.params.team +'&garmentName='+this.$route.params.produkttyp
        ),
        this.$axios.$get(
          '/webapi/'+this.$i18n.locale+'/Filter/GetBrandList?categoryName='+this.$route.params.league+'&teamName='+this.$route.params.team +'&garmentName='+this.$route.params.produkttyp
        )
      ]);
      
        this.articles= a.ArticleList
        this.colors= c
        this.sizes= s
        this.gender= g
        this.brands= b
        this.article= a
        this.pageNum= pageNum
        this.shop= shop
    } catch (err) {
      console.log('_produkttyp error')
      console.log(err);
      console.log(err.request);
      return error({ statusCode: 404, message: 'Post not found' })
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


.lfc-green{
  color: $global-secondary-background;
}
</style>
