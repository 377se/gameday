<template>
  <section>
    <div class="uk-background-muted">
      <div class="uk-container uk-container-xsmall uk-padding">
        <form 
          method="post"
          @submit.prevent="login">
          <fieldset class="uk-fieldset">

            <div  
              class="uk-margin">
              <label class="uk-form-label">{{ $getCMSEntry(labels,'email', 'Email') }}</label>
              <div class="uk-form-controls">
                <input 
                  v-model="form.email"
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
                  v-model="form.password"
                  class="uk-input" 
                  type="password"
                  name="password">
              </div>
              <div class="uk-margin uk-margin-remove-top uk-text-center uk-text-small">
                <nuxt-link 
                  :to="localePath('/forgotten-password')" 
                  style="color:#8c8c8c">{{ $getCMSEntry(labels,'forgotten_password', 'Glömt ditt lösenord?') }}</nuxt-link></div>
            </div>

            <Alert 
              v-if="errors.length>0"
              :errorlist="errors"
            />

            <div class="uk-margin uk-text-center">
              <ButtonSubmit 
                :is-submitting="isSubmitting"
                theme="uk-button-primary"
                :button-text="$getCMSEntry(labels,'btn_login', 'Logga in')"
                :is-submit="true"/>
            </div>
            

            <div class="uk-margin uk-text-center">
              <strong>{{ $getCMSEntry(labels,'no_account', 'Har du inget konto ännu?') }}</strong><br><nuxt-link :to="localePath('/register')">{{ $getCMSEntry(labels,'get_an_account', 'Skaffa ett här!') }}</nuxt-link>
            </div>

          </fieldset>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Alert from '@/components/Alert'
import ButtonSubmit from '@/components/ButtonSubmit'

export default {
  async fetch () {
    try{
      let [storyblok] = await Promise.all([
          this.$axios.$get("https://api.storyblok.com/v1/cdn/datasource_entries?dimension="+this.$i18n.locale +"&datasource=fe-labels-login&token="+process.env.STORYBLOK +"&cv="+this.$store.getters.version)
      ]);
      this.labels = storyblok.datasource_entries
    }catch(error){
      console.log(error);
    }
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
  components:{
    Alert,
    ButtonSubmit
  },
  data() {
    return {
      form:{
        email: '',
        password: ''
      },
      labels: [],
      errors: [],
      isSubmitting: false
    }
  },
  methods: {
    async login(event) {
      var _this = this
      this.isSubmitting=true
      await this.$axios.post('/webapi/customer/PostLogin', {
        customerUserName: this.form.email,
        customerPassword: this.form.password
      }).then(function (response) {
        _this.isSubmitting=false
          if(response.data.ErrorList.length>0){
            _this.errors = response.data.ErrorList
          }else{
            _this.$store.commit('setCid', response.data.Id)
            _this.$cookies.set('cid', response.data.Id)
            _this.$router.push(_this.$root.context.app.localePath('/my-account')) 
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
<style lang="scss">

</style>
