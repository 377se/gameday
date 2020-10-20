<template>
  <div
    class="uk-margin-bottom uk-margin-top uk-flex uk-flex-nowrap team-list-slider">
    <div
      v-for="t in teams"
      :key="t.TeamId"
      >
      <nuxt-link
        :to="t.Url">
        <img :src="t.ImageName" />
      </nuxt-link>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      teams: null
    }
  },
  async fetch () {
    let _boolCatId = this.$route.params.categoryid?true:false
    
    try {
      const [t] = await Promise.all([
        this.$axios.$get(
          `/webapi/Filter/GetTeamListByCategory?categoryId=${this.$route.params.categoryid}`
        )
      ]);
      this.teams=t
    } catch (err) {
      console.log('TeamList error')
      console.log(err);
      console.log(err.request);
    }

  }
}
</script>
<style lang="scss">
.team-list-slider{
  display: flex;
  width: 100vw;
  margin-left:-15px;
  margin-right:-15px;
  overflow-x: scroll;
}
.team-list-slider > div{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 5px;
  border: none;
}
.team-list-slider > div img{
  height:50px;
  max-width:none;
}
</style>