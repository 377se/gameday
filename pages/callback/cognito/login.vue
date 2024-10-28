<template>
  <div>
    <div>{{error}}</div>
  </div>
</template>
<script>

export default {
  data(){
    return{
      error: null
    }
  },
  async mounted(){
    this.sendToNorway()
  },
  methods:{
    async sendToNorway(){
      var _this = this
      await this.$axios.post('/webapi/kopshop/CreateToken?code='+this.$route.query.code).then(function (response) {
          if(!response.IsLoggedIn){
            _this.errors = response.ErrorList
          }else{
            _this.$store.commit('setCid', response.Id)
            _this.$cookies.set('cid', response.Id)
            _this.$router.push(_this.localePath('/')) 
          }
      })
      .catch(function (error) {
        _this.error = error
        console.log(error)
      })
    
    }
  }
};

</script>
