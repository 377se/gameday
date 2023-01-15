<template>
  <section class="uk-position-relative">
    <template
      v-if="$fetchState.pending"
    >
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
    <template
      v-else>
      <SeoHead
        :title="story.content.SEO.title"
        :description="`${story.content.SEO.description}`.replace(/<\/?[^>]+(>|$)/g, '')"
        :canonical="metadata.Canonical"
        :lang-hrefs="metadata.LangHref"
      />
      <div class="uk-container uk-container-large uk-padding-small uk-padding-remove-bottom">
        <ul
          v-if="metadata.Breadcrumb && metadata.Breadcrumb.length>0" 
          class="uk-breadcrumb">
          <li>
            <nuxt-link :to="localePath('/')">
              <span style="vertical-align: bottom;
                margin-bottom: 2px;" uk-icon="icon:home;ratio:0.7"/></nuxt-link></li>
          <li
            v-for="(b,index) in metadata.Breadcrumb[0].ItemList"
            :key="index">
            <nuxt-link 
              v-if="b.Url"
              :to="localePath(b.Url)">{{ b.Name }}</nuxt-link>
            <span v-else>{{ b.Name }}</span>
          </li>
        </ul>
      </div>
      <component 
        v-if="story.content.component" 
        :key="story.content._uid" 
        :blok="story.content" 
        :is="story.content.component" />
      <div
        v-else
        class="uk-container uk-container-large uk-padding-small">
        <ArticleTeamListByCategory 
          :sb="story.content.component?true:false"/>
      </div>
    </template>
  </section>
</template>
<script>
import ArticleTeamListByCategory from "@/components/articles/ArticleTeamListByCategory";
import Page from '@/components/Page'

export default {
  cache: true,
  async fetch () {
    // Check if we are in the editor mode
    let version = this.$route.query._storyblok || this.$nuxt.context.isDev ? 'draft' : 'published'
    try {
      const [sb] = await Promise.all([
        this.$storyapi.get('cdn/stories?starts_with=' + process.env.STORYBLOK_CATALOGUE.replace('/','') + '/' +this.$i18n.locale+ '/c/'+this.$route.params.parentid+'/'+this.$route.params.categoryid +'/', {
          version: version,
          cv: this.$store.getters.version
        })
      ]);
      this.story=sb.data.stories.length>0?sb.data.stories[0]:{ content: {} }
    
    const [metadata] = await Promise.all([
      this.$axios.$get(
          `/webapi/${this.$i18n.locale}/MetaData/GetMetadataForCategory?url=/c/${this.$route.params.parentid}/${this.$route.params.categoryid}`
        )
        ]);
      this.metadata = metadata
    } catch (err) {
      console.log('_team error')
      console.log(err);
      console.log(err.request);
    }

  },
  fetchDelay: 0,
  activated() {
    if (this.$fetchState.timestamp <= Date.now() - 60000) {// Call fetch again if last fetch more than 60 sec ago
      this.$fetch()
    }
  },
  components:{
    ArticleTeamListByCategory,
    Page
  },
  data () {
    return {
      story: { content: {} },
      metadata: {Canonical: '', LangHref:[]},
      article: {},
      readmore: true,
      shop: '',
      siteid: process.env.SITE_ID
    }
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
