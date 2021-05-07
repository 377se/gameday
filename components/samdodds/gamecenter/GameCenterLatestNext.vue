<template>
    <div
      v-editable="blok"
      class="uk-container gc-nextlastgame uk-border-rounded uk-margin-small-bottom uk-grid-item-match">
      <div class="uk-flex uk-flex-column uk-padding-small">
        <div v-if="this.showHeading" class="gc-nextprev-headline">
          {{ this.isLatest ? 'FÖREGÅENDE MATCH' : 'NÄSTA MATCH' }}
        </div>
        <!-- <div tabindex="-1" uk-slider>
          <ul class="uk-slider-items">
            <li class="uk-width-1-1" v-for="game in games" :key="game.GameId"> -->
              <div class="gc-nextlastgame-outer-container uk-flex uk-flex-column uk-flex-center">
                <div class="goal-info uk-flex uk-flex-around uk-flex-middle uk-flex-center"> <!-- GOAL-INFO -->
                  <div class="uk-flex uk-flex-middle"> <!-- LEFT-TEAM -->
                    <div class="uk-flex uk-flex-column uk-flex-middle"> <!-- CREST + NAME -->
                      <div class="crests"><img :src="game.LiverpoolCrest" /></div>
                      <div>{{ homeTeam }}</div>
                    </div>
                    <div class="goals uk-margin-small-left uk-flex uk-flex-center">{{ this.isLatest ? game.HomeGoals : '-' }}</div> <!-- GOALS -->
                  </div>
                  <div class="uk-flex uk-flex-middle"> <!-- RIGHT-TEAM -->
                    <div class="goals uk-margin-small-right uk-flex uk-flex-center">{{ this.isLatest ? game.AwayGoals : '-' }}</div> <!-- GOALS -->
                    <div class="uk-flex uk-flex-column uk-flex-middle"> <!-- CREST + NAME -->
                      <div class="crests"><img :src="game.OpponentCrest" /></div>
                      <div>{{ game.Opponent }}</div>
                    </div>
                  </div>
                </div>
                <div class="divider"></div>
                <div class="game-info uk-flex uk-flex-around uk-flex-middle uk-flex-center"> <!-- GAME-INFO -->
                  <div class="uk-flex uk-flex-center uk-width-1-4" v-html="addLineBreaks(game.GameDate)"></div>
                  <div class="uk-flex uk-flex-center uk-width-1-4 uk-flex-middle">
                    <div>{{ game.GameTime }}</div>
                  </div>
                  <div class="uk-flex uk-flex-center uk-width-1-4 uk-flex-middle">
                    <!-- <img class="icons" src="/icons/soccer-field-black.svg"> -->
                    <div v-html="addLineBreaks(game.Arena)"></div>
                  </div>
                  <div class="uk-flex uk-flex-center uk-width-1-4" v-html="addLineBreaks(game.GameType)">
                  </div>
                </div>
              </div>
            <!-- </li>
          </ul>
        </div> -->
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
    game: function () {
      return this.isLatest ? this.lastGame : this.gameList[0]
    }
  },
  methods: {
    addLineBreaks(oldText) {
      const reg = /(?<!\d) /g
      const newText = oldText.replace(reg, '<br />')
      return newText
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
}
</script>
<style lang="scss">
  .gc-nextlastgame {
    background: rgb(242,241,241);
    background: radial-gradient(circle, rgba(242,241,241,1) 0%, rgba(228,227,227,1) 46%, rgba(175,175,175,1) 100%);
    font-family: 'Oswald';
    font-size: 1rem;
  }
  @media only screen and (max-width: 700px) and (min-width: 640px) {
    .gc-nextlastgame {
      font-size: 0.9rem;
    }
  }
  .gc-nextprev-headline {
    background-color: transparent;
    color: rgb(0, 0, 0);
    font-family: Oswald;
    font-size: 1.2rem;
    margin: 0 0 0.3em 0;
    line-height: 1;
    font-weight: bold;
    padding-bottom: 3px;
  }
  .gc-nextlastgame-outer-container {
    width: 100%;
    height: 100%;
  }
  .goal-info {
    margin: 0 0 10px 0;
  }
  @media only screen and (min-width: 1000px) {
    .goal-info {
      margin: 0 150px 10px 150px;
    }
  }
  .goals {
    width: 1.4em;
    height: 1.4em;
    font-size: 1.8em;
    line-height: 1.34;
    border: 4px solid white;
    border-radius: 50%;
    margin-left: 5px;
    margin-right: 5px;
  }
  .crests {
    width: 2.8em;
  }
  .divider {
    background-color: rgb(201, 201, 201);
    height: 2px;
    width: 100%;
  }
  .game-info {
    margin: 10px 0 0 0;
    line-height: 1;
  }
  @media only screen and (min-width: 1000px) {
    .game-info {
      margin: 10px 150px 0 150px;
    }
  }
  .icons {
    width: 17px;
    margin-right: 4px;
  }
</style>