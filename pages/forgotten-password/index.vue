<template>
  <section>
    <div class="uk-container uk-padding-small">
      <h3>{{ $getCMSEntry(labels,'header', 'Glömt lösenordet?') }}</h3>
      <form 
        v-if="!success"
        method="post"
        @submit.prevent="forgotten">
        <fieldset class="uk-fieldset">

          <div  
            class="uk-margin">
            <label class="uk-form-label">{{ $getCMSEntry(labels,'email', 'Email') }}</label>
            <div class="uk-form-controls">
              <input 
                v-model="email"
                class="uk-input" 
                type="text"
                :placeholder="$getCMSEntry(labels,'placeholder_email', 'Skriv in din email')"
                name="email"
                required>
            </div>
          </div>

          <Alert 
            v-if="errors.length>0 || this.message !== ''"
            :errorlist="errors"
            :message="message"
            :alertClass="alertClass"
          />

          <div class="uk-margin uk-text-center">
            <ButtonSubmit
              :is-submitting="isSubmitting"
              theme="uk-button-primary"
              :button-text="$getCMSEntry(labels,'btn_send', 'Skicka återställningsinformation')"
              :is-submit="true"
            />
          </div>
          
        </fieldset>
      </form>
      <div 
        v-else>
        <p>
          {{ $getCMSEntry(labels,'forgotten_success_message', 'Vi har nu skickat dig ett mail för att återställa ditt lösenord. Följ instruktioner i mailet.') }}
        </p>
      </div>
    </div>
  </section>
</template>
<script>
import Alert from '@/components/Alert'
import ButtonSubmit from '@/components/ButtonSubmit'
export default {
  head () {
    return {
      title: this.$getCMSEntry(this.labels,'header', 'Glömt lösenordet?'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$getCMSEntry(this.labels,'header', 'Glömt lösenordet?')
        },
        {
          hid: 'og:title',
          name:  'og:title',
          content:  this.$getCMSEntry(this.labels,'header', 'Glömt lösenordet?'),
        },
        {
          hid: 'og:description',
          name:  'og:description',
          content: this.$getCMSEntry(this.labels,'header', 'Glömt lösenordet?'),
        }
      ]
    }
  },
  async fetch () {
    try{
      let [storyblok] = await Promise.all([
          this.$axios.$get("https://api.storyblok.com/v1/cdn/datasource_entries?dimension="+this.$i18n.locale +"&datasource=fe-labels-forgotten-password&token="+process.env.STORYBLOK +"&cv="+this.$store.getters.version)
      ]);
      this.labels = storyblok.datasource_entries
    }catch(error){
      console.log(error);
    }
  },
  components: {
    Alert,
    ButtonSubmit
  },
  data () {
    return { 
      labels: [],
      email: '',
      errors: [],
      message: '',
      alertClass: '',
      success: false,
      isSubmitting: false 
    }
  },
  beforeRouteLeave(to, from, next){
    try{
      let _this = this
      _this.email = ''
      _this.message = ''
      _this.errors = []
    } catch(err){console.log(err)}
    next() 
  },
  watch:{
    "$route.hash"(value) {
      window.scrollTo(0, 0);
      var step = value.split('#')
      if(step[1]==undefined){
        this.success = false
      }else{
        this.success = true
      }
    }
  },
  mounted () {
    if(this.$route.hash!=''){
      var step = this.$route.hash.split('#')
      this.success = true
    }else{
      this.success = false
    }
  },
  methods:{
    async forgotten() {
        this.errors=[]
        this.isSubmitting = true
        var _this = this;
        await this.$axios.post('/webapi/'+this.$i18n.locale+'/account/PostResetAccount?email='+this.email).then(function (res) {
          _this.isSubmitting = false
          try{
            if(res.data.ErrorList!=null && res.data.ErrorList.length>0) 
            {
              _this.message = ''
              _this.alertClass = 'uk-alert-danger'
              _this.errors = res.data.ErrorList
            }
            else 
            {
              _this.errors = []
              _this.alertClass = 'uk-alert-success'
              _this.message = res.data.Message
              _this.email = ''
            }
          }catch(err){console.log(err)}
        })
        .catch(function (error) {
          _this.isSubmitting = false
          console.log(error)
        })
    }
  }
}
</script>
<style lang="scss">

</style>