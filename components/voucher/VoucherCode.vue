<template>
  <div>
    <Alert 
      v-if="errors.length>0"
      :errorlist="errors"
    />
    <div 
      v-else-if="message && showmessage" class="uk-alert-success" uk-alert>
      <button 
        class="uk-alert-close"
        @click.prevent="showmessage=false"
        uk-close></button>
      <p>{{ message }}</p>
    </div>
    <form
      v-if="show"
      @submit.prevent="activateVoucher"
      class="uk-padding-small uk-padding-remove-bottom">
      <div class="uk-margin-small uk-flex" uk-margin>
        <input 
          class="uk-input uk-width-expand" 
          type="text" 
          :placeholder="$getCMSEntry(global_labels,'voucher_placeholder', 'Voucherkod')"
          v-model="code">
        <button type="submit" class="uk-text-small uk-margin-small-left uk-button uk-button-default">{{ $getCMSEntry(global_labels,'voucher_btn_activate', 'Aktivera') }}</button>
      </div>
    </form>
    <a
      v-else
      href="#"
      class="uk-inline-block uk-text-small uk-padding-small uk-padding-remove-bottom"
      @click.stop.prevent="show=true">{{ $getCMSEntry(global_labels,'voucher_info', 'Har du en voucherkod?') }}</a>
  </div>
  

</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Alert from '@/components/Alert'
export default {
  components:{
    Alert
  },
  data(){
    return{
      show:false,
      code: '',
      message: null,
      showmessage:false,
      errors: [],
      labels: []
    }
  },
  computed: {
    ...mapGetters({
      global_labels:'labels'})
  },
  methods:{
    async activateVoucher(){
      let _this = this
      this.errors = []
      await this.$axios.get('/webapi/voucher/GetDiscountCode?code='+this.code).then(function (response) {
        if(response.data.ErrorList){
          _this.errors = response.data.ErrorList
        }else{
          _this.addToCart(response.data.CartItem)
          _this.message = response.data.Message
          _this.showmessage = true
          _this.show=false //Hide the form
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    async addToCart(ci){
      let _this = this
      await this.$axios.post('/webapi/cart/PostAddToCart',{
        AddOn: null,
        ArticleId: ci.ArticleId,
        Quantity: 1,
        SizeId: ci.SizeId
      }
      ).then(function (response) {
        _this.$store.commit('basket/add', response.data)
        //console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      })
    }
  }
}
</script>

<style>

</style>