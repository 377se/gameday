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
          if(response.data.ErrorList.length>0){
            _this.errors = response.data.ErrorList
          }else{
            _this.$store.commit('setCid', response.data.Id)
            _this.$cookies.set('cid', response.data.Id)
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
