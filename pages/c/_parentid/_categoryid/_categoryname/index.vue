<template>
  <section class="uk-position-relative">
    <div 
      v-if="false"
      class="uk-container uk-container-large uk-padding-small">
      <ul
        class="uk-breadcrumb">
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
    <div
      class="uk-container uk-container-large uk-padding-small">
      <ArticleTeamListByCategory 
        :sb="story.content.component?true:false"/>
    </div>
  </section>
</template>
<script>
import ArticleTeamListByCategory from "@/components/articles/ArticleTeamListByCategory";
import Page from '@/components/Page'

export default {
  async fetch () {
    // Check if we are in the editor mode
    let version = this.$route.query._storyblok || this.$nuxt.context.isDev ? 'draft' : 'published'
    try {
      const [sb] = await Promise.all([
        this.$storyapi.get('cdn/stories?starts_with=samdodds/da-dk/c/'+this.$route.params.parentid+'/'+this.$route.params.categoryid, {
          version: version,
          cv: this.$store.getters.version
        })
      ]);
      this.story=sb.data.stories.length>0?sb.data.stories[0]:{ content: {} }
    } catch (err) {
      console.log('_team error')
      console.log(err);
      console.log(err.request);
    }

  },
  components:{
    ArticleTeamListByCategory,
    Page
  },
  data () {
    return {
      story: { content: {} },
      article: {},
      readmore: true,
      shop: ''
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
