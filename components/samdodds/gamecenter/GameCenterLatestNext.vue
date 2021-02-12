<template>
    <div 
      v-editable="blok"
      class="uk-container gc-nextlastgame uk-border-rounded">
      <div class="gc-nextlastgame-container uk-padding-small">
        <div v-if="this.showHeading" class="gc-headline">NÄSTA MATCH</div>
      </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    props: {
      blok: {
        type: Object,
        required: true,
      }
    },
    async fetch() {
    try {
      let [lastGame, gameList] = await Promise.all([
          this.$axios.$get('/webapi/gamecenter/GetLastGame'),
          this.$axios.$get('/webapi/gamecenter/GetUpcomingGames?numberOfGames='+this.numberOfGames)
      ]);
      this.lastGame = lastGame
      this.gameList = gameList
    } catch (err) {
      console.log(err);
    }
  },
  data(){
    return{
      homeTeam: 'Liverpool',
      gameList: [],
      lastGame: {},
      isLatest: this.blok.isLatest,
      numberOfGames: this.blok.numberOfGames,
      showHeading: this.blok.showHeading,
    }
  },
  computed: {
    ...mapGetters({
      global_labels:'labels'})
  },
}
</script>
<style lang="scss">
.gc-nextlastgame {
  background: url("/backgrounds/background-gradient-red.svg") center;
}
.gc-headline {
  background-color: transparent;
  color: #fff;
  font-family: Oswald;
  font-size: 2.3rem;
  margin: 0 0 0.3em 0;
  line-height: 1;
  font-weight: bold;
}
</style>