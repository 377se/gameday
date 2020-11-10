<template>
  <section class="uk-position-relative">
    <div class="uk-container uk-container-large uk-padding-small">
      <ul class="uk-breadcrumb">
        <li>
          <nuxt-link :to="localePath('/')">
            <span style="vertical-align: bottom;
              margin-bottom: 2px;" uk-icon="icon:home;ratio:0.7"/></nuxt-link></li>
        <li>
          <span>{{ $route.params.name }}</span>
        </li>
      </ul>
    </div>
    <!--component 
      v-if="story.content.component" 
      :key="story.content._uid" 
      :blok="story.content" 
      :is="story.content.component" /-->
    <div
      class="uk-container uk-container-large uk-padding-small">
      <ArticleBrandList />
    </div>
  </section>
</template>
<script>
import ArticleBrandList from "@/components/articles/ArticleBrandList";
import Page from '@/components/Page'

export default {
  async fetch () {
    // Check if we are in the editor mode
    /*let version = this.$route.query._storyblok || this.$nuxt.context.isDev ? 'draft' : 'published'
    let shop = this.$route.params.league.toUpperCase()+'-shop'
    try {
      const [sb] = await Promise.all([
        this.$storyapi.get('cdn/stories?starts_with=gameday/'+this.$i18n.locale+this.$route.path, {
          version: version,
          cv: this.$store.getters.version
        })
      ]);
      this.shop=shop
      this.story=sb.data.stories.length>0?sb.data.stories[0]:{ content: {} }
    } catch (err) {
      console.log('_produkttyp error')
      console.log(err);
      console.log(err.request);
    }*/

  },
  beforeRouteUpdate(to, from, next){
    try{
      UIkit.util.on('#filter-menu', 'hide', function () {
          UIkit.modal('#filter-menu').$destroy(true)
      });
      UIkit.modal('#filter-menu').hide()
      
    }catch(err){console.log(err)}
    next()
  },
  components:{
    ArticleBrandList,
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
