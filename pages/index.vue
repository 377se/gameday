<template>
  <section>
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
    let _link = new Array()
    let _lhref = {}
    
    if(this.metadata){
      for(var i=0;i<this.metadata.LangHref.length;i++){
        let _obj = {
                    'hid':'i18n-alt-'+this.metadata.LangHref[i].Culture.split('-')[0],
                    'rel': 'alternate',
                    'href': this.metadata.LangHref[i].Url,
                    'hreflang': this.metadata.LangHref[i].Culture.split('-')[0]
                  }
        if(this.siteid!=2 || (this.siteid==2 && this.metadata.LangHref[i].Culture!='en-gb')){
          _link.push(_obj)
        }
        if(this.metadata.LangHref[i].Culture==this.$i18n.defaultLocale){
          let _obj = {
                    'hid':'i18n-xd',
                    'rel': 'alternate',
                    'href': process.env.X_DEFAULT,
                    'hreflang': 'x-default'
                  }
          _link.push(_obj)
        }
      }

      _link.push(
        {
          rel: 'canonical',
          hid: 'i18n-can',
          href: this.metadata.Canonical
        }
      )
    }
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
        ],
        link: _link
      }
    }else{
      return {
        link: _link
      }
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
      productTypes: [],
      siteid: process.env.SITE_ID
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
    if(this.siteid==1){
      this.metadata = {"Canonical":"https://supportersplace.com","LangHref":[{"Culture":"sv-se","Url":"https://supportersplace.se"},{"Culture":"nb-no","Url":"https://supportersplace.com/nb-no"},{"Culture":"da-dk","Url":"https://supportersplace.com/da-dk"},{"Culture":"en","Url":"https://supportersplace.com/en"},{"Culture":"fi-fi","Url":"https://supportersplace.fi"}]}
    }
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
