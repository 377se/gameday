<template>
  <section>
    <div class="uk-container">
      <component 
        v-if="story.content.component" 
        :key="story.content._uid" 
        :blok="story.content" 
        :is="story.content.component" />
      <div class="uk-padding">
        <h1>Du har fått 350kr att handla varor för!</h1>
        <h2>Har du konto hos oss redan?</h2>
        <p>Då har vi fyllt på det med 350 coins som automatiskt dras av i varukorgen när du handlar.</p>
        <p>Logga in med den email vi skickat den här länken till och det lösenord du valt sedan tidigare</p>
        <p><nuxt-link
              :to="localePath('/login')"
              class="uk-button uk-button-primary">Logga in</nuxt-link></p>

        <h2>Har du inte ett konto sedan tidigare?</h2>
        <p>Då har vi skapat ett konto åt dig och fyllt det med 350kr!</p>
        <p>Du behöver bara hämta ett nytt lösenord kopplat till den email du fått den här länken genom.</p>
        <p><nuxt-link
              :to="localePath('/forgotten-password')"
              class="uk-button uk-button-primary">Hämta nytt lösenord här</nuxt-link></p>
      </div>
    </div>
  </section>
</template>


<script>
import Page from '@/components/Page'
import TextContent from '@/components/TextContent'

export default {
  async fetch () {
    // Check if we are in the editor mode
    let version = this.$route.query._storyblok || this.$nuxt.context.isDev ? 'draft' : 'published'
    try {
      const [sb] = await Promise.all([
        this.$storyapi.get(`cdn/stories${process.env.STORYBLOK_CATALOGUE}/${this.$i18n.locale}/campaign/strim`, {
          version: version,
          cv: this.$store.getters.version
        })
      ]);
      this.story=sb.data.story
    } catch (err) {
      console.log(err);
      console.log(err.request);
    }
  },
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
  components: {
    Page,
    TextContent
  },
  data () {
    return { story: { content: {SEO:{title:'', description:''}} } }
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
  }
}
</script>

<style scoped>

</style>

