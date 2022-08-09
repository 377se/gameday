<template>
  <section>
    <div class="uk-container">
      <component 
        v-if="story.content.component" 
        :key="story.content._uid" 
        :blok="story.content" 
        :is="story.content.component" />
      <div class="uk-padding">
        <h1>Du har fått 350 kr å handle souvenirer for! </h1>
        <p>
          I forbindelse med at du har opprettet abonnement hos Strim sender vi deg 350 kr til å handle varer for i KopShop.no 
Vi fylt på din konto med 350 kr som automatisk trekkes fra i handlekurven. «Pengene» må brukes innen 12 måneder. 
        </p>
        <h2>Har du allerede konto hos oss? </h2>
        <p>Vi har fylt opp din konto med 350 kr som automatisk trekkes når du kommer til handlekurven. </p>
        <p>Logg på med e-posten vi sendte denne lenken til og det passordet du tidligere har brukt. </p>
        <p><nuxt-link
              :to="localePath('/login')"
              class="uk-button uk-button-primary">Logge inn </nuxt-link></p>

        <h2>Har du ikke konto fra før? </h2>
        <p>Vi har opprettet konto for deg. Du trenger bare å opprette passord knyttet til denne e-posten du har mottatt denne lenken til.</p>
        <p><nuxt-link
              :to="localePath('/forgotten-password')"
              class="uk-button uk-button-primary">Hent nytt passord her </nuxt-link></p>
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

