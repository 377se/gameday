<template>
  <div>Sending code to backend-api</div>

</template>
<script>
export default{
  async fetch(){
    this.$axios.get('/webapi/kopshop/CreateToken?code='+this.$route.query.code)
  }
}
</script>
