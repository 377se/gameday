<template>
  <div>
    <Alert 
      v-if="errors.length>0"
      :errorlist="errors"
    />
    <div 
      v-else-if="voucher && voucher.Message" class="uk-alert-success" uk-alert>
      <p>{{ voucher.Message }}</p>
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
      voucher:null,
      errors: [],
      labels: []
    }
  },
  computed: {
    ...mapGetters({
        global_labels:'labels',
        counter: 'basket/counter'
      })
  },
  mounted(){
    try{
      if(localStorage.voucher!=undefined){
        this.voucher = JSON.parse(localStorage.voucher)
        this.$axios.setHeader('x-voucherid', this.voucher.VoucherId)
      }
    }catch(err){
      console.log(err)
    }
  },
  methods:{
    async activateVoucher(){
      let _this = this
      this.errors = []
      await this.$axios.get('/webapi/voucher/GetInitVoucher?code='+this.code).then(function (response) {
        if(response.data.ErrorList && response.data.ErrorList.length>0){
          _this.errors = response.data.ErrorList
        }else{
          _this.show=false //Hide the form
          _this.$cookies.set('voucherid', response.data.VoucherId)
          _this.$axios.setHeader('x-voucherid', response.data.VoucherId)
          _this.$emit('update-cart')
          _this.voucher = response.data
          localStorage.setItem('voucher', JSON.stringify(response.data))
        }
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