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
    this.handleSubriteCallback()
  },
  methods:{
    async handleSubriteCallback(){
      var _this = this
      // Get the authorization code from the URL query parameters
      const code = this.$route.query.code
      const state = this.$route.query.state
      
      if (!code) {
        _this.errors = 'Authorization code not found'
        return
      }

      // Send the code to your backend to exchange for tokens
      await this.$axios.post('/webapi/kopshop/CreateSubriteToken?code=' + code + (state ? '&state=' + state : '')).then(function (response) {
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