<template>
<!-- LATEST GAME -->
  <div v-if="isLatest" class="uk-container next-game">
         {{numberOfGames}}
      <h3>Senaste match</h3>
    <div 
      class="uk-position-relative uk-background-primary uk-margin-large-bottom uk-border-rounded"
      tabindex="-1"
      uk-slider>
      <div>
        <div class="uk-width-1-1 uk-padding">
          <div class="game-container">
            <!-- TEAMS & GOALS -->
            <div class="first-row">
              <div class="team-and-goals"> <!-- HOME-TEAM -->
                <div v-if="!lastGame.IsAwayGame" class="team"><img :src="lastGame.LiverpoolCrest" /><p>{{ homeTeam }}</p></div>
                <div v-else class="team"><img :src="lastGame.OpponentCrest" /><p>{{ lastGame.Opponent}}</p></div>
                <div v-if="!lastGame.IsAwayGame" class="goals"><p>{{ lastGame.HomeGoals }}</p></div>
                <div v-else class="goals"><p>{{ lastGame.AwayGoals }}</p></div>
              </div>
              <div class="team-and-goals"> <!-- AWAY-TEAM -->
                <div v-if="!lastGame.IsAwayGame" class="goals"><p>{{ lastGame.AwayGoals }}</p></div>
                <div v-else class="goals"><p>{{ lastGame.HomeGoals }}</p></div>
                <div v-if="!lastGame.IsAwayGame" class="team"><img :src="lastGame.OpponentCrest" /><p>{{ lastGame.Opponent}}</p></div>
                <div v-else class="team"><img :src="lastGame.LiverpoolCrest" /><p>{{ homeTeam }}</p></div>
              </div>
            </div>
            <div class="uk-flex uk-flex-middle"> <!-- GAME-INFO -->
                <div class="uk-flex uk-flex-middle uk-flex-center loc-info uk-width-1-4"> <!-- DATE -->
                  <img class="uk-width-1-6" src="/icons/calendar.svg">
                  <div style="text-transform: capitalize">
                    {{ lastGame.GameDate }}
                  </div>
                </div>
                <div class="uk-flex uk-flex-middle uk-flex-center loc-info uk-width-1-4"> <!-- TIME -->
                  <img class="uk-width-1-6" src="/icons/time.svg">
                  <div>
                    {{ lastGame.GameTime }}
                  </div>
                </div>
                <div class="uk-flex uk-flex-middle uk-flex-center loc-info uk-width-1-4"> <!-- ARENA -->
                  <img class="uk-width-1-6" src="/icons/soccer-field.svg">
                  <div>
                    {{ lastGame.Arena }}
                  </div>
                </div>
                <div class="uk-flex uk-flex-middle uk-flex-center loc-info uk-width-1-4"> <!-- LEAGUE -->
                  <img class="uk-width-1-6" src="/icons/trophy.svg">
                  <div>
                    {{ lastGame.GameType }}
                  </div>
                </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  </div>
