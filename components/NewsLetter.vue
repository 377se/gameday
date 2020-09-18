<template>
  <div>
    <div 
      v-if="message.StatusId!=0">
      <h3 class="uk-h4">{{ $getCMSEntry(labels,'header', 'Nyhetsbrev') }}</h3>
      <p class="uk-text-small">
        {{ $getCMSEntry(labels,'description', 'Få senaste nyheterna, tillgång till REA före alla andra, 10% på nästa köp och mycket, mycket mer!') }}
      </p>
      <form 
        class="uk-grid-collapse" 
        @submit.prevent="newsletter()"
        uk-grid>
        <div class="uk-width-1-1">
          <input 
            v-model="email"
            class="uk-input"
            name="email" 
            type="text" 
            placeholder="">
        </div>
        <div class="uk-width-1-1 uk-margin-small">
          <ButtonSubmit 
            :is-submitting="isSubmitting"
            theme="uk-button-primary uk-width-1-1"
            :button-text="$getCMSEntry(labels,'click-to-action', 'Ge mig rabatter!')"
            :is-submit="true"/>
        </div>
      </form>
    </div>
    <div
      v-else>
      <p>{{ $getCMSEntry(labels,'success-message', 'Du är nu registrerad! Härliga erbjudanden kommer snart dyka upp. Tack!') }}</p>
    </div>
  </div>
</template>
<script>
import Alert from '@/components/Alert'
import ButtonSubmit from '@/components/ButtonSubmit'
export default {
  components:{
    Alert,
    ButtonSubmit
  },
  async fetch () {
    try{
      let [storyblok] = await Promise.all([
          this.$axios.$get("https://api.storyblok.com/v1/cdn/datasource_entries?dimension="+process.env.ISO_LANG_COUNTRY.toLowerCase() +"&datasource=fe-labels-newsletter&token="+process.env.STORYBLOK +"&cv="+this.$store.getters.version)
      ]);
      
      this.labels = storyblok.datasource_entries
    }catch(error){
      logger.error('No data sources '+error);
    }
  },
  data() {
    return {
      labels: [],
      email:'',
      message: {StatusId:-1},
      errors: [],
      isSubmitting: false
    }
  },
  methods:{
    async newsletter(event) {
        this.isSubmitting=true
        var _this = this
        await this.$axios.post('/webapi/Signup/PostNewsLetterSignup?email='+this.email)
        .then(function (response) {
          _this.isSubmitting=false
          if(response.data.ErrorList.length>0){
            this.errors = response.data.ErrorList
          }else{
            _this.message = response.data
          }
        })
        .catch(function (error) {
          _this.isSubmitting=false
          console.log(error)
        })
      }
  }
}
</script>
<style lang="scss" scoped>
h3{color:#fff;}
</style>