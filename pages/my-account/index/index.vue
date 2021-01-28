<template>
  <section>
    <div class="uk-container">
      <h1>{{ $getCMSEntry(labels,'myAccount', 'Mitt konto') }}</h1>
      <div>
        <button 
          type="button"
          class="uk-button uk-button-default"
          @click.prevent="logOut()">
          {{ $getCMSEntry(labels,'btn-logout', 'Logga ut') }}
        </button>
      </div>
      <component 
        v-if="story.content.component" 
        :key="story.content._uid" 
        :blok="story.content" 
        :is="story.content.component" />
    </div>

    <form 
      class="uk-margin-small uk-form-stacked myAccountInfo"
    >

    <fieldset class="uk-fieldset">
      <!-- <legend class="uk-legend">{{ $getCMSEntry(labels,'myAccountInfo', 'Mina kontouppgifter') }}</legend> -->
      <h2>{{ $getCMSEntry(labels,'myAccountInfo', 'Mina kontouppgifter') }}</h2>

      <div class="uk-margin">
          <label class="uk-form-label">{{ $getCMSEntry(labels,'firstName', 'Förnamn') }}:</label>
          <div class="uk-form-controls">
              <input 
              v-model="form.FirstName"
              class="uk-input uk-form-width-medium" 
              type="text" 
              :placeholder="cust.FirstName" 
              name="firstName"
              :disabled="disabled">
          </div>
      </div>

      <div class="uk-margin">
          <label class="uk-form-label">{{ $getCMSEntry(labels,'lastName', 'Efternamn') }}:</label>
          <div class="uk-form-controls">
              <input 
              v-model="form.LastName"
              class="uk-input uk-form-width-medium" 
              type="text" 
              :placeholder="cust.LastName" 
              name="lastName"
              :disabled="disabled">
          </div>
      </div>

      <div v-if="!isUpdating" class="uk-margin">
          <label class="uk-form-label">{{ $getCMSEntry(labels,'email', 'Email') }}:</label>
          <div class="uk-form-controls">
              <input 
              v-model="form.Email"
              class="uk-input uk-form-width-medium" 
              type="email" 
              :placeholder="cust.Email" 
              name="email"
              :disabled="disabled">
          </div>
      </div>
      <div v-else>
        <div class="uk-margin">
            <label class="uk-form-label">{{ $getCMSEntry(labels,'email', 'Email') }}:</label>
            <div class="uk-form-controls">
                <input 
                v-model="form.Email"
                class="uk-input uk-form-width-medium" 
                type="email" 
                :placeholder="$getCMSEntry(labels,'placeholder_new_email', 'Skriv in din nya email.')" 
                name="email"
                :disabled="disabled">
            </div>
        </div>
        <div class="uk-margin">
            <label class="uk-form-label">{{ $getCMSEntry(labels,'placeholder_repeat_email', 'Upprepa email') }}:</label>
            <div class="uk-form-controls">
                <input 
                v-model="form.RepeatEmail"
                class="uk-input uk-form-width-medium" 
                type="email" 
                :placeholder="$getCMSEntry(labels,'placeholder_repeat_email', 'Upprepa email')" 
                name="email"
                :disabled="disabled">
            </div>
        </div>
      </div>

          <Alert 
            v-if="errors.length>0"
            :errorlist="errors"
          />

      <button v-if="!isUpdating"
          type="button"
          class="uk-button uk-button-default uk-margin-small-top"
          @click.prevent="switchForm()"
          >
          {{ $getCMSEntry(labels,'btn-change', 'Ändra') }}
      </button>

      <button v-if="isUpdating"
        type="submit"
        class="uk-button uk-button-default uk-margin-small-top"
        @click.prevent="updateAccount()"
        >
        {{ $getCMSEntry(labels,'btn-save', 'Spara') }}
      </button>

    </fieldset>
    </form>



      <!-- {{ cust }} -->

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
    }catch(error){
      console.log(error);
    }
  },
  data () {
    return { 
      labels: [],
      errors: [],
      story: { content: {SEO:{title:'',description:''}} },
      cust: {},
      isUpdating: false,
      disabled: true,
      form: {
        FirstName: '',
        LastName: '',
        Email: '',
        RepeatEmail: '',
        Message: null,
        ErrorList: null
      }
    }
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
          _this.errors = response.data.ErrorList
        } else {
          _this.isUpdating=false
        }
      }).catch(function (error) {
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
  .myAccountInfo {
    & h2 {
      margin: 0 0 15px 0;
    }
  }
</style>