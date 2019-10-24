<template>
  <div 
    id="offscreen-basket" 
    class="uk-offcanvas"
    uk-offcanvas="flip:true;overlay:true">
    <div 
      class="uk-offcanvas-bar"
      style="padding:0;background:#fff;">
      <div 
        style="height:80px;background:#fa6900;"
        class="uk-flex">
        <h3 style="line-height:80px;margin-left:12px;">Varukorg</h3>
        <button 
          id="close-basket" 
          class="uk-offcanvas-close uk-icon uk-close" 
          style="top:27px;right:6px;"
          type="button" uk-close/>
      </div>

      <div
        v-if="cart.data.length>0">
        <table 
          class="uk-table uk-table-justify uk-table-divider uk-margin-remove"
          style="color:#333333;font-size:0.7rem">
          <thead
            style="font-size:0.7rem">
            <tr v-if="cart.freeShippingMessage">
              <td colspan="3">
                <div>{{ cart.freeShippingMessage }}</div>
              </td>
            </tr>
          </thead>
          <tbody
            class="uk-background-default">
            <tr
              v-for="(item, index) in cart.data"
              :key="index">
              <td class="thumb-image">
                <img 
                  :src="thumb_src + item.ImageThumb" />
              </td>
              <td class="article-data">
                <span class="article-name">
                  {{ item.Category }}<br/>{{ item.Name }}
                  <span
                    v-if="item.AddOnDisplay!=''"><br />{{ item.AddOnDisplay }}
                  </span>
                </span>
                <br/>
                <span
                  v-for="size in item.Size"
                  :key="size.Value" 
                  class="article-size">
                  {{ size.Name }}<br/>
                </span>
              </td>
              <td 
                class="total">
                <div 
                v-if="item.IsDiscount"
                style="text-decoration:line-through;">{{ item.PriceDisplay }}</div>
                <div
                  v-if="item.PriceAddOn">+{{ PriceAddOnDisplay }}</div>
                {{item.PriceTotalDisplay}}
                <br>
                <a 
                  href="#"
                  style="text-decoration:underline;color:#333;"
                  @click.prevent.stop="deleteFromCart(item.Id)">Ta bort</a>
              </td>
            </tr>
          </tbody>
          <tfoot
            class="uk-background-default"
            style="font-weight:bold;color:#474747;font-size:0.7rem">
            <!--tr>
            <td colspan="5" style="text-align:right">
              {{#if isVoucher}}
              <form class="form-inline">
                <div style="margin-bottom:0" class="form-group">
                  <input type="text" class="form-control" style="" name="VoucherCode" id="VoucherCode" placeholder="{{{dict.voucher-code}}}">
                </div>
                <button type="button" class="btn btn-default" can-click="checkVoucher">{{{dict.send}}}</button>
              </form>
              {{else}}
              <a href="#" can-click="showVoucherForm">{{{dict.voucher-code}}}?</a>
              {{/if}}
            </td>
            </tr-->
            <tr>
              <td colspan="2" style="text-align:right">
                <strong>Totalt <span class="payment-total-ex-shipping">exkl.frakt</span></strong>
              </td>
              <td colspan="1" class="total">
                <strong><span 
                  v-if="cart.IsDiscount"
                  style="text-decoration:line-through;">{{ cart.Price }}<br></span>
                  {{ cart.PriceToPayExShipping }}</strong>
              </td>
            </tr>
          </tfoot>
        </table>
        <nuxt-link
          to="/checkout"
          class="uk-button uk-width-1-1 uk-button-default">Till betalning</nuxt-link>
      </div>
      <div
        v-else 
        class="uk-text-center uk-text-small uk-margin-small">
        Du har inte lagt något i varukorgen ännu!
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      cart: 'basket/cart',
      counter: 'basket/counter'
    }),
  },
  data(){
    return{
      thumb_src:process.env.THUMB_SRC
    }
  },
  methods:{
    async deleteFromCart(id){
      let _this = this
      await this.$axios.delete('https://beta.supporterprylar.se/webapi/cart?id='+id
      ).then(function (response) {
      _this.$store.commit('basket/add', response.data)
      })
      .catch(function (error) {
      console.log(error)
      })
    }
  }
};
</script>
<style scoped>
#offscreen-basket .uk-offcanvas-bar{
  color:#333;
}
.uk-table td, .uk-table th {
    padding: 8px 6px;}

.total{
  text-align:right;
}
</style>