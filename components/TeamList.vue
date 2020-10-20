<template>
  <div
    class="uk-margin-top uk-margin-bottom">
    <div class="uk-flex uk-flex-middle">
        <h3 class="uk-margin-remove-bottom">Lag</h3>
        <span 
          class="slide-icons"
          uk-icon="chevron-left"
          @click.stop.prevent="slideLeft"/>
        <span 
          class="slide-icons"
          uk-icon="chevron-right"
          @click.stop.prevent="slideRight"/>
    </div>
    <div
      class="uk-margin-bottom uk-flex uk-flex-nowrap team-list-slider">
      <div
        v-for="t in teams"
        :key="t.TeamId"
        >
        <nuxt-link
          :to="(t.Url!=null)?t.Url:'/'">
          <img :src="t.ImageName" />
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    catId: {
      type: Number,
      required: false,
      default: 0
    }
  },
  data(){
    return {
      teams: null
    }
  },
  async fetch () {
    let _catid=0
    if(this.catId>0){
      _catid = this.catId
    }else{
       _catid = this.$route.params.categoryid?this.$route.params.categoryid:0
    }
    
    
    try {
      const [t] = await Promise.all([
        this.$axios.$get(
          `/webapi/Filter/GetTeamListByCategory?categoryId=${_catid}`
        )
      ]);
      this.teams=t
    } catch (err) {
      console.log('TeamList error')
      console.log(err);
      console.log(err.request);
    }

  },
  methods:{
    slideLeft(){
      document.getElementsByClassName('team-list-slider')[0].scrollTo({
        left: (document.getElementsByClassName('team-list-slider')[0].scrollLeft-200),
        behavior: 'smooth'
      });
    },
    slideRight(){
      document.getElementsByClassName('team-list-slider')[0].scrollTo({
        left: (document.getElementsByClassName('team-list-slider')[0].scrollLeft+200),
        behavior: 'smooth'
      });
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