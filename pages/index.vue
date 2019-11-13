<template>
  <section>
    <div 
      v-if="false"
      uk-slideshow>
      <ul class="uk-slideshow-items">
        <li 
          class="uk-text-center">
            30 dagars öppet köp!
        </li>
        <li 
          class="uk-text-center">
            Fria returer!
        </li>
        <li 
          class="uk-text-center">
            Snabba leveranser!
        </li>
      </ul>
    </div>
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
  head () {
    return {
      title: this.story.content.SEO.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.story.content.SEO.description
        }
      ]
    }
  },
  components:{
    ArticleCardSimple,
    Page

  },
  data () {
    return {
      story: { content: {SEO:{title:'',description:''}} },
      articles: [],
      productTypes: []
    }
  },
  mounted () {
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
  asyncData (context) {
    // Check if we are in the editor mode
    let version = context.query._storyblok || context.isDev ? 'draft' : 'published'
    // Load the JSON from the API
    return context.app.$storyapi.get(`cdn/stories/home`, {
      version: version,
      cv: context.store.getters.version
    }).then((res) => {
      return res.data
    }).catch((res) => {
      if (!res.response) {
        console.error(res)
        context.error({ statusCode: 404, message: 'Failed to receive content form api' })
      } else {
        console.error(res.response.data)
        context.error({ statusCode: res.response.status, message: res.response.data })
      }
    })
  }
}
</script>
<style lang="scss">
@import '~/assets/scss/vars.scss';
</style>
