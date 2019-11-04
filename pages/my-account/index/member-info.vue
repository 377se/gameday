<template>
  <section>
    <div class="uk-container">
      <h3>Medlemsinformation</h3>

    </div>
  </section>
</template>
<script>
export default {
  head () {
    return {
      title: "Medlemsinformation",
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: "Medlemsinformation"
        }
      ]
    }
  },
  components:{

  },
  data () {
    return {
      story: { content: {} },
      cust: {}
    }
  },
  mounted(){

  },
  methods:{
    async customer(){
      var _this = this
      this.isSubmitting=true
      await this.$axios.post('/webapi/Customer/PostCustomer', {
        customerUserName: this.form.email,
        customerPassword: this.form.password
      }).then(function (response) {
        _this.isSubmitting=false
          if(response.data.ErrorList.length>0){
            _this.errors = response.data.ErrorList
          }else{
            alert(response.data.Message) 
          }
      })
      .catch(function (error) {
        console.log(error)
      })
    }
  },
  async asyncData (context) {
    try {
      const [m] = await Promise.all([
        await context.app.$axios.$get(
          '/webapi/Customer/GetCustomer'
        )
      ]);
      return {
        cust: c
      };
    } catch (err) {
      console.log(err);
      console.log(err.request);
    }

  }
}
</script>
<style lang="scss">
@import '~/assets/scss/vars.scss';

</style>