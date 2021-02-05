<template>
  <section class="myAccount">
    <template v-if="$fetchState.pending">
      <content-placeholders-img />
      <content-placeholders-text :lines="4" />
    </template>
    <template v-else>
      <div class="uk-container">
        <div 
          v-if="!this.cust.FirstName && this.cust.FirstName == ''" 
          class="uk-alert-success uk-padding-small uk-margin-medium-bottom">
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

      <div 
        v-if="this.cust.IsBranchMember" class="uk-margin-small-bottom">
        <a href="#my-member-section" uk-scroll='{"offset": 140}'>{{ $getCMSEntry(labels,'topLink-memberInfo', 'Gå direkt till din medlemsinfo här') }}</a>
      </div>
      <div 
        v-if="this.cust.BranchInfo && this.cust.BranchInfo.AlertMessage !== null" class="uk-background-primary uk-border-rounded alert-container uk-padding-small uk-margin-medium-bottom uk-overflow-auto">
          <lottie-player class="thebomb" src="/animations/thebomb.json" :options="{autoplay:true,loop:true}" />
          <p>{{ this.cust.BranchInfo.AlertMessage }}</p>
      </div>
      <h2 id="my-profile" class="uk-margin-remove-bottom">{{ $getCMSEntry(labels,'myAccountInfo', 'Mina kontouppgifter') }}</h2>
      <div class="avatar-container">
        <img :src="avatarUrl[form.AvatarId]" class="uk-height-1-1 uk-width-auto">
      </div>
      <div v-if="isUpdating" class="avatar-chooser">
        <div>
          <a href="#"><img :src="avatarUrl[1]" class="uk-height-1-1 uk-width-auto" @click.prevent="switchAvatar(1)"></a>
        </div>
        <div>
          <a href="#"><img :src="avatarUrl[2]" class="uk-height-1-1 uk-width-auto" @click.prevent="switchAvatar(2)"></a>
        </div>
      </div>

      <form 
        class="uk-margin-small uk-form-stacked"
      >
        <fieldset class="uk-fieldset">
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
          <lottie-player class="thebomb" src="/animations/thebomb.json" autoplay loop />
          <p>{{ this.cust.BranchInfo.AlertMessage }}</p>
        </div>
      </div>
    </template>
  </section>
</template>

<script>
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
    // Check if we are in the editor mode
    let version = this.$nuxt.context.query._storyblok || this.$nuxt.context.isDev ? 'draft' : 'published'
    // Load the JSON from the API
    try{
      let [c, storyblok, story] = await Promise.all([
          this.$nuxt.context.app.$axios.$get(
            '/webapi/'+this.$i18n.locale+'/Customer/GetCustomer'
          ),
          this.$axios.$get("https://api.storyblok.com/v1/cdn/datasource_entries?dimension="+this.$i18n.locale +"&datasource=fe-labels-myaccount&token="+process.env.STORYBLOK +"&cv="+this.$store.getters.version),
          this.$storyapi.get(`cdn/stories${process.env.STORYBLOK_CATALOGUE}/${this.$i18n.locale}/my-account`, {
            version: version,
            cv: this.$store.getters.version
          })
      ]);
      this.cust =  c
      this.labels = storyblok.datasource_entries
      this.story = story.data.story

      this.form.FirstName = this.cust.FirstName
      this.form.LastName = this.cust.LastName
      this.form.Email = this.cust.Email
      this.form.RepeatEmail = this.cust.RepeatEmail
      this.form.AvatarId = Number.isInteger(this.cust.AvatarId)?this.cust.AvatarId:0

      if(this.cust.Id==0){
        this.logOut()
      }

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
      avatarUrl: {
        0: "/avatars/avatar-gray-unisex.png",
        1: "/avatars/avatar-white-man-short-hair.png",
        2: "/avatars/avatar-white-woman-long-hair.png",
      },
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
        AvatarId: 0,
      }
    }
  },
  beforeRouteLeave(to, from, next){
    try{
      this.message = ''
      this.errors = []
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
    switchAvatar(chosenAvatar){
      this.form.AvatarId = chosenAvatar
    },
    async updateAccount(event) {
      var _this = this
      await this.$axios.post('/webapi/Customer/PostUpdateCustomer', {
        FirstName: this.form.FirstName,
        LastName: this.form.LastName,
        Email: this.form.Email,
        RepeatEmail: this.form.RepeatEmail,
        AvatarId: this.form.AvatarId,
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
    }
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
  .avatar-container {
    margin: 20px 0;
    @media (max-width: 599px) {
      height: 40vw;
    }
    @media (min-width: 600px) {
      height: 20vw;
    }
  }
  .avatar-chooser {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 20px;
    @media (max-width: 599px) {
      width: 40vw;
      height: 20vw;
    }
    @media (min-width: 600px) {
      width: 23vw;
      height: 11vw;
    }
  }
</style>
