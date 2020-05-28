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
            v-if="errors.length>0"
            :errorlist="errors"
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
      title: $getCMSEntry(labels,'header', 'Glömt lösenordet?'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: $getCMSEntry(labels,'header', 'Glömt lösenordet?')
        },
        {
          hid: 'og:title',
          name:  'og:title',
          content:  $getCMSEntry(labels,'header', 'Glömt lösenordet?'),
        },
        {
          hid: 'og:description',
          name:  'og:description',
          content: $getCMSEntry(labels,'header', 'Glömt lösenordet?'),
        }
      ]
    }
  },
  async fetch () {
    try{
      let [storyblok] = await Promise.all([
          this.$axios.$get("https://api.storyblok.com/v1/cdn/datasource_entries?dimension="+process.env.ISO_LANG_COUNTRY.toLowerCase() +"&datasource=fe-labels-forgotten-password&token="+process.env.STORYBLOK +"&cv="+this.$store.getters.version)
      ]);
      this.labels = storyblok.datasource_entries
    }catch(error){
      logger.error(error);
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
      success: false,
      isSubmitting: false 
    }
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
        await this.$axios.post('/webapi/account/PostResetAccount?email='+this.email).then(function (res) {
          _this.isSubmitting = false
          try{
            if(res.data.ErrorList!=null && res.data.ErrorList.length>0) 
            {
              errors = res.data.ErrorList
            }
            else 
            {
              UIkit.notification({message: res.data.Message, status: 'success'})
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