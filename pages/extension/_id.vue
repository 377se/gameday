<template>
  <section>
    <nuxt-child />
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
      <section class="uk-position-relative">
        <component 
          v-if="story.content.component" 
          :key="story.content._uid" 
          :blok="story.content" 
          :is="story.content.component" />
        <div
          class="uk-container uk-container-large uk-padding-small">
          <div
            class="ts-article-list uk-grid uk-grid-small uk-child-width-1-2 uk-child-width-1-3@s uk-child-width-1-4@m uk-child-width-1-5@l"
            uk-grid
            uk-height-match="target: .uk-card">
            <ArticleCardSimple
              v-for="article in articles"
              :key="article.ProductId"
              :article="article"
              :url="`/extension/${$route.params.id}/a/${article.ProductId}?cartid=${$route.query.cartid}`"
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
      </section>
    </template>
  </section>
</template>
<script>
import {mapGetters} from 'vuex'
import Page from '@/components/Page'
import ArticleCardSimple from "@/components/articles/ArticleCardSimple";

export default {
  async fetch () {
    let pageNum = this.$route.query.page?this.$route.query.page:1
    // Check if we are in the editor mode
    let version = this.$route.query._storyblok || this.$nuxt.context.isDev ? 'draft' : 'published'
    try {
      const [a,sb] = await Promise.all([
        this.$axios.$get(
          '/webapi/'+this.$i18n.locale+'/extension/GetExtensionListByArticleId?articleId='+this.$route.params.id
        ),
        this.$storyapi.get('cdn/stories?starts_with=' + process.env.STORYBLOK_CATALOGUE.replace('/','') + '/' +this.$i18n.locale+ '/extension/'+this.$route.params.id, {
          version: version,
          cv: this.$store.getters.version
        })
      ]);
      this.articles=a.ArticleList
      
      this.story=sb.data.stories.length>0?sb.data.stories[0]:{ content: {} }
      this.pageNum=pageNum
    } catch (err) {
      console.log('_team error')
      console.log(err);
      console.log(err.request);
    }

  },
  /*head () {
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
  },*/
  components:{
    ArticleCardSimple,
    Page
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
      teamlist: [],
      sale: [],
      pageNum: 1,
      totalPages:1,
      numOfProducts: 1,
      readmore: true,
      story: { content: {} },
    }
  },
  computed: {
    ...mapGetters({
      global_labels:'labels'})
  },
  watch: {
    '$route.query': function(oldQuery, newQuery){
      if(this._inactive === false && JSON.stringify(newQuery) !== JSON.stringify(oldQuery)){
        window.scrollTo(0,0)
        this.$fetch()
      }
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
