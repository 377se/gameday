<template>
  <div 
    v-editable="blok"
    class="uk-container uk-container-large uk-padding-small">
    <component 
      v-for="child in blok.body" :key="child._uid" :blok="child" :is="child.component"
      :sb="true"/>
  </div>
</template>

<script>
import TextContent from '@/components/TextContent'
import article_team_list from "@/components/articles/ArticleTeamList";
import TeamList from "@/components/TeamList";
import ArticleTeamListByCategory from "@/components/articles/ArticleTeamListByCategory";
import promo from '@/components/promo/Promo'

import promo_list from '@/components/promo/PromoList'

import links_block from '@/components/blocks/LinksBlock'

import products_list from '@/components/promo/ProductsList'
import products_list_by_id from '@/components/promo/ProductsListByCategoryId'
import promo_button from '@/components/promo/PromoButton'
import PromoTextual from '@/components/promo/PromoTextual'

import editorial_header from '@/components/editorial/Header'
import editorial_text from '@/components/editorial/Text'
import editorial_image from '@/components/editorial/Image'
import editorial_youtube from '@/components/editorial/Youtube'
import editorial_quote from '@/components/editorial/Quote'
import image_list from '@/components/editorial/ImageList'

import GameCenterLatestNext from '@/components/samdodds/gamecenter/GameCenterLatestNext'
import GameCenterStandings from '@/components/samdodds/gamecenter/GameCenterStandings'
import GameCenterResultContest from '@/components/samdodds/gamecenter/GameCenterResultContest'


export default {
  components: {
    TextContent,
    TeamList,
    article_team_list,
    ArticleTeamListByCategory,
    promo,
    PromoTextual,
    promo_list,
    links_block,
    products_list,
    products_list_by_id,
    promo_button,
    editorial_header,
    editorial_text,
    editorial_image,
    editorial_youtube,
    editorial_quote,
    image_list,
    GameCenterLatestNext,
    GameCenterStandings,
    GameCenterResultContest
  },
  props: {
    blok: {
      type: Object,
      required: true,
    }
  },
  data(){
    return {
      readmore: true,
      isLatest: true,
      numberOfGames: 1
    }
  },
  methods:{
    setReadMore(){
      this.readmore = false
    }
  }
}
</script>