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
              <label class="uk-form-label">Email</label>
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
              <label class="uk-form-label">Lösenord</label>
              <div class="uk-form-controls">
                <input 
                  v-model="form.password"
                  class="uk-input" 
                  type="password"
                  name="password">
              </div>
            </div>

            <div 
              class="uk-margin" >
              <label class="uk-form-label">Repetera lösenordet</label>
              <div class="uk-form-controls">
                <input 
                  v-model="form.repeatpassword"
                  class="uk-input" 
                  type="password"
                  name="repeatpassword">
              </div>
            </div>

            <Alert 
              v-if="errors.length>0"
              :errorlist="errors"
            />

            <div class="uk-margin uk-text-center">
              <button 
                class="uk-button uk-button-primary"
                type="submit">Registrera dig</button>
              <!--ButtonSubmit 
                :is-submitting="isSubmitting"
                :button-text="labels.entities.labels['101722'].value" /-->
            </div>
            

            <div class="uk-margin uk-text-center">
              <strong>Har du redan ett konto?</strong><br><nuxt-link to="/login">Logga då in här!</nuxt-link>
            </div>

          </fieldset>
        </form>
      </div>
      <div 
        v-else
        class="uk-container uk-container-xsmall uk-padding uk-text-center">
        <h1>Du är nu registrerad!</h1>
        <nuxt-link
          to="/login"
          class="uk-button uk-button-primary">Logga in här</nuxt-link>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import Alert from '@/components/Alert'

export default {
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
        email: '',
        password: '',
        repeatpassword: ''
      },
      labels: {},
      errors: [],
      success: false,
      isSubmitting: false
    }
  },
  methods: {
    async register(event) {
      var _this = this
      await this.$axios.post('/webapi/customer/PostRegister', {
        customerUserName: this.form.email,
        customerPassword: this.form.password,
        customerRepeatPassword: this.form.repeatpassword
      }).then(function (response) {
        if(response.data.ErrorList.length>0){
          _this.errors = response.data.ErrorList
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
