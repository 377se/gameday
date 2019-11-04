<template>
  <section
    class="uk-container uk-padding-small">
    <div 
      v-if="guidok.StatusId==0"
      class="uk-container uk-padding-small">
      <h3>Återställ ditt lösenord</h3>
      <form 
        v-if="!success"
        @submit.prevent="forgotten">
        <fieldset class="uk-fieldset">

          <div  
            class="uk-margin">
            <label class="uk-form-label">Lösenord</label>
            <div class="uk-form-controls">
              <input 
                v-model="pwd"
                class="uk-input" 
                type="password"
                name="pwd"
                required>
            </div>
            <label class="uk-form-label">Repetera lösenordet</label>
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
              button-text="Spara"/>
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
export default {
  head () {
    return {
      title: 'Glömt lösenordet?',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Glömt lösenordet?'
        }
      ]
    }
  },
  components: {
    Alert,
    ButtonSubmit
  },
  data () {
    return { 
      labels: {},
      pwd: '',
      repeatpwd:'',
      guidok:{StatusId:0, Message:''},
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
        await this.$axios.post('/webapi/account/PostUpdatePassword',{
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
    }
  },
  async asyncData (context) {
    try {
      const [g] = await Promise.all([
        await context.app.$axios.$post(
          '/webapi/account/PostValidateGuid?guid=' +context.route.params.guid
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