<template>
  <section
    class="uk-container uk-padding-small">
    <div 
      v-if="guidok.StatusId==0"
      class="uk-container uk-padding-small">
      <h3>{{ $getCMSEntry(labels,'reset_your_password', 'Återställ ditt lösenord') }}</h3>
      <form 
        v-if="!success"
        @submit.prevent="forgotten">
        <fieldset class="uk-fieldset">

          <div  
            class="uk-margin">
            <label class="uk-form-label">{{ $getCMSEntry(labels,'password', 'Lösenord') }}</label>
            <div class="uk-form-controls">
              <input 
                v-model="pwd"
                class="uk-input" 
                type="password"
                name="pwd"
                required>
            </div>
            <label class="uk-form-label">{{ $getCMSEntry(labels,'repeat_password', 'Repetera lösenordet') }}</label>
            <div class="uk-form-controls">
              <input 
                v-model="repeatpwd"
                class="uk-input" 
                type="password"
                name="repeatpwd"
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
              :button-text="$getCMSEntry(labels,'save', 'Spara')"
              :is-submit="true"/>
          </div>

        </fieldset>
      </form>
      <div 
        v-else>
        <Alert 
          v-if="errors.length>0"
          :errorlist="errors"
        />
      </div>
    </div>
    <div 
      v-else>
      <Alert 
        v-if="guidok.ErrorList.length>0"
        :errorlist="guidok.ErrorList"
      />
    </div>
  </section>
</template>
<script>
import Alert from '@/components/Alert'
import ButtonSubmit from '@/components/ButtonSubmit'
import { mapGetters } from 'vuex'

export default {
  head () {
    return {
      title: 'Glömt lösenordet?',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Glömt lösenordet?'
        },
        {
          hid: 'og:title',
          name:  'og:title',
          content:  'Glömt lösenordet?',
        },
        {
          hid: 'og:description',
          name:  'og:description',
          content: 'Glömt lösenordet?',
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
      pwd: '',
      repeatpwd:'',
      guidok:{StatusId:0, Message:''},
      errors: [],
      success: false,
      isSubmitting: false,
      labels: []
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
        await this.$axios.post('/webapi/'+this.$i18n.locale+'/account/PostUpdatePassword',{
          Guid: _this.$route.params.guid,
          Password:_this.pwd,
          RepeatPassword: _this.repeatpwd
        }).then(function (res) {
          _this.isSubmitting = false
          try{
            if(res.data.ErrorList!=null && res.data.ErrorList.length>0) 
            {
              _this.errors= res.data.ErrorList
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
        setTimeout(() => {
          _this.$router.push({path: _this.localePath('login')
        }, 5000)
    }
  },
  async asyncData (context) {
    try {
      const [g] = await Promise.all([
        await context.app.$axios.$post(
          '/webapi/'+this.$i18n.locale+'/account/PostValidateGuid?guid=' +context.route.params.guid
        )
      ]);
      return {
        guidok: g
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