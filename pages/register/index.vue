<template>
  <section>
    <div class="uk-background-muted">
      <div class="uk-container uk-padding">
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

            <!--Alert 
              v-if="errors.length>0"
              :message="errors"
            /-->

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
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
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
      isSubmitting: false
    }
  },
  methods: {
    async register(event) {
      await this.$axios.post('/webapi/customer/PostRegister', {
        customerUserName: this.form.email,
        customerPassword: this.form.password,
        customerRepeatPassword: this.form.repeatpassword
      }).then(function (response) {
        alert('Registered!')
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
