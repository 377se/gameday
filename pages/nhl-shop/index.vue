<template>
  <section>
    <template v-if="$fetchState.pending">
      <div class="uk-container uk-container-large uk-padding-small">
        <content-placeholders :rounded="true">
          <content-placeholders-img />
          <content-placeholders-heading />
        </content-placeholders>
        <div class="uk-grid uk-grid-small uk-child-width-1-2 uk-child-width-1-3@s uk-child-width-1-4@m uk-child-width-1-5@l">
          <content-placeholders 
            v-for="p in 20"
            :key="p"
            :rounded="true"
            class="uk-padding-small">
            <content-placeholders-img 
            class="ph-img"/>
            <content-placeholders-text :lines="2" />
          </content-placeholders>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="uk-container uk-container-large uk-padding-small">
        <ul class="uk-breadcrumb">
          <li>
            <nuxt-link :to="localePath('/')">
              <span style="vertical-align: bottom;
                margin-bottom: 2px;" uk-icon="icon:home;ratio:0.7"/></nuxt-link></li>
          <li><nuxt-link :to="localePath('/nhl-shop')">NHL-shop</nuxt-link></li>
        </ul>
      </div>
      <component 
        v-if="story.content.component" 
        :key="story.content._uid" 
        :blok="story.content" 
        :is="story.content.component" />
    </template>
  </section>
</template>
<script>
import Page from '@/components/Page'
export default {
  async fetch(){
  // Check if we are in the editor mode
    let version = this.$route.query._storyblok || this.$nuxt.context.isDev ? 'draft' : 'published'
    try {
      const [sb] = await Promise.all([
        this.$storyapi.get('cdn/stories?starts_with=' + process.env.STORYBLOK_CATALOGUE.replace('/','') + '/' +this.$i18n.locale+ '/nhl-shop', {
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
  fetchDelay: 0,
  activated() {
    if (this.$fetchState.timestamp <= Date.now() - 600000) {// Call fetch again if last fetch more than 60 sec ago
      this.$fetch()
    }
  },
  head () {
    if(this.story.content.SEO){
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
    }
  },
  components:{
    Page
  },
  data () {
    return {
      story: { content: {} }
    }
  }
}
</script>
<style lang="scss">

</style>
