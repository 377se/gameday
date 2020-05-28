<template>
  <section>
    <div class="uk-container">
      <h1>{{ $getCMSEntry(labels,'memberInformation', 'Medlemsinformation') }}</h1>

    </div>
  </section>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'


export default {
  head () {
    return {
      title: "Medlemsinformation",
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: "Medlemsinformation"
        },
        {
          hid: 'og:title',
          name:  'og:title',
          content:  'Medlemsinformation',
        },
        {
          hid: 'og:description',
          name:  'og:description',
          content: 'Medlemsinformation',
        }
      ]
    }
  },
  components:{

  },
   async fetch () {
    try{
      let [storyblok] = await Promise.all([
          this.$axios.$get("https://api.storyblok.com/v1/cdn/datasource_entries?dimension="+process.env.ISO_LANG_COUNTRY.toLowerCase() +"&datasource=fe-labels-myaccount&token="+process.env.STORYBLOK +"&cv="+this.$store.getters.version)
      ]);
      this.labels = storyblok.datasource_entries
    }catch(error){
      logger.error(error);
    }
  },

  data () {
    return {
      labels: [],
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
      const [c] = await Promise.all([
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


</style>