<template>
  <section>
    <template v-if="$fetchState.pending">
      <content-placeholders-img />
      <content-placeholders-text :lines="4" />
    </template>
    <template v-else>
      <div class="uk-container">
        <h1>{{ $getCMSEntry(labels,'coins', 'Coins') }}</h1>
        
        {{ $getCMSEntry(labels,'numberOfCoins', 'Antal coins:') }} {{ coins.CoinsValue }}
        <div v-if="coins.CoinsValue > 0">
          {{ $getCMSEntry(labels,'coinsValidThru', 'Giltiga t.o.m.:') }} {{ coins.ExpirationDate }}
        </div>
        <component 
          v-if="story.content.component" 
          :key="story.content._uid" 
          :blok="story.content" 
          :is="story.content.component" />
      </div>
    </template>
  </section>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
import Page from '@/components/Page'
import TextContent from '@/components/TextContent'

export default {
  head () {
    return {
      title: 'Coins',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Coins',
        },
        {
          hid: 'og:title',
          name:  'og:title',
          content: 'Coins',
        },
        {
          hid: 'og:description',
          name:  'og:description',
          content: 'Coins',
        }
      ]
    }
  },
  components: {
    Page,
    TextContent
  },
  activated(){
    this.$fetch()
  },
  data () {
    return { 
      labels: [],
      story: { content: {} },
      coins: {CoinsValue:0, ExpirationDate:''}
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
    try{
      let [storyblok] = await Promise.all([
          this.$axios.$get("https://api.storyblok.com/v1/cdn/datasource_entries?dimension="+this.$i18n.locale +"&datasource=fe-labels-myaccount&token="+process.env.STORYBLOK +"&cv="+this.$store.getters.version)
      ]);
      this.labels = storyblok.datasource_entries
    }catch(error){
      console.log(error);
    }
    const [c, s] = await Promise.all([
        await this.$nuxt.context.app.$axios.$get(
          '/webapi/'+this.$i18n.locale+'/Coins/GetCoins'
        ),
        await this.$nuxt.context.app.$storyapi.get(`cdn/stories${process.env.STORYBLOK_CATALOGUE}/${this.$i18n.locale}/my-account/coins`, {
          version: version,
          cv: this.$nuxt.context.store.getters.version
        })
      ]);
      this.coins = c
      this.story = s.data.story
    } catch (err) {
      console.log(err);
      console.log(err.request);
    }
  }
}
</script>
<style lang="scss">

</style>