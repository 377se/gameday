<template>
  <section>
    <component 
      v-if="story.content.component" 
      :key="story.content._uid" 
      :blok="story.content" 
      :is="story.content.component"
      :remove-padding="true" />
  </section>
</template>


<script>
import Page from '@/components/Page'
import TextContent from '@/components/TextContent'

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
    Page,
    TextContent
  },
  data () {
    return { story: { content: {SEO:{title:'',description:''}} } }
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
    let version = this.$route.query._storyblok || this.$nuxt.context.isDev ? 'draft' : 'published'
    // Load the JSON from the API
    try {
      const [sb] = await Promise.all([
        this.$storyapi.get(`cdn/stories${process.env.STORYBLOK_CATALOGUE}/${this.$i18n.locale}/streetweek/`, {
          version: version,
          cv: this.$store.getters.version
        })
      ]);
      this.story=sb.data.story
    } catch (err) {
      if (!err.response) {
        console.error(err)
        this.$nuxt.context.error({ statusCode: 404, message: 'Failed to receive content form api' })
      } else {
        console.error(err.response.data)
        this.$nuxt.context.error({ statusCode: err.response.status, message: err.response.data })
      }
    }
  }
}
</script>

<style scoped>

</style>

