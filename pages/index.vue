<template>
  <section>
    <SeoHead
      :title="this.story.content.SEO.title"
      :description="`${this.story.content.SEO.description}`.replace(/<\/?[^>]+(>|$)/g, '')"
      canonical=""
      :lang-hrefs="langHref"/>
    <div class="uk-container uk-container-large uk-padding-small"> 
      <component 
        v-if="story.content.component" 
        :key="story.content._uid" 
        :blok="story.content" 
        :is="story.content.component" />
    </div>
  </section>
</template>
<script>
import ArticleCardSimple from "@/components/articles/ArticleCardSimple";
import Page from '@/components/Page'

export default {
  cache: true,
  components:{
    ArticleCardSimple,
    Page
  },
  data () {
    return {
      story: { content: {SEO:{title:'',description:''}} },
      articles: [],
      productTypes: [],
      siteid: process.env.SITE_ID,
      langHref: process.env.LANG_HREF
    }
  },
  mounted () {
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
  async fetch () {
    // Check if we are in the editor mode
    let version = this.$nuxt.context.query._storyblok || this.$nuxt.context.isDev ? 'draft' : 'published'
    // Load the JSON from the API
    try{
      const [sb] = await Promise.all([
        this.$nuxt.context.app.$storyapi.get(`cdn/stories${process.env.STORYBLOK_CATALOGUE}/${this.$i18n.locale}/home`, {
        version: version,
        cv: this.$nuxt.context.store.getters.version
        })
        ]);
      this.story = sb.data.story
    }catch(res){
      if (!res.response) {
        console.error(res)
        this.$nuxt.context.error({ statusCode: 404, message: 'Failed to receive content form api' })
      } else {
        console.error(res.response.data)
        this.$nuxt.context.error({ statusCode: res.response.status, message: res.response.data })
      }
    }
  }
}
</script>
<style lang="scss">
</style>
