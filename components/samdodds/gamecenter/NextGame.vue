<template>
  <div>

      <div v-if="game" class="uk-alert-primary" uk-alert>
        Nästa match:<br />
        v {{ game.Opponent}} {{ game.Arena}}<br />
        {{ game.GameDate}} {{ game.GameTime}}<br />
        {{ game.GameType.toUpperCase()}}<br />
      
      </div>
    
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

//To be added to store. Top team list
export default {
  async fetch() {
    try {
      let [game] = await Promise.all([
          this.$axios.$get('/webapi/gamecenter/GetNextGame')
      ]);
      this.game = game
    } catch (err) {
      console.log(err);
    }
  },
  data(){
    return{
      game: []
    }
  },
  computed: {
    ...mapGetters({
      global_labels:'labels'})
  },
  
};
</script>
