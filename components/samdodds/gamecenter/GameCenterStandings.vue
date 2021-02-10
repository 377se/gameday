<template>
<!-- LATEST GAME -->
  <div class="uk-container gc-standings">

    <div 
      class="gc-standings-container uk-position-relative uk-background-primary uk-margin-large-bottom uk-border-rounded"
      tabindex="-1"
      uk-slider>
      <div>
        <div class="uk-width-1-1 uk-padding">
      <div class="gc-headline">
        STANDINGS
      </div>

    <div class="uk-overflow-auto">
        <table class="uk-table uk-border-rounded uk-overflow-hidden">
            <thead>
                <tr>
                    <th class="uk-table-shrink">Pos</th>
                    <th>Team</th>
                    <th>GP</th>
                    <th class="uk-visible@s">W</th>
                    <th class="uk-visible@s">D</th>
                    <th class="uk-visible@s">L</th>
                    <th class="uk-visible@s">F</th>
                    <th class="uk-visible@s">A</th>
                    <th>+/-</th>
                    <th>PTS</th>
                </tr>
            </thead>
            <tbody>
            <tr v-for="game in standings" :key="game" class="uk-table-middle">
                <td class="center">{{ game.Position }}</td>
                <td><img :src="game.Crest" :alt="game.Team">&nbsp;&nbsp;{{ game.Team }}</td>
                <td>{{ game.Played }}</td>
                <td class="uk-visible@s">{{ game.Won }}</td>
                <td class="uk-visible@s">{{ game.Draw }}</td>
                <td class="uk-visible@s">{{ game.Lost }}</td>
                <td class="uk-visible@s">{{ game.Fore }}</td>
                <td class="uk-visible@s">{{ game.Against }}</td>
                <td>{{ game.GoalDifference }}</td>
                <td>{{ game.Points }}</td>
            </tr>
            </tbody>
        </table>
    </div>
        
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    props: {
      blok: {
        type: Object,
        required: true,
      }
    },
    async fetch() {
    try {
      let [standings] = await Promise.all([
          this.$axios.$get('/webapi/gamecenter/GetStanding'),
      ]);
      this.standings = standings
    } catch (err) {
      console.log(err);
    }
  },
  data(){
    return{
      standings: [],
    }
  },
  computed: {
    ...mapGetters({
      global_labels:'labels'})
  },
}
</script>
<style lang="scss">
.gc-standings-container {
    width: 100%;
    background: url("/backgrounds/background-gradient-red.svg") center;
      font-size: 1.6vw;
}
.gc-standings a {
  color: #000;
}
.gc-standings a:hover {
  text-decoration: underline;
}
.gc-headline {
  color: #fff;
  font-family: Oswald;
  margin: 0 0 0.3em 0;
  font-size: 4em;
  line-height: 1;
  font-weight: bold;
}
.gc-standings {
    & table {
        border-collapse: collapse;
        width: 100%;
    }
    & thead {
        & tr {
            background-color: #65181e;
        }
        & th {
            color: #fff;
            font-size: 0.9rem;
            font-family: Oswald;
            font-weight: bolder;
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
            font-size: 0.9rem;
            overflow: hidden;
            white-space: nowrap;
            & img {
                width: 20px;
                margin: -0.2rem 0 -0.5rem 0;
            }
            & .center {
                text-align: center;
            }
        }
    }
}
</style>