<template>
  <div>
    <component 
      v-if="story.content.component" 
      :key="story.content._uid" 
      :blok="story.content" 
      :is="story.content.component" />
  </div>
</template>

<script>
import Page from '@/components/Page'

export default {
  head () {
    return {
      title: `${this.story.content.SEO.title}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `${this.story.content.SEO.description}`.replace(/<\/?[^>]+(>|$)/g, ""),
        },
        {
          hid: 'og:title',
          name:  'og:title',
          content:  `${this.story.content.SEO.title}`,
        },
        {
          hid: 'og:description',
          name:  'og:description',
          content: `${this.story.content.SEO.description}`.replace(/<\/?[^>]+(>|$)/g, ""),
        }
      ]
    }
  },
  components: {
    Page
  },
  data () {
    return {story: { content: {SEO:{title:'',description:''}} }}
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
  asyncData (context) {
    // Check if we are in the editor mode
    let version = context.query._storyblok || context.isDev ? 'draft' : 'published'
    // Load the JSON from the API
    return context.app.$storyapi.get(`cdn/stories/404`, {
      version: version,
      cv: context.store.getters.version
    }).then((res) => {
      return res.data
    }).catch((res) => {
      if (!res.response) {
        console.error(res)
        context.error({ statusCode: 404, message: 'Failed to receive content from api' })
      } else {
        console.error(res.response.data)
        context.error({ statusCode: res.response.status, message: res.response.data })
      }
    })
  }
};
</script>

<style lang="scss">

</style>
