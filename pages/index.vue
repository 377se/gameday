<template>
  <section>
    <div class="uk-container uk-container-large uk-padding-small"> 
      <div 
        v-if="siteid==6"
        class="promo-squares uk-text-center uk-flex"
        style="margin-top:-15px;">
        <nuxt-link 
          class="gd-square"
          :to="localePath('/nhl-shop')">
          <div>
            <img src="/logos/nhl_ikon_600x600.png" alt="NHL Shop">
            <br>Hockey
          </div>
        </nuxt-link>
        <nuxt-link 
          class="gd-square"
          :to="localePath('/nfl-shop')">
          <div>
            <img src="/logos/nfl_ikon_600x600.png" alt="NFL Shop">
            <br>Am. Fotboll
          </div>
        </nuxt-link>
        <nuxt-link 
          class="gd-square"
          :to="localePath('/nba-shop')">
          <div>
            <img src="/logos/nba_ikon_600x600.png" alt="NBA Shop">
            <br>Basket
          </div>
        </nuxt-link>
        <nuxt-link 
          class="gd-square"
          :to="localePath('/mlb-shop')">
          <div>
            <img src="/logos/mlb_ikon_600x600.png" alt="MLB Shop">
            <br>Baseball
          </div>
        </nuxt-link>
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
import ArticleCardSimple from "@/components/articles/ArticleCardSimple";
import Page from '@/components/Page'
import NextGame from "@/components/samdodds/gamecenter/NextGame";

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
    Page,
    NextGame

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
  async fetch () {
    // Check if we are in the editor mode
    let version = this.$nuxt.context.query._storyblok || this.$nuxt.context.isDev ? 'draft' : 'published'
    // Load the JSON from the API
    try{
      var sb = await this.$nuxt.context.app.$storyapi.get(`cdn/stories${process.env.STORYBLOK_CATALOGUE}${this.$route.path}/home`, {
        version: version,
        cv: this.$nuxt.context.store.getters.version
      })
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
.promo-squares{
  background:#002A32;
  justify-content: center;
  align-items: center;
  display: flex;
  margin-right:-15px;
  margin-left:-15px;
  
}
.promo-squares a{
  color: #00CCFF;
  text-transform:uppercase;
  white-space:nowrap;
  font-size:0.4rem;
  @media (min-width: 480px) { 
      font-size: 0.7rem;
  }
}
.gd-square{
  position:relative;
  width:25%;
  max-width:100px;
  padding:10px 0px 10px 8px;
  justify-content: center;
  align-items: center;
  display: flex;
  background:#002A32;
  margin:2px;
  color:#fff;
  text-decoration: none !important;
  &:last-child{
    padding-right:8px;
  }
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
