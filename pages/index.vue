<template>
  <section>
    <div class="uk-container uk-container-large uk-padding-small"> 
      <h3>Våra shoppar</h3>
      <div class="promo-squares uk-flex">
        <nuxt-link 
          class="gd-square"
          to="/nhl-shop">
          <div>
            <img src="/logos/nhl_logo.png" alt="NHL Shop">
          </div>
        </nuxt-link>
        <nuxt-link 
          class="gd-square"
          to="/nfl-shop">
          <div>
            <img src="/logos/nfl_logo.png" alt="NFL Shop">
          </div>
        </nuxt-link>
        <nuxt-link 
          class="gd-square"
          to="/nba-shop">
          <div>
            <img src="/logos/nba_logo.png" alt="NBA Shop">
          </div>
        </nuxt-link>
        <nuxt-link 
          class="gd-square"
          to="/mlb-shop">
          <div>
            <img src="/logos/mlb_logo.png" alt="MLB Shop">
          </div>
        </nuxt-link>
      </div>
      <h3>Utvalda favoriter</h3>
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
.promo-squares{
  background:#002A32;
  justify-content: center;
  align-items: center;
  display: flex;
  margin-right:-15px;
  margin-left:-15px;
}
.gd-square{
  position:relative;
  width:25%;
  max-width:100px;
  padding:20px;
  justify-content: center;
  align-items: center;
  display: flex;
  background:#002A32;
  margin:2px;
  color:#fff;
  text-decoration: none !important;
  &:hover, &:active{
    color:#fff;
  }
  & > div > img{
    width:70px;
  }
  & > div > span{
    margin-top:5px;
    font-weight:bold;
    font-size:0.85rem;
  }
}
.gd-square:after{
  content: '';
  display: block;
  padding-bottom: 100%;
}
</style>
