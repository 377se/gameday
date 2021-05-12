<template>
  <div 
    v-editable="blok"
    class="uk-container gc-standings uk-border-rounded uk-margin-small-bottom">
    <div 
      class="gc-standings-container uk-padding-small">

          <div v-if="this.showHeading" class="gc-standings-headline">STANDINGS</div>
            <div class="uk-overflow-auto uk-border-rounded">
                <table class="uk-table remove-scrolls">
                    <thead>
                        <tr>
                            <th class="uk-table-shrink">P</th>
                            <th>Team</th>
                            <th>GP</th>
                            <th>W</th>
                            <th>D</th>
                            <th>L</th>
                            <th>+/-</th>
                            <th>P</th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr v-for="game in standings.slice(0, this.numberOfRows)" :key="game.Position" class="uk-table-middle">
                        <td class="center">{{ game.Position }}</td>
                        <td><img :src="game.Crest" :alt="game.Team">&nbsp;&nbsp;{{ game.Team }}</td>
                        <td>{{ game.Played }}</td>
                        <td>{{ game.Won }}</td>
                        <td>{{ game.Draw }}</td>
                        <td>{{ game.Lost }}</td>
                        <!-- <td class="uk-visible@s">{{ game.Fore }}</td>
                        <td class="uk-visible@s">{{ game.Against }}</td> -->
                        <td>{{ game.GoalDifference }}</td>
                        <td>{{ game.Points }}</td>
                    </tr>
                    </tbody>
                </table>
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
      showHeading: this.blok.showHeading,
      numberOfRows: this.blok.numberOfRows
    }
  },
  computed: {
    ...mapGetters({
      global_labels:'labels'})
  },
}
</script>
<style lang="scss">
.gc-standings {
        background: rgb(242,241,241);
        background: radial-gradient(circle, rgba(242,241,241,1) 0%, rgba(228,227,227,1) 46%, rgba(175,175,175,1) 100%);
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
.gc-standings a {
  color: #000;
}
.gc-standings a:hover {
  text-decoration: underline;
}
.remove-scrolls {
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none;  /* Internet Explorer 10+ */
}
.remove-scrolls::-webkit-scrollbar { /* WebKit */
    height: 0;
    width: 0;
}
.gc-standings-headline {
  color: rgb(0, 0, 0);
  font-family: Oswald;
  margin: 0 0 0.3em 0;
  font-size: 1.2rem;
  line-height: 1;
  font-weight: bold;
}
</style>