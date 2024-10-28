<template>
  <div>
    <div v-if="errors">{{errors}}</div>
    <div v-else>Loading...</div>
  </div>
</template>
<script>

export default {
  data(){
    return{
      errors: null
    }
  },
  async mounted(){
    this.sendToNorway()
  },
  methods:{
    async sendToNorway(){
      var _this = this
      await this.$axios.post('/webapi/kopshop/CreateToken?code='+this.$route.query.code).then(function (response) {
          if(!response.data && !response.data.IsLoggedIn){
            _this.errors = response
          }else{
            _this.$store.commit('setCid', response.data.Id)
            _this.$cookies.set('cid', response.data.Id)
            _this.$router.push(_this.localePath('/')) 
          }
      })
      .catch(function (error) {
        _this.errors = error
        console.log(error)
      })
    
    }
  }
};

</script>
