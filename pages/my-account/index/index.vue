<template>
<section>
<template v-if="$fetchState.pending">
  <content-placeholders-img />
  <content-placeholders-text :lines="4" />
</template>
<template v-else>
  <section class="myAccount">
    <div class="uk-container">
      <div v-if="!this.cust.FirstName && this.cust.FirstName == ''" class="uk-alert-success uk-padding-small uk-margin-medium-bottom">
              <a href="#my-profile" uk-scroll='{"offset": 140}'>{{ $getCMSEntry(labels,'topLink-profileUpdate', 'Färdigställ din profil här') }}</a>
      </div>
      <div class="uk-width-1-1 uk-flex uk-flex-stretch uk-flex-center uk-margin-small-bottom">
        <h1 class="uk-width-1-2 uk-margin-remove-bottom">{{ $getCMSEntry(labels,'myAccount', 'Mitt konto') }}</h1>
        <div class="uk-width-1-2">
          <button 
            type="button"
            class="uk-button uk-button-default uk-align-right uk-margin-remove-bottom"
            @click.prevent="logOut()">
            {{ $getCMSEntry(labels,'btn-logout', 'Logga ut') }}
          </button>
        </div>
      </div>
      <component 
        class="uk-padding-remove-top uk-padding-remove-bottom"
        v-if="story.content.component" 
        :key="story.content._uid" 
        :blok="story.content" 
        :is="story.content.component" />
      </div>
        <div v-if="this.cust.IsBranchMember" class="uk-margin-small-bottom">
          <a href="#my-member-section" uk-scroll='{"offset": 140}'>{{ $getCMSEntry(labels,'topLink-memberInfo', 'Gå direkt till din medlemsinfo här') }}</a>
        </div>
        <div v-if="this.cust.BranchInfo && this.cust.BranchInfo.AlertMessage !== null" class="uk-background-primary uk-border-rounded alert-container uk-padding-small uk-margin-medium-bottom uk-overflow-auto">

            <img class="thebomb" src="/icons/the-bomb-vibrating.gif" alt="Vibrating bomb">
            <p>{{ this.cust.BranchInfo.AlertMessage }}</p>

        </div>
      <form 
        class="uk-margin-small uk-form-stacked"
      >
      <fieldset class="uk-fieldset">
        <h2 id="my-profile" class="uk-margin-remove-bottom">{{ $getCMSEntry(labels,'myAccountInfo', 'Mina kontouppgifter') }}</h2>
        <div class="uk-margin-small">
            <label class="uk-form-label">{{ $getCMSEntry(labels,'firstName', 'Förnamn') }}:</label>
            <div class="uk-form-controls">
                <input 
                v-model="form.FirstName"
                class="uk-input uk-width-1-3@s" 
                type="text" 
                :placeholder="$getCMSEntry(labels,'placeholder_new_firstName', 'Skriv in ditt nya förnamn')" 
                name="firstName"
                :disabled="disabled">
            </div>
        </div>
        <div class="uk-margin-small">
            <label class="uk-form-label">{{ $getCMSEntry(labels,'lastName', 'Efternamn') }}:</label>
            <div class="uk-form-controls">
                <input 
                v-model="form.LastName"
                class="uk-input uk-width-1-3@s" 
                type="text" 
                :placeholder="$getCMSEntry(labels,'placeholder_new_lastName', 'Skriv in ditt nya efternamn')" 
                name="lastName"
                :disabled="disabled">
            </div>
        </div>
        <div v-if="!isUpdating" class="uk-margin-small">
            <label class="uk-form-label">{{ $getCMSEntry(labels,'email', 'Email') }}:</label>
            <div class="uk-form-controls">
                <input 
                v-model="form.Email"
                class="uk-input uk-width-1-3@s" 
                type="email" 
                :placeholder="$getCMSEntry(labels,'placeholder_current_email', 'Skriv in din nuvarande email')" 
                name="email"
                :disabled="disabled">
            </div>
        </div>
        <div v-else>
          <div class="uk-margin-small">
              <label class="uk-form-label">{{ $getCMSEntry(labels,'email', 'Email') }}:</label>
              <div class="uk-form-controls">
                  <input 
                  v-model="form.Email"
                  class="uk-input uk-width-1-3@s" 
                  type="email" 
                  :placeholder="$getCMSEntry(labels,'placeholder_new_email', 'Skriv in din nya email')" 
                  name="email"
                  :disabled="disabled">
              </div>
          </div>
          <div class="uk-margin-small">
              <label class="uk-form-label">{{ $getCMSEntry(labels,'placeholder_repeat_email', 'Upprepa email') }}:</label>
              <div class="uk-form-controls">
                  <input 
                  v-model="form.RepeatEmail"
                  class="uk-input uk-width-1-3@s" 
                  type="email" 
                  :placeholder="$getCMSEntry(labels,'placeholder_repeat_email', 'Upprepa email')" 
                  name="email"
                  :disabled="disabled">
              </div>
          </div>
        </div>
            <Alert 
              v-if="errors.length>0 || this.message !== ''"
              :errorlist="errors"
              :message="message"
              :alertClass="alertClass"
            />
        <button v-if="!isUpdating"
            type="button"
            class="uk-button uk-button-default uk-margin-small-top uk-margin-medium-bottom"
            @click.prevent="switchForm()"
            >
            {{ $getCMSEntry(labels,'btn-change', 'Uppdatera mina uppgifter') }}
        </button>
        <button v-if="isUpdating"
          type="submit"
          class="uk-button uk-button-primary uk-margin-small-top uk-margin-medium-bottom"
          @click.prevent="updateAccount()"
          >
          {{ $getCMSEntry(labels,'btn-save', 'Spara') }}
        </button>
      </fieldset>
      </form>
      <div v-if="this.cust.IsBranchMember" id="my-member-section" class="membership-container uk-background-primary uk-padding-large uk-border-rounded uk-overflow-hidden">
        <img class="uk-width-1-2@s" src="/logos/logo-liverpool-sweden.svg" alt="Logo LFC">
        <h2 class="uk-margin-remove-bottom">{{ $getCMSEntry(labels,'memberGreeting', 'Jajemensan, du är medlem i svenska supporterklubben!') }}</h2>
        <p>{{ this.cust.DiscountMessage }}</p>
          <div v-if="this.cust.BranchInfo && this.cust.BranchInfo.AlertMessage !== null">

            <img class="thebomb" src="/icons/the-bomb-vibrating.gif" alt="Vibrating bomb">
            <p>{{ this.cust.BranchInfo.AlertMessage }}</p>

        </div>
      </div>
  </section>
