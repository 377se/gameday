<template>
  <div>
    <Alert 
      v-if="errors.length>0"
      :errorlist="errors"
    />
    <form
      v-if="show"
      @submit.prevent="activateVoucher"
      class="uk-padding-small uk-padding-remove-bottom uk-text-small">
      <div class="uk-margin-small uk-flex" uk-margin>
        <input 
          class="uk-input uk-width-expand" 
          type="text" 
          placeholder="Voucherkod"
          v-model="code">
        <button type="submit" class="uk-margin-small-left uk-button uk-button-default">Aktivera</button>
      </div>
    </form>
    <a
      v-else
      href="#"
      class="uk-inline-block uk-text-small uk-padding-small uk-padding-remove-bottom"
      @click.stop.prevent="show=true">Har du en voucherkod?</a>
  </div>
  

</template>

<script>
export default {
  data(){
    return{
      show:false,
      code: '',
      errors: []
    }
  },
  methods:{
    async activateVoucher(){
      await this.$axios.get('/webapi/voucher/GetDiscountCode?code='+this.code).then(function (response) {
          if(response.data.ErrorList.length>0){
            _this.errors = response.data.ErrorList
          }else{
            alert('Koden är aktiverad. Nu ska varukorgen uppdateras. TODO')
            _this.show=false //Hide the form
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