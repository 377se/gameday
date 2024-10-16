<template>
  <div>
    <div>Sending code to backend-api</div>
    <div>Query {{$route.query.code}}</div>
    <div>Token {{ token }}</div>
    <div><button type="button" @click="sendToNorway()">Skicka</button></div>
  </div>
</template>
<script>

export default {
  async fetch(){
    const token = await this.$axios.get('/webapi/kopshop/CreateToken?code='+this.$route.query.code) 
  },
  mounted(){
    alert('KUKEN')
  },
  methods:{
    async sendToNorway(){
      const token = await this.$axios.get('/webapi/kopshop/CreateToken?code='+this.$route.query.code) 
    }
  }
};

</script>
