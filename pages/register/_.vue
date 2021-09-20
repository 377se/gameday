<template>
  <section>
    <div class="uk-background-muted">
      <div 
        v-if="!success"
        class="uk-container uk-container-xsmall uk-padding">
        <form 
          method="post"
          @submit.prevent="register">
          <fieldset class="uk-fieldset">

            <div  
              class="uk-margin">
              <label class="uk-form-label">{{ $getCMSEntry(labels,'email', 'Email') }}</label>
              <div class="uk-form-controls">
                <input 
                  v-model="form.Email"
                  class="uk-input" 
                  type="text"
                  name="email">
              </div>
            </div>
            <div 
              class="uk-margin" >
              <label class="uk-form-label">{{ $getCMSEntry(labels,'password', 'Lösenord') }}</label>
              <div class="uk-form-controls">
                <input 
                  v-model="form.Password"
                  class="uk-input" 
                  type="password"
                  name="password">
              </div>
            </div>

            <div 
              class="uk-margin" >
              <label class="uk-form-label">{{ $getCMSEntry(labels,'repeat_password', 'Repetera lösenordet') }}</label>
              <div class="uk-form-controls">
                <input 
                  v-model="form.RepeatPassword"
                  class="uk-input" 
                  type="password"
                  name="repeatpassword">
              </div>
            </div>
            {{ form }}
            {{ form.Message }}
            <Alert 
              v-if="form.ErrorList.length>0"
              :errorlist="form.ErrorList"
              :message="form.Message"
            />

            <div class="uk-margin uk-text-center">
              <button 
                class="uk-button uk-button-primary"
                type="submit">{{ $getCMSEntry(labels,'btn_register', 'Registrera dig') }}</button>
              <!--ButtonSubmit 
                :is-submitting="isSubmitting"
                :button-text="labels.entities.labels['101722'].value" /-->
            </div>
            

            <div class="uk-margin uk-text-center">
              <strong>{{ $getCMSEntry(labels,'already_have_account', 'Har du redan ett konto?') }}</strong><br><nuxt-link :to="localePath('/login')">{{ $getCMSEntry(labels,'login_here_then', 'Logga då in här!') }}</nuxt-link>
            </div>

          </fieldset>
        </form>
      </div>
      <div 
        v-else
        class="uk-container uk-container-xsmall uk-padding uk-text-center">
        <h1>{{ $getCMSEntry(labels,'register_success_message', 'Du är nu registrerad!') }}</h1>
        <nuxt-link
          :to="localePath('/login')"
          class="uk-button uk-button-primary">{{ $getCMSEntry(labels,'login_here', 'Logga in här') }}</nuxt-link>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import Alert from '@/components/Alert'

export default {
  async fetch () {
    try{
      let [storyblok, emptyobj] = await Promise.all([
          this.$axios.$get("https://api.storyblok.com/v1/cdn/datasource_entries?dimension="+this.$i18n.locale +"&datasource=fe-labels-register&token="+process.env.STORYBLOK +"&cv="+this.$store.getters.version),
          this.$axios.$get("/webapi/customer/GetEmptyRegisterObject")
      ]);
      this.labels = storyblok.datasource_entries
      this.form = emptyobj
    }catch(error){
      console.log(error);
    }
  },
  components:{
    Alert
  },
  beforeRouteLeave(to, from, next){
    try{
      //Iterate through each object field, key is name of the object field`
      let _this = this
      Object.keys(_this.form).forEach(function(key,index) {
        _this.form[key] = ''
      })
    }catch(err){console.log(err)}
    next() 
  },
  data() {
    return {
      form:{
        Email: '',
        Password: '',
        RepeatPassword: '',
        ErrorList: [],
        Message: ''
      },
      labels: [],
      success: false,
      isSubmitting: false
    }
  },
  methods: {
    async register(event) {
      var _this = this
      await this.$axios.post('/webapi/'+this.$i18n.locale+'/customer/RegisterCustomerCampaign', this.form).then(function (response) {
        if(response.data.ErrorList.length>0){
          _this.form.ErrorList = response.data.ErrorList
        }else{
          _this.success=true
        }
      })
      .catch(function (error) {
        alert('Error')
      })
    }
  }
}
</script>
<style lang="scss">

</style>