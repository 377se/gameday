<template>
  <section>
    <div class="uk-container uk-padding-small">
      <h1>{{ $getCMSEntry(labels,'change_password', 'Ändra lösenord') }}</h1>
      <form 
        method="post"
        @submit.prevent="change">
        <fieldset class="uk-fieldset">
          <div  
            class="uk-margin">
            <!-- CURRENT PASSWORD -->
            <div class="uk-form-controls">
              <input 
                v-model="form.current_password"
                class="uk-input uk-width-1-3@s uk-margin-small-bottom" 
                type="password"
                :placeholder="$getCMSEntry(labels,'placeholder_current_password', 'Skriv in ditt nuvarande lösenord')"
                name="current_password"
                required>
            </div>
            <!-- NEW PASSWORD -->
            <div class="uk-form-controls">
              <input 
                v-model="form.new_password"
                class="uk-input uk-width-1-3@s uk-margin-small-bottom" 
                type="password"
                :placeholder="$getCMSEntry(labels,'placeholder_new_password', 'Skriv in ditt nya lösenord')"
                name="new_password"
                required>
            </div>
            <!-- REPEAT NEW PASSWORD -->
            <div class="uk-form-controls">
              <input 
                v-model="form.repeat_password"
                class="uk-input uk-width-1-3@s uk-margin-small-bottom"
                type="password"
                :placeholder="$getCMSEntry(labels,'placeholder_repeat_password', 'Repetera ditt nya lösenord')"
                name="repeat_password"
                required>
            </div>

          </div>

          <Alert 
            v-if="errors.length>0 || this.message !== ''"
            :errorlist="errors"
            :message="message"
            :alertClass="alertClass"
          />

          <div class="uk-margin">
            <button 
                class="uk-button uk-button-primary"
                type="submit">{{ $getCMSEntry(labels,'btn_save', 'Spara') }}</button>
          </div>

        </fieldset>
      </form>
    </div>
  </section>

</template>
<script>
import { mapGetters } from 'vuex'
import Alert from '@/components/Alert'


export default {
  head () {
    return {
      title: "Ändra lösenord",
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: "Ändra lösenord"
        },
        {
          hid: 'og:title',
          name:  'og:title',
          content:  'Ändra lösenord',
        },
        {
          hid: 'og:description',
          name:  'og:description',
          content: 'Ändra lösenord',
        }
      ]
    }
  },
  components:{
    Alert
  },
   async fetch () {
    try{
      let [storyblok] = await Promise.all([
          this.$axios.$get("https://api.storyblok.com/v1/cdn/datasource_entries?dimension="+this.$i18n.locale +"&datasource=fe-labels-myaccount&token="+process.env.STORYBLOK +"&cv="+this.$store.getters.version)
      ]);
      this.labels = storyblok.datasource_entries
    }catch(error){
      console.log(error);
    }
  },
  beforeRouteLeave(to, from, next){
    try{
      this.errors = []
      //Iterate through each object field, key is name of the object field`
      let _this = this
      Object.keys(_this.form).forEach(function(key,index) {
        _this.form[key] = ''
      })
    }catch(err){console.log(err)}
    next() 
  },
  data () {
    return {
      form: {
        Password: '',
        NewPassword: '',
        RepeatPassword: '',
        Message: null,
        ErrorList: null
      },
      labels: [],
      errors: [],
      message: '',
      alertClass: '',
      isSubmitting: false
    }
  },
  methods:{
    async change(event) {
      var _this = this
      await this.$axios.post('/webapi/Password/PostUpdatePassword', {
        Password: this.form.current_password,
        NewPassword: this.form.new_password,
        RepeatPassword: this.form.repeat_password
      }).then(function (response) {
        if (response.data.ErrorList.length>0) {
              _this.message = ''
              _this.alertClass = 'uk-alert-danger'
              _this.errors = response.data.ErrorList
        } else {
              _this.errors = []
              _this.alertClass = 'uk-alert-success'
              _this.message = response.data.Message
        }
      }).catch(function (error) {
        // alert('Error')
        console.log(error)
        
      })
    }
  },

}
</script>
<style lang="scss">


</style>