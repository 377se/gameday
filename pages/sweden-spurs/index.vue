<template>
  <section>
    <component v-if="membershipnumber<1 && story.content.component" :key="story.content._uid" :blok="story.content"
      :is="story.content.component" :remove-padding="true" />
    <div v-if="membershipnumber < 1" class="uk-background-muted">
      <div class="uk-container uk-container-xsmall uk-padding">
        <h3 class="uk-margin-small-bottom">Skriv in dina uppgifter här</h3>
        <form method="post" @submit.prevent="nextstep">
          <fieldset class="uk-fieldset">

            <div class="uk-margin">
              <label class="uk-form-label">{{ $getCMSEntry(labels,'memberid', 'Medlemsnummer') }}</label>
              <div class="uk-form-controls">
                <input v-model="form.memberid" class="uk-input" type="text" name="memberid">
              </div>
            </div>
            <div class="uk-margin">
              <label class="uk-form-label">{{ $getCMSEntry(labels,'lastname', 'Efternamn') }}</label>
              <div class="uk-form-controls">
                <input v-model="form.lastname" class="uk-input" type="text" name="lastname">
              </div>
            </div>

            <Alert v-if="errors.length>0" :errorlist="errors" message="" />

            <div class="uk-margin uk-text-center">
              <ButtonSubmit :is-submitting="isSubmitting" theme="uk-button-spurs"
                :button-text="$getCMSEntry(labels,'next', 'Nästa')" :is-submit="true" />
            </div>

          </fieldset>
        </form>
      </div>
    </div>
    <ArticleDetails v-if="membershipnumber>0" v-bind:article="article" :membershipnumber="membershipnumber">
    </ArticleDetails>
  </section>
</template>

<script>
import ArticleDetails from "@/components/articles/ArticleDetailsSpurs";
import { mapGetters, mapMutations } from 'vuex'
import Alert from '@/components/Alert'
import Page from '@/components/Page'
import ButtonSubmit from '@/components/ButtonSubmit'

export default {
  async fetch () {
    let version = this.$nuxt.context.query._storyblok || this.$nuxt.context.isDev ? 'draft' : 'published'
    try{
      let [storyblok, sb, a] = await Promise.all([
          this.$axios.$get("https://api.storyblok.com/v1/cdn/datasource_entries?dimension="+this.$i18n.locale +"&datasource=fe-labels-login&token="+process.env.STORYBLOK +"&cv="+this.$store.getters.version),
          this.$nuxt.context.app.$storyapi.get(`cdn/stories?starts_with=${process.env.STORYBLOK_CATALOGUE.replace('/','')}/${this.$i18n.locale}/sweden-spurs`, {
            version: version,
            cv: this.$nuxt.context.store.getters.version
          }),
        this.$axios.$get('/webapi/spurs/GetSpursArticleDetails')
      ]);
      this.article = a
      this.labels = storyblok.datasource_entries
      this.story=sb.data.stories.length>0?sb.data.stories[0]:{ content: {SEO:{title:'',description:''}} }
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
    head () {
    return {
      title: 'Sweden Spurs',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Sweden Spurs',
        },
        {
          hid: 'og:title',
          name:  'og:title',
          content: 'Sweden Spurs',
        },
        {
          hid: 'og:description',
          name:  'og:description',
          content: 'Sweden Spurs',
        }
      ]
    }
  },
  components:{
    Alert,
    ButtonSubmit,
    Page,
    ArticleDetails
  },
  data() {
    return {
      membershipnumber: 0,
      article: {},
      story: { content: {SEO:{title:'',description:''}} },
      form:{
        memberid: '',
        lastname: ''
      },
      labels: [],
      errors: [],    
      isSubmitting: false
    }
  },
  mounted(){
    this.$storybridge(() => {
      const storyblokInstance = new StoryblokBridge()

      storyblokInstance.on(['input', 'published', 'change'], (event) => {
        if (event.action == 'input') {
          if (event.story.id === this.story.id) {
            this.story.content = event.story.content
          }
        } else {
          window.location.reload()
        }
      })
    }, (error) => {
      console.error(error)
    })
  },
  methods: {
    async nextstep(event) {
      var _this = this
      this.isSubmitting=true
      await this.$axios.post('/webapi/spurs/GetMember', {
        MembershipNumber: this.form.memberid,
        LastName: this.form.lastname
      }).then(function (response) {
        _this.isSubmitting = false
        if (response.data && response.data.IsOkToProceed) {
          window.scrollTo(0, 0)
          _this.membershipnumber = _this.form.memberid
        } else if (response.data) {
          alert(response.data.Message)
        } else { 
          alert('Kontrollera medlemsnummer och efternamn, vi fick nämnligen ingen träff.')
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
.uk-button-spurs {
  background-color: #121834;
  color: #fff;
}

/* Hover + Focus */

/* OnClick + Active */
.uk-button-spurs.uk-active, .uk-button-spurs:hover, .uk-button-spurs:active {
  background-color: #121834;
  color: #fff;
}
</style>
