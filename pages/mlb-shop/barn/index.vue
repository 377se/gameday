<template>
  <section>
    <div class="uk-container uk-container-large uk-padding-small">
      <component 
        v-if="story.content.component" 
        :key="story.content._uid" 
        :blok="story.content" 
        :is="story.content.component" />
    </div>
    <FilterItems
      :product-types="producttypes"
      :colors="colors"
      :sizes="sizes"/>
    <div class="uk-container uk-container-large uk-padding-small">
      <div class="uk-margin-small-bottom"><strong>{{ article.TotalNumberOfProducts }} {{ $getCMSEntry(global_labels,'info_products', 'produkter') }}</strong></div>
      <div
        class="uk-grid uk-grid-small uk-child-width-1-2 uk-child-width-1-3@s uk-child-width-1-4@m uk-child-width-1-5@l"
        uk-grid
        uk-height-match="target:.uk-card">
        
        <ArticleCardSimple
          v-for="article in articles"
          :key="article.Id"
          :article="article"
          :url="`/lag/mlb/${article.TeamNameSeo}/${article.UrlSafeName}`"
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
import Page from "@/components/Page";
export default {
   //['page'],
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
      pageNum: 1,
      totalPages:1,
      numOfProducts: 1
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
    // Check if we are in the editor mode
    let version = context.query._storyblok || context.isDev ? 'draft' : 'published'
    let pageNum = context.route.query.page?context.route.query.page:1
    let teamIdList = null
    try {
      const [a, p, c, s, sb] = await Promise.all([
        await context.app.$axios.$get(
          '/webapi/'+this.$i18n.locale+'/Article/GetArticleListByGender?pageNum='+ pageNum +'&seoName=mlb&gender=barn&teamIdList='+teamIdList
        ),
        await context.app.$axios.$get(
          '/webapi/'+this.$i18n.locale+'/Filter/GetProductTypeList?seoName=mlb&teamName=null&brandName=null'
        ),
        await context.app.$axios.$get(
          '/webapi/'+this.$i18n.locale+'/Filter/GetColourList?categoryName=mlb&teamName=null&garmentName=null&brandName=null'
        ),
        await context.app.$axios.$get(
          '/webapi/'+this.$i18n.locale+'/Filter/GetSizeList?categoryName=mlb&teamName=null&garmentName=null&brandName=null'
        ),
        await context.app.$storyapi.get(`cdn/stories${process.env.STORYBLOK_CATALOGUE}/${this.$i18n.locale}/mlb-shop/barn`, {
          version: version,
          cv: context.store.getters.version
        })
      ]);
      return {
        articles: a[0].ArticleList,
        producttypes: p,
        colors: c,
        sizes: s,
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
