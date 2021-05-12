<template>
  <div 
    v-editable="blok"
    class="uk-container"
    tabindex="-1"
    uk-slider>
    <ul 
      class="uk-slider-items uk-grid-small uk-grid-match" uk-grid>
      <li 
        class=""
        :class="{
            'uk-width-1-2@s uk-width-1-2@m  uk-width-1-2@l  uk-width-1-2@xl':blok.GameCenterBlocks.length==2,
            'uk-width-2-5@s uk-width-1-3@m  uk-width-1-3@l  uk-width-1-3@xl':blok.GameCenterBlocks.length==3,
            'uk-width-2-5@s uk-width-2-5@m  uk-width-1-4@l  uk-width-1-4@xl':blok.GameCenterBlocks.length>3,
            }"
        v-for="child in blok.GameCenterBlocks" 
        :key="child._uid">
        <component 
          :blok="child" 
          :is="child.component"/>
      </li>
    </ul>
  </div>
</template>

<script>
import GameCenterLatestNext from '@/components/samdodds/gamecenter/GameCenterLatestNext'
import GameCenterResultContest from '@/components/samdodds/gamecenter/GameCenterResultContest'
import GameCenterStandings from '@/components/samdodds/gamecenter/GameCenterStandings'
export default {
  components:{
    GameCenterLatestNext,
    GameCenterResultContest,
    GameCenterStandings,
  },
  props: {
    blok: {
      type: Object,
      required: true,
    }
  },
  mounted(){

  }
}
</script>
<style lang="scss">
</style>