</template>
</section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Page from '@/components/Page'
import TextContent from '@/components/TextContent'
import Alert from '@/components/Alert'

export default {
  
  head () {
    return {
      title: 'Mitt konto',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Mitt konto',
        },
        {
          hid: 'og:title',
          name:  'og:title',
          content: 'Mitt konto',
        },
        {
          hid: 'og:description',
          name:  'og:description',
          content: 'Mitt konto',
        }
      ]
    }
  },

  components: {
    Page,
    TextContent,
    Alert
  },

  async fetch () {
    try{
      let [c, storyblok] = await Promise.all([
          this.$nuxt.context.app.$axios.$get(
            '/webapi/'+this.$i18n.locale+'/Customer/GetCustomer'
          ),
          this.$axios.$get("https://api.storyblok.com/v1/cdn/datasource_entries?dimension="+this.$i18n.locale +"&datasource=fe-labels-myaccount&token="+process.env.STORYBLOK +"&cv="+this.$store.getters.version)
      ]);
      this.cust =  c
      this.labels = storyblok.datasource_entries

      this.form.FirstName = this.cust.FirstName
      this.form.LastName = this.cust.LastName
      this.form.Email = this.cust.Email
      this.form.RepeatEmail = this.cust.RepeatEmail


    }catch(error){
      console.log(error);
    }
  },
  activated(){
    this.$fetch()
  },
  data () {
    return { 
      labels: [],
      errors: [],
      message: '',
      alertClass: '',
      story: { content: {SEO:{title:'',description:''}} },
      cust: {},
      isUpdating: false,
      disabled: true,
      form: {
        FirstName: '',
        LastName: '',
        Email: '',
        RepeatEmail: '',
      }
    }
  },
  beforeRouteLeave(to, from, next){
    try{
      //Iterate through each object field, key is name of the object field`
      let _this = this
      Object.keys(_this.form).forEach(function(key,index) {
        _this.form[key] = ''
      })
      _this.message = ''
      _this.errors = []
    }catch(err){console.log(err)}
    next() 
  },
    mounted () {
    this.$storybridge.on(['input', 'published', 'change'], (event) => {
      if (event.action == 'input') {
        if (event.story.id === this.story.id) {
          this.story.content = event.story.content
        }
      } else {
        window.location.reload()
      }
    })
  },
  methods:{
    async logOut(){
      await this.$axios.post('webapi/Customer/PostLogout')
      this.$cookies.set('cid', null)
      this.$store.commit('setCid', null)
      this.$router.push(this.$root.context.app.localePath('/'))
    },
    switchForm(){
      this.isUpdating = !this.isUpdating
      this.disabled = !this.disabled
    },
    async updateAccount(event) {
      var _this = this
      await this.$axios.post('/webapi/Customer/PostUpdateCustomer', {
        FirstName: this.form.FirstName,
        LastName: this.form.LastName,
        Email: this.form.Email,
        RepeatEmail: this.form.RepeatEmail
      }).then(function (response) {
        if (response.data.ErrorList.length>0) {
          _this.message = ''
          _this.alertClass = 'uk-alert-danger'
          _this.errors = response.data.ErrorList
        } else {
          _this.errors = []
          _this.message = response.data.Message
          _this.alertClass = 'uk-alert-success'
          _this.switchForm()
        }
      })
      .catch(function (error) {
        alert('Error')
      })
    },
  },
  asyncData (context) {
    
    // Check if we are in the editor mode
    let version = context.query._storyblok || context.isDev ? 'draft' : 'published'
    // Load the JSON from the API
    return context.app.$storyapi.get(`cdn/stories${process.env.STORYBLOK_CATALOGUE}/${context.app.i18n.locale}/my-account`, {
      version: version,
      cv: context.store.getters.version
    }).then((res) => {
      return res.data
    }).catch((res) => {
      if (!res.response) {
        console.error(res)
        context.error({ statusCode: 404, message: 'Failed to receive content form api' })
      } else {
        console.error(res.response.data)
        context.error({ statusCode: res.response.status, message: res.response.data })
      }
    })
  }

}

</script>
<style lang="scss">

.membership-container {
      color: #fff;
      & h2 {
        color: #fff;
        margin: 10px 0 0 0;
        line-height: 1.1;
      }
      & p {
        margin: 10px 0 0 0;
        line-height: 1.1;
      }
    }

  .alert-container {
    color: #fff;
    & p {
      margin: 0;
    }
  }
  .thebomb {
    float: left;
    margin-right: 10px;
    @media (max-width: 599px) {
      width: 20vw;
    }
    @media (min-width: 600px) {
      width: 9vw;
    }
  }
</style>
