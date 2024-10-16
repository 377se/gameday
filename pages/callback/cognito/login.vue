<template>
  <div>Sending code to backend-api</div>
  <div>{{this.$route.query.code}}</div>
  <div>{{ token }}</div>

</template>
<script>
export default{
  async fetch(){
    const token = await this.$axios.get('/webapi/kopshop/CreateToken?code='+this.$route.query.code)
    
  }
}
</script>
