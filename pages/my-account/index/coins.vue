<template>
  <section>
    <div class="uk-container">
      <h3>Coins</h3>
     
      Antal coins: {{ coins.CoinsValue }}<br />
      Giltiga t.o.m.: {{ coins.ExpirationDate }}
      <component 
        v-if="story.content.component" 
        :key="story.content._uid" 
        :blok="story.content" 
        :is="story.content.component" />
    </div>
  </section>
</template>
<script>
import Page from '@/components/Page'
import TextContent from '@/components/TextContent'

export default {
  components: {
    Page,
    TextContent
  },
  data () {
    return { 
      story: { content: {} },
      coins: {CoinsValue:0, ExpirationDate:''}
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
  async asyncData (context) {
    // Check if we are in the editor mode
    let version = context.query._storyblok || context.isDev ? 'draft' : 'published'
    // Load the JSON from the API
    try{
    const [c, s] = await Promise.all([
        await context.app.$axios.$get(
          '/webapi/Coins/GetCoins'
        ),
        await context.app.$storyapi.get(`cdn/stories/my-account/coins`, {
          version: version,
          cv: 2
        })
      ]);
      return {
        coins: c,
        story: s.data.story
      };
    } catch (err) {
      console.log(err);
      console.log(err.request);
    }
  }
}
</script>
<style lang="scss">

</style>