<!-- NEXT GAME -->
  <div v-else class="uk-container next-game">
    {{isLatest}}
      <h3>Nästa match</h3>
    <div 
      class="next-game-slider uk-position-relative uk-background-primary uk-margin-large-bottom uk-border-rounded"
      tabindex="-1"
      uk-slider>
      <ul class="uk-slider-items">
        <li class="uk-width-1-1 uk-padding"
          v-for="game in gameList" :key="game.GameId">

          <div class="game-container">

            <!-- TEAMS & GOALS -->
            <div class="first-row">
              <div class="team-and-goals"> <!-- HOME-TEAM -->
                <div v-if="!game.IsAwayGame" class="team"><img :src="game.LiverpoolCrest" /><p>{{ homeTeam }}</p></div>
                <div v-else class="team"><img :src="game.OpponentCrest" /><p>{{ game.Opponent}}</p></div>
                <div class="goals"><p>-</p></div>
              </div>
              <div class="team-and-goals"> <!-- AWAY-TEAM -->
                <div class="goals"><p>-</p></div>
                <div v-if="!game.IsAwayGame" class="team"><img :src="game.OpponentCrest" /><p>{{ game.Opponent}}</p></div>
                <div v-else class="team"><img :src="game.LiverpoolCrest" /><p>{{ homeTeam }}</p></div>
              </div>
            </div>
            <div class="uk-flex uk-flex-middle"> <!-- GAME-INFO -->
                <div class="uk-flex uk-flex-middle uk-flex-center loc-info uk-width-1-4"> <!-- DATE -->
                  <img class="uk-width-1-6" src="/icons/calendar.svg">
                  <div style="text-transform: capitalize">
                    {{ game.GameDate }}
                  </div>
                </div>
                <div class="uk-flex uk-flex-middle uk-flex-center loc-info uk-width-1-4"> <!-- TIME -->
                  <img class="uk-width-1-6" src="/icons/time.svg">
                  <div>
                    {{ game.GameTime }}
                  </div>
                </div>
                <div class="uk-flex uk-flex-middle uk-flex-center loc-info uk-width-1-4"> <!-- ARENA -->
                  <img class="uk-width-1-6" src="/icons/soccer-field.svg">
                  <div>
                    {{ game.Arena }}
                  </div>
                </div>
                <div class="uk-flex uk-flex-middle uk-flex-center loc-info uk-width-1-4"> <!-- LEAGUE -->
                  <img class="uk-width-1-6" src="/icons/trophy.svg">
                  <div>
                    {{ game.GameType }}
                  </div>
                </div>
            </div>
          </div>

        </li>
      </ul>
      <a class="uk-position-center-left uk-position-small uk-hidden-hover" href="#" uk-slidenav-previous uk-slider-item="previous"></a>
        <a class="uk-position-center-right uk-position-small uk-hidden-hover" href="#" uk-slidenav-next uk-slider-item="next"></a>
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
      numberOfGames: this.blok.numberOfGames      
    }
  },
  computed: {
    ...mapGetters({
      global_labels:'labels'})
  },
}
</script>
<style lang="scss">
  .next-game, .next-game a {
    color: #fff;
  }
  .next-game a:hover {
    text-decoration: underline;
  }
  .next-game-slider {
    overflow: hidden;
  }
  .next-game > h3 {
    margin-bottom: 0.5rem;
  }
  .game-container {
    display: grid;
    grid-template-rows: 6fr 3fr;
    justify-items: space-around;
    align-items: center;
    gap: 1.2em;
    font-size: 2.5vw;
  }
  .first-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3em;
    justify-content: center ;
    align-items: center;
    font-size: 1em;
  }
  .team-and-goals {
    display: flex;
    align-items: center;
    font-size: 1em;
  }
  .team-and-goals:nth-child(1) {
    justify-content: flex-end;
  }
  .goals {
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;
    width: 3.8em;
    height: 3.8em;
    max-width: 75px;
    max-height: 75px;
    background-color: #fa6900;
    border-radius: 50%;
    margin-bottom: 5px;
    & p {
      margin: 0;
      font-family: "Lato",sans-serif;
      font-size: 2.3em;
      line-height: 1.7;
      font-weight: bolder;
    }
    @media screen and (min-width: 735px) {
      & p {
        font-size: 45px;
      }
    }
  }
  .team {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: "Lato",sans-serif;
    font-size: 1em;
    margin: 0 1em;
    line-height: 1;
    & img {
      align-self: center;
      height: 3.5em;
      max-height: 57px;
      -webkit-filter: drop-shadow(0px 5px 5px rgba(34, 34, 34, 0.63));
      filter:         drop-shadow(0px 5px 5px rgba(34, 34, 34, 0.63));
    }
    & p {
      margin: 5px 0 0 0;
      align-self: flex-start;
    }
    @media screen and (min-width: 735px) {
    & p {
      font-size: 18px;
    }
    }
  }
  .loc-info {
    font-size: 1em;
    line-height: 1;
    & img {
      margin-right: 0.4em;
    }
    @media screen and (min-width: 735px) {
      & div {
        font-size: 18px;
      }
      & img {
        width: 30px;
      }
    }
  }
</style>