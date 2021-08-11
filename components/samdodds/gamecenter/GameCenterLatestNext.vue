<template>
    <div v-editable="blok" v-if="game">
      <div class="uk-position-relative uk-height-1-1">
        
        <div v-if="!cardIsFlipped" class="uk-margin-small-bottom gc-nextlastgame uk-border-rounded flip-card uk-flex uk-flex-column uk-padding-small uk-width-1-1 uk-height-1-1 uk-position-relative"> <!-- FRONT -->
            <div v-if="isLatest"><span @click="cardIsFlipped = !cardIsFlipped" uk-icon="info" class="cursor uk-position-absolute" style="top:5px; right:5px;"></span></div>
            <div v-if="this.showHeading" class="gc-nextprev-headline uk-flex uk-flex-middle uk-flex-middle uk-flex-between"> <!-- HEADLINE -->
              <div>{{ this.isLatest ? 'FÖREGÅENDE MATCH' : 'NÄSTA MATCH' }}</div>
            </div>
            <div class="gc-nextlastgame-outer-container uk-flex uk-flex-column uk-flex-center"> <!-- CONTENT -->
                <div class="goal-info uk-flex uk-flex-middle uk-flex-center uk-flex-around uk-margin-small-left uk-margin-small-right"> <!-- GOAL-INFO -->
                  <div class="uk-flex uk-flex-middle"> <!-- LEFT-TEAM -->
                    <div class="uk-flex uk-flex-column uk-flex-middle uk-flex-1">
                      <div class="crests"><img :src="game.HomeCrest" /></div> <!-- CREST -->
                      <div class="team-names uk-text-center">{{ game.HomeTeam }}</div> <!-- NAME -->
                    </div>
                    <div class="goals uk-flex uk-flex-center">{{ this.isLatest ? game.HomeGoals : '-' }}</div> <!-- GOALS -->
                  </div>
                  <div class="uk-flex uk-flex-middle"> <!-- RIGHT-TEAM -->
                    <div class="goals uk-flex uk-flex-center">{{ this.isLatest ? game.AwayGoals : '-' }}</div> <!-- GOALS -->
                    <div class="uk-flex uk-flex-column uk-flex-middle uk-flex-1">
                      <div class="crests"><img :src="game.AwayCrest" /></div> <!-- CREST -->
                      <div class="team-names uk-text-center">{{ game.AwayTeam }}</div> <!-- NAME -->
                    </div>
                  </div>
                </div>
                <div class="divider"></div>
                <div class="game-info uk-flex uk-flex-around uk-flex-middle uk-flex-center"> <!-- GAME-INFO -->
                  <div class="uk-flex uk-flex-center uk-text-nowrap"> {{ game.GameDate }}</div>
                  <div>&nbsp;|&nbsp;</div>
                  <div class="uk-flex uk-flex-center uk-flex-middle">
                    <div class="uk-text-nowrap">{{ game.GameTime }}</div>
                  </div>
                  <div>&nbsp;|&nbsp;</div>
                  <div class="uk-flex uk-flex-center uk-flex-middle">
                    <div class="uk-text-nowrap">{{ game.Arena }}</div>
                  </div>
                  <div>&nbsp;|&nbsp;</div>
                  <div class="uk-flex uk-flex-center uk-text-nowrap">{{ game.GameType }}</div>
                </div>
            </div>
        </div>
        
        
        <div v-if="cardIsFlipped" class="uk-margin-small-bottom gc-nextlastgame uk-border-rounded flip-card uk-flex uk-flex-column uk-width-1-1 uk-height-1-1 uk-position-relative" style="padding:30px 15px 15px 15px;"> <!-- FRONT -->
            <div v-if="isLatest"><span @click="cardIsFlipped = !cardIsFlipped" uk-icon="close" class="cursor uk-position-absolute" style="top:5px; right:5px;"></span></div>
            <div v-if="this.showHeading" class="gc-nextprev-headline uk-flex uk-flex-middle uk-flex-middle uk-flex-between"> <!-- HEADLINE -->
              <div>MATCHHÄNDELSER</div>
            </div>
             <div class="uk-overflow-auto uk-border-rounded">
                <table class="uk-table remove-scrolls">
                    <thead>
                        <tr>
                            <th style="width:5%; tex-allign:center;">MIN</th>
                            <th style="width:8%;" class="uk-table-shrink"></th>
                            <th style="width:8%;">HÄNDELSE</th>
                            <th style="width:8%;" class="uk-table-shrink"></th>
                            <th style="width:64%;">SPELARE</th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr v-for="event in lastGame.EventList" :key="event.EventTypeId" class="uk-table-middle">
                        <td>{{ event.Minute }}</td>
                        <td><img :src="event.EventImage"></td>
                        <td>{{ event.Description }}</td>
                        <td><img :src="event.ImageName"></td>
                        <td>{{ event.Name }}</td>
                    </tr>
                    </tbody>
                </table>
              </div>
        </div>
        
      </div>
  </div>
</template>
<script>

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
        lastGameStats: {},
        isLatest: this.blok.isLatest,
        numberOfGames: this.blok.numberOfGames,
        showHeading: this.blok.showHeading,
        cardIsFlipped: false,
      }
    },
    computed: {
      game: function () {
        return this.isLatest ? this.lastGame.GameInfo : this.gameList[0]
      }
    },
    methods: {
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
    font-size: 0.9rem;
    & table {
        border-collapse: collapse;
        width: 100%;
    }
    & thead {
        & tr {
            background-color: #838383;
        }
        & th {
            color: #fff;
            font-size: 0.65rem;
            font-family: Oswald;
            padding: 2px 6px;
        }
    }
    & tbody {
        & tr {
            overflow: hidden;
        }
        & tr:nth-child(2n+0) {
            background-color: rgba(255, 255, 255, 0.8);
        }
        & tr:nth-child(2n+1) {
            background-color: #fff;
        }
        & td {
            font-family: Oswald;
            padding: 5px 4px;
            font-weight: bolder;
            font-size: 0.65rem;
            overflow: hidden;
            white-space: nowrap;
            & img {
                width: 17px;
                margin: -0.32rem 0 -0.4rem 0;
            }
            & .center {
                text-align: center;
            }
        }
    }
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
    font-size: 0.75rem;
    margin: 0 0 10px 0;
  }
  @media only screen and (min-width: 1000px) {
    // .goal-info {
    //   margin: 0 150px 10px 150px;
    // }
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
    font-size: 0.67rem;
    margin: 10px 0 0 0;
    line-height: 1;
  }
  .team-names {
    font-size: 0.67rem;
    line-height: 1.1;
  }
  .icons {
    width: 17px;
    margin-right: 4px;
  }
  .flip-card {
    // position: absolute;
    backface-visibility: hidden;
  }
  .flip-enter {
    transform: rotateY(180deg);
  }
  .flip-enter-to {
    transform: rotateY(0deg);
  }
  .flip-enter-active, .flip-leave-active {
    transition: transform 1s;
  }
  .flip-leave-to {
    transform: rotateY(180deg);
  }
  .cursor {
    cursor: pointer;
  }
</style>