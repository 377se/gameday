 <template> 
  <section>
    <div class="uk-background-muted">
      <div class="uk-container uk-container-xsmall uk-padding">
        <form 
          v-if="contestDTO && contestDTO.ContestId"
          method="post"
          @submit.prevent="postContest">
          <div
            v-if="contestDTO.Message && !contestDTO.ErrorList"
            class="uk-text-center">
            {{ contestDTO.Message }}
            <nuxt-link
              :to="localePath('/')"
              class="uk-button uk-button-primary">{{ $getCMSEntry(labels,'btn_success_message', 'Till shopen!') }}</nuxt-link>
          </div>
          <fieldset 
            v-else
            class="uk-fieldset">
            <h4>{{ contestDTO.Name }}</h4>
            <p>{{ $getCMSEntry(labels,'contest_ends', 'Tävlingen slutar') }} {{ contestDTO.EndDate }}</p>
            <p>{{ $getCMSEntry(labels,'description', 'Tippa halvtid- och slutresultat samt matchminut för eventuellt sista mål. Lycka till!') }}</p>
            <p>{{ $getCMSEntry(labels,'you_can_win','Du kan vinna en') }} <nuxt-link :to="contestDTO.Url">{{ contestDTO.ArticleName }}</nuxt-link></p>
            <div  
              class="uk-margin">
              <label class="uk-form-label">{{ $getCMSEntry(labels,'email', 'Email') }}</label>
              <div class="uk-form-controls">
                <input 
                  v-model="contestDTO.Email"
                  class="uk-input" 
                  type="text"
                  name="email">
              </div>
            </div>

            <div  
              class="uk-margin">
              <label class="uk-form-label">{{ $getCMSEntry(labels,'result_halftime', 'Resultat halvtid') }}</label>
              <div class="uk-form-controls">
                <input 
                  v-model="contestDTO.Halftime"
                  class="uk-input" 
                  type="text"
                  name="halftime"
                  placeholder="0-0">
              </div>
            </div>

            <div  
              class="uk-margin">
              <label class="uk-form-label">{{ $getCMSEntry(labels,'result_fulltime', 'Resultat fulltid') }}</label>
              <div class="uk-form-controls">
                <input 
                  v-model="contestDTO.Fulltime"
                  class="uk-input" 
                  type="text"
                  name="fulltime"
                  placeholder="0-0">
              </div>
            </div>

            <div  
              class="uk-margin">
              <label class="uk-form-label">{{ $getCMSEntry(labels,'minute_last_goal', 'Vilken minut faller sista målet?') }}</label>
              <div class="uk-form-controls">
                <input 
                  v-model="contestDTO.Minute"
                  class="uk-input" 
                  type="text"
                  name="minute">
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
                :button-text="$getCMSEntry(labels,'btn_send', 'Skicka')"
                :is-submit="true"/>
            </div>

          </fieldset>
        </form>
      </div>
    </div>
  </section>
</template>
<script>
import Alert from '@/components/Alert'
import ButtonSubmit from '@/components/ButtonSubmit'
export default {
  async fetch () {
    // Check if we are in the editor mode
    /*let [storyblok] = await Promise.all([
      this.$axios.$get("https://api.storyblok.com/v1/cdn/datasource_entries?dimension="+process.env.ISO_LANG_COUNTRY.toLowerCase() +"&datasource=fe-labels-contest&token="+process.env.STORYBLOK +"&cv="+this.$store.getters.version)
    ]);*/

    try{
      let [contest] = await Promise.all([
        this.$axios.$get("/webapi/contest")
      ]);
      this.contestDTO = contest
    }catch(err){console.log(err)}
    
    
    //this.labels = storyblok.datasource_entries

  },
  components:{
    Alert,
    ButtonSubmit
  },
  data () {
    return {
      story: { content: {} },
      labels: [],
      errors: [],
      isSubmitting: false,
      contestDTO: null
    }
  },
  methods:{
    async postContest() {
      this.isSubmitting=true
      var _this = this
      await this.$axios.post('/webapi/Contest', _this.contestDTO)
      .then(function (response) {
        _this.isSubmitting=false
        if(response.data.ErrorList.length>0){
          _this.contestDTO = response.data
          _this.errors = response.data.ErrorList
        }else{
          _this.contestDTO = response.data
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