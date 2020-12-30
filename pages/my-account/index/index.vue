<template>
  <section>
    <div class="uk-container">
      <h1>{{ $getCMSEntry(labels,'myAccount', 'Mitt konto') }}</h1>
      <div>
        <button 
          type="button"
          class="uk-button uk-button-default"
          @click.prevent="logOut()">
          {{ $getCMSEntry(labels,'btn-logout', 'Logga ut') }}
        </button>
      </div>
      <component 
        v-if="story.content.component" 
        :key="story.content._uid" 
        :blok="story.content" 
        :is="story.content.component" />
    </div>
  </section>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import Page from '@/components/Page'
import TextContent from '@/components/TextContent'

export default {
  
  head () {
    return {
      title: 'Mitt konto',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Mitt konto',
        },
        {
          hid: 'og:title',
          name:  'og:title',
          content: 'Mitt konto',
        },
        {
          hid: 'og:description',
          name:  'og:description',
          content: 'Mitt konto',
        }
      ]
    }
  },

  components: {
    Page,
    TextContent
  },

  async fetch () {
    try{
      let [storyblok] = await Promise.all([
          this.$axios.$get("https://api.storyblok.com/v1/cdn/datasource_entries?dimension="+this.$i18n.locale +"&datasource=fe-labels-myaccount&token="+process.env.STORYBLOK +"&cv="+this.$store.getters.version)
      ]);
      this.labels = storyblok.datasource_entries
    }catch(error){
      console.log(error);
    }
  },

  data () {
    return { 
      labels: [],
      story: { content: {SEO:{title:'',description:''}} },
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
  methods:{
    async logOut(){
      await this.$axios.post('webapi/'+this.$i18n.locale+'/Customer/PostLogout')
      this.$cookies.set('cid', null)
      this.$store.commit('setCid', null)
      this.$router.push(this.$root.context.app.localePath('/'))
    } 
  },
  asyncData (context) {
    // Check if we are in the editor mode
    let version = context.query._storyblok || context.isDev ? 'draft' : 'published'
    // Load the JSON from the API
    return context.app.$storyapi.get(`cdn/stories${process.env.STORYBLOK_CATALOGUE}/${context.app.i18n.locale}/my-account`, {
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

</style>