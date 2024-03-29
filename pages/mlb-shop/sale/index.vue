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
          <li><nuxt-link :to="localePath('/mlb-shop')">MLB-shop</nuxt-link></li>
          <li><nuxt-link :to="localePath('/mlb-shop/sale')">REA</nuxt-link></li>
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
          uk-sticky="offset:118;width-element:body;bottom:true">
          <strong>{{ article.TotalNumberOfProducts }} {{ $getCMSEntry(global_labels,'info_products', 'produkter') }}</strong>
          <FilterItems
            :product-types="producttypes"
            :colors="colors"
            :sizes="sizes"
            :gender="gender"
            :show_sale="false"
            :teams="menu"
            :brands="brands"/>
        </div>
        <div
          class="ts-article-list uk-grid uk-grid-small uk-child-width-1-2 uk-child-width-1-3@s uk-child-width-1-4@m uk-child-width-1-5@l"
          uk-grid
          uk-height-match="target:.uk-card">

          <ArticleCardSimple
            v-for="article in articles"
            :key="article.Id"
            :article="article"
            :OLDurl="`/lag/mlb/${article.TeamNameSeo}/${article.UrlSafeName}`"
            :url="`/a/${article.ProductId}/${article.UrlSafeName}`"
          />
        </div>
        <ul 
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
import { mapGetters, mapActions } from 'vuex'
import ArticleCardSimple from "@/components/articles/ArticleCardSimple";
import FilterItems from "@/components/filter/Filter";
import Page from "@/components/Page";
export default {
   //['page','color','size','producttype','attribute','gender'],
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
      gender: [],
      brands: [],
      pageNum: 1,
      totalPages:1,
      numOfProducts: 1
    }
  },
  computed: {
    ...mapGetters({
      menu: 'mlbMenu',
      global_labels:'labels'
    })
  },
  mounted(){
    this.$storybridge(() => {
      const storyblokInstance = new StoryblokBridge()

      storyblokInstance.on(['input', 'published', 'change'], (event) => {
        if (event.action == 'input') {
          if (event.story.id === this.story.id) {
            this.story.content = event.story.content
          }
        } else {
          window.location.reload()
        }
      })
    }, (error) => {
      console.error(error)
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
  watch: {
    '$route.query': function(oldQuery, newQuery){
      if(this._inactive === false && JSON.stringify(newQuery) !== JSON.stringify(oldQuery)){
        window.scrollTo(0,0)
        this.$fetch()
      }
    }
  },
  async fetch () {
    // Check if we are in the editor mode
    let version = this.$route.query._storyblok || this.$nuxt.context.isDev ? 'draft' : 'published'

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
      const [a, p, c, s, g, b, sb] = await Promise.all([
        this.$axios.$get(
          '/webapi/'+this.$i18n.locale+'/Article/getArticleList?sortorder=0&pageSize=0&lookUpBrand=false&brand='+brand+'&attribute=null&teamList='+team+'&color='+color+'&size='+size+'&gender='+gender+'&productType='+productType+'&sale=true&pageNum='+ pageNum +'&seoName=mlb'
        ),
        this.$axios.$get(
          '/webapi/'+this.$i18n.locale+'/Filter/GetProductTypeList?seoName=mlb&teamName=null'
        ),
        this.$axios.$get(
          '/webapi/'+this.$i18n.locale+'/Filter/GetColourList?categoryName=mlb&teamName=null&garmentName=null&brandName=null'
        ),
        this.$axios.$get(
          '/webapi/'+this.$i18n.locale+'/Filter/GetSizeList?categoryName=mlb&teamName=null&garmentName=null&brandName=null'
        ),
        this.$axios.$get(
          '/webapi/'+this.$i18n.locale+'/Filter/GetGenderList?categoryName=mlb&teamName=null&garmentName=null'
        ),
        this.$axios.$get(
          '/webapi/'+this.$i18n.locale+'/Filter/GetBrandList?categoryName=mlb&teamName=null&garmentName=null'
        ),
        this.$storyapi.get(`cdn/stories${process.env.STORYBLOK_CATALOGUE}/${this.$i18n.locale}/mlb-shop/sale`, {
          version: version,
          cv: this.$store.getters.version
        })
      ]);
        this.articles= a.ArticleList
        this.producttypes= p
        this.colors= c
        this.sizes= s
        this.gender= g
        this.brands= b
        this.article= a
        this.pageNum= pageNum
        this.story=sb.data.story
    } catch (err) {
      console.log('mlb-shop/sale error')
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
