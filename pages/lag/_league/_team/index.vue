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
            <nuxt-link to="/">
              <span style="vertical-align: bottom;
                margin-bottom: 2px;" uk-icon="icon:home;ratio:0.7"/></nuxt-link></li>
          <li><nuxt-link :to="'/'+shop.toLowerCase()">{{ shop }}</nuxt-link></li>
          <li><nuxt-link :to="'/lag/'+$route.params.league+'/'+$route.params.team">{{ $route.params.team }}</nuxt-link></li>
        </ul>
      </div>
      <component 
        v-if="story.content.component" 
        :key="story.content._uid" 
        :blok="story.content" 
        :is="story.content.component" />
      <div class="uk-container uk-container-large uk-padding-small">
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
    </template>
  </section>
</template>
<script>
import ArticleCardSimple from "@/components/articles/ArticleCardSimple";
import FilterItems from "@/components/filter/Filter";
import Page from '@/components/Page'

export default {
  async fetch () {
    // Check if we are in the editor mode
    let version = this.$route.query._storyblok || this.$nuxt.context.isDev ? 'draft' : 'published'

    let pageNum = this.$route.query.page?this.$route.query.page:1
    let color = this.$route.query.color?this.$route.query.color:null
    let gender = this.$route.query.gender?this.$route.query.gender:null
    let productType = this.$route.query.producttype?this.$route.query.producttype:null
    let size = this.$route.query.size?this.$route.query.size:null
    let attribute = this.$route.query.attribute?this.$route.query.attribute:null
    let sale = this.$route.query.sale?this.$route.query.sale:false
    let brand = this.$route.query.brand?this.$route.query.brand:null
    
    let shop = this.$route.params.league=='premier-league'?this.$route.params.league:this.$route.params.league.toUpperCase()+'-shop'
    try {
      const [a, p, c, s, g, b, sb] = await Promise.all([
        this.$axios.$get(
          '/webapi/Article/getArticleList?pageSize=0&brand='+brand+'&attribute=null&teamList=null&color='+color+'&size='+size+'&gender='+gender+'&productType='+productType+'&sale='+sale+'&pageNum='+ pageNum +'&seoName=' +this.$route.params.team
        ),
        this.$axios.$get(
          '/webapi/Filter/GetProductTypeList?seoName='+this.$route.params.league+'&teamName='+this.$route.params.team
        ),
        this.$axios.$get(
          '/webapi/Filter/GetColourList?categoryName='+this.$route.params.league+'&teamName='+this.$route.params.team +'&garmentName=null'
        ),
        this.$axios.$get(
          '/webapi/Filter/GetSizeList?categoryName='+this.$route.params.league+'&teamName='+this.$route.params.team +'&garmentName=null'
        ),
        this.$axios.$get(
          '/webapi/Filter/GetGenderList?categoryName='+this.$route.params.league+'&teamName='+this.$route.params.team +'&garmentName=null'
        ),
        this.$axios.$get(
          '/webapi/Filter/GetBrandList?categoryName='+this.$route.params.league+'&teamName='+this.$route.params.team +'&garmentName=null'
        ),
        this.$storyapi.get('cdn/stories?starts_with=lag/'+this.$route.params.league+'/'+this.$route.params.team, {
          version: version,
          cv: this.$store.getters.version
        })
      ]);
      this.articles=a[0].ArticleList
      this.producttypes=p
      this.colors=c
      this.sizes=s
      this.gender=g
      this.brands=b
      this.article=a[0]
      this.pageNum=pageNum
      this.shop=shop
      this.story=sb.data.stories.length>0?sb.data.stories[0]:{ content: {} }
    } catch (err) {
      console.log('_team error')
      console.log(err);
      console.log(err.request);
    }

  },
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
    FilterItems,
    Page
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
      readmore: true,
      shop: '',
      stories: []
    }
  },
  watch: {
    '$route.query': function(oldQuery, newQuery){
      window.scrollTo(0,0)
      this.$fetch()
    }
  },
  mounted(){
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
@import '~/assets/scss/vars.scss';
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
