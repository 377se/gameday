<template>
  <div class="uk-container result-contest">
    <div class="result-contest-container uk-margin-large-bottom">
      <!-- <div class="rc-background-image"></div> -->
      <div class="rc-headline">
        RESULTATTÄVLING
      </div>
      <div class="rc-info-back"></div>
      <div class="rc-info"> <!-- INFOBOX -->
          <div class="rc-info-headline">Tävlingen slutar 2021-01-08  20:44</div>
          <div class="rc-info-bread">Tippa halvtid- och slutresultat samt matchminut för eventuellt sista mål.</div>
          <div class="rc-info-sub">Du kan vinna en Nike Stadium Jersey</div>
          <div class="rc-info-bread">Lycka till!</div>
            <div class="rc-gameinfo uk-flex uk-flex-left"> <!-- GAME-INFO -->
              <div class="uk-flex uk-flex-middle uk-flex-left loc-info uk-width-1-4"> <!-- DATE -->
                <img class="uk-width-1-6" src="/icons/calendar-black.svg">
                <div style="text-transform: capitalize">
                  fredag 08 jan
                  <!-- {{ lastGame.GameDate }} -->
                </div>
              </div>
              <div class="uk-flex uk-flex-middle uk-flex-center loc-info uk-width-1-4"> <!-- TIME -->
                <img class="uk-width-1-6" src="/icons/time-black.svg">
                <div>
                  21.00
                  <!-- {{ lastGame.GameTime }} -->
                </div>
              </div>
              <div class="uk-flex uk-flex-middle uk-flex-left loc-info uk-width-1-4"> <!-- ARENA -->
                <img class="uk-width-1-6" src="/icons/soccer-field-black.svg">
                <div>
                  Anfield
                  <!-- {{ lastGame.Arena }} -->
                </div>
              </div>
              <div class="uk-flex uk-flex-middle uk-flex-left loc-info uk-width-1-4"> <!-- LEAGUE -->
                <img class="uk-width-1-6" src="/icons/trophy-black.svg">
                <div>
                  Premiere League
                  <!-- {{ lastGame.GameType }} -->
                </div>
              </div>
          </div>
      </div>
      <div class="rc-form-container">
        <div class="rc-crests"> <!-- CRESTS -->
          <div class="rc-hometeam">
            <img src="/logos/teams/liverpool_fc_600x600.png" alt="">
          </div>
          <div class="rc-dash">-</div>
          <div class="rc-awayteam">
              <img src="/logos/teams/liverpool_fc_600x600.png" alt="">
          </div>
        </div>
      </div>
      <div class="rc-timer" id="rctimer"> <!-- TIMER -->
        <span v-if="displayDays !== 0">{{ displayDays }} DAG&nbsp;</span>
        <span v-if="displayHours !== 0">{{ displayHours }} TIM&nbsp;</span>
        <span v-if="displayMinutes !== 0">{{ displayMinutes }} MIN&nbsp;</span>
        <span v-if="displaySeconds !== 0">{{ displaySeconds }} SEK KVAR</span>
      </div>
      <div class="rc-product-image"> <!-- PRODUKTBILD -->
        <img :src="contestData.ImageName" :alt="contestData.ArticleName">
      </div>
      <div class="rc-logo-container"> <!-- LOGO -->
        <img class="rc-logo" src="/sites/samdodds/samdodds-logo.png" alt="Sam Dodds Logo">
      </div>
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
      let [contestData] = await Promise.all([
          this.$axios.$get('/webapi/contest/GetContest'),
      ]);
      this.contestData = contestData
    } catch (err) {
      console.log(err);
    }
  },
  data(){
    return{
      contestData: {},
      displayDays: 0,
      displayHours: 0,
      displayMinutes: 0,
      displaySeconds: 0
    }
  },
  computed: {
    ...mapGetters({global_labels:'labels'}),
    _seconds: () => 1000,
    _minutes(){
      return this._seconds * 60
    },
    _hours(){
      return this._minutes * 60
    },
    _days(){
      return this._hours * 24
    }
  },
  mounted() {
    this.showRemaining()
  },
  methods: {
    showRemaining() {
      const timer = setInterval(() => {
        const now = new Date()
        const end = new Date(2021, 0, 31, 16, 32, 0, 0)
        const distance = end.getTime() - now.getTime()

        if (distance < 0) {
          clearInterval(timer)
          return
        }

      const days = Math.floor(distance / this._days)
      const hours = Math.floor((distance % this._days) / this._hours)
      const minutes = Math.floor((distance % this._hours) / this._minutes)
      const seconds = Math.floor((distance % this._minutes) / this._seconds)
      this.displayMinutes = minutes !== 0 ? minutes : minutes
      this.displaySeconds = seconds !== 0 ? seconds : seconds
      this.displayHours = hours !== 0 ? hours : hours
      this.displayDays = days !== 0 ? days : days
    }, 1000)

    }
  }
}
</script>
<style lang="scss">

