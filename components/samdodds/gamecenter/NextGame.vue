<template>
  <div>

      <div v-if="gameList" class="uk-alert-primary" uk-alert>

          <div v-for="game in gameList" :key="game.GameId">
          Nästa match:<br />
          v {{ game.Game}}<br />
          {{ game.GameDate}} {{ game.GameTime}}<br />
          {{ game.GameType.toUpperCase()}}<br />
        
        </div>
      </div>
    
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

//To be added to store. Top team list
export default {
  async fetch() {
    try {
      let [gameList] = await Promise.all([
          this.$axios.$get('/webapi/gamecenter/GetUpcomingGames')
      ]);
      this.gameList = gameList
    } catch (err) {
      console.log(err);
    }
  },
  data(){
    return{
      gameList: []
    }
  },
  computed: {
    ...mapGetters({
      global_labels:'labels'})
  },
  
};
</script>