.result-contest h1 {
  color: #fff;
  font-weight: 700;
}

.result-contest,
.result-contest a {
  color: #fff;
}
.result-contest a:hover {
  text-decoration: underline;
}
.result-contest-container {
  position: relative;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 2fr 5fr 7fr 2fr;
  height: 37em;
  column-gap: 1.55em;
  padding: 0.7em 1.5em 1.5em 1.5em;
  border-radius: 12px;
  grid-template-areas: 
    "headline timer"
    "info productimage"
    "form productimage"
    "form logo";
  background: url("/backgrounds/background-gradient-red.svg") center;
  font-size: 1.6vw;
}
@media only screen  and (max-width : 640px) {
  .result-contest-container {
    grid-template-columns: 1fr;
    grid-template-areas: 
    "headline"
    "info"
    "form"
    "timer"
    "productimage"
    "logo";
    font-size: 3vw;
  }
}
.rc-background-image {
  background: url("/backgrounds/audience.jpg") center;
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0.15;
}
.rc-headline {
  grid-area: headline;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.2em 0 0.3em 0;
  font-family: Oswald;
  font-size: 4em;
  line-height: 1;
  font-weight: bold;
}
.rc-info {
  grid-area: info;
  padding: 1.2em;
  color: #000;
}
.rc-info-back {
  grid-area: info;
  background-color: rgba(255, 255, 255, 0.83);
  border-radius: 12px;
}
.rc-info-headline {
  font-family: Oswald;
  font-size: 1.4em;
  line-height: 1.5;
}
.rc-info-bread {
  font-family: Lato;
  font-size: 0.9em;
  line-height: 1.1;
  margin-bottom: 0.7em;
}
.rc-info-sub {
  font-family: Oswald;
  font-size: 1.2em;
  line-height: 1.5;
  margin-bottom: 0.8em;
}
.rc-gameinfo {
  margin-top: 2em;
}
.rc-timer {
  grid-area: timer;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.2em 0 0.3em 0;
  font-family: Oswald;
  font-size: 1.8em;
  line-height: 1;
  font-weight: bold;
}
.rc-product-image {
  grid-area: productimage;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  opacity: 0.83;
  border-radius: 12px;
  overflow: hidden;
  & > img {
    height: 105%;
  }
}
.rc-logo-container {
  grid-area: logo;
  display: flex;
  width: 100%;
  height: 4.5em;
  justify-content: flex-end;
  align-items: center;
}
.rc-logo {
  width: 45%;
}
.rc-form-container {
  grid-area: form;
  display: grid;
  grid-template-columns: 3fr 2fr;
  grid-template-rows: 2.7fr 2.7fr 2fr;
  grid-template-areas: 
    "crests results"
    "name-email results"
    "submit submit";
    column-gap: 1.8em;
}
.rc-crests {
  grid-area: crests;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  & img {
    height: 100%;
  }
}

.loc-info {
  font-size: 1em;
  line-height: 1;
  & img {
    margin-right: 0.4em;
    width: 14px;
  }
  @media screen and (min-width: 640px) {
    & div {
      font-size: 0.8em;
    }
    & img {
      width: 1.3em;
    }
  }
}
</style>
