<template>
  <div
    id="offscreen-basket"
    class="uk-modal-full uk-modal"
    uk-modal>
    <div :class="{ 'uk-modal-dialog': extensionlist, 'uk-modal-dialog-no-extensions': !extensionlist }">
      <div
        class="uk-modal-body uk-overflow-auto"
        style="padding:0px;height:100vh;background:#ffffff;"
        uk-overflow-auto>
        <div
          class="uk-flex basket-ribbon uk-position-relative">
          <h3 style="color:#fff;line-height:80px;margin-left:12px;">{{ $getCMSEntry(global_labels,'basket_header', 'Varukorg') }}</h3>
          <button
            id="close-basket"
            class="uk-offcanvas-close uk-icon uk-close"
            style="color:#fff;top:27px;right:16px;"
            type="button"
            uk-close
            uk-toggle="target: #offscreen-basket"/>
        </div>
        <div :class="{ 'uk-flex uk-flex-wrap': extensionlist }"> <!-- FLEX CONTAINER TWO COLUMNS -->
          <div class="uk-padding-small" :class="{ 'uk-width-1-1 uk-width-1-2@m uk-flex-last@m': extensionlist }"> <!-- CART -->
            <div
              v-if="cart.data.length>0">
              <h3>Detta har du i varukorgen</h3>
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
                  <template
                    v-for="(item) in cart.data">
                    <tr
                      :key="item.Id">
                      <td class="thumb-image" style="padding-left:6px;">
                        <img
                          :src="thumb_src + item.ImageThumb"
                          :alt="item.Name"/>
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
                        class="total" style="padding-right:6px;">
                        <div
                        v-if="item.IsDiscount"
                        style="text-decoration:line-through;">{{ item.PriceDisplay }}</div>
                        <div
                          v-if="item.PriceAddOn">+{{ item.PriceAddOnDisplay }}</div>
                        {{item.PriceTotalDisplay}}
                        <br>
                        <a
                          href="#"
                          style="text-decoration:underline;color:#333;"
                          @click.prevent.stop="deleteFromCart(item.Id)">{{ $getCMSEntry(global_labels,'basket_delete_from_cart', 'Ta bort') }}</a>
                      </td>
                    </tr>
                    <template
                      v-for="(i) in item.ItemList">
                      <tr
                        :key="i.Id">
                        <td class="thumb-image" style="padding-left:15px;">
                          <img
                            :src="thumb_src + i.ImageThumb"
                            :alt="i.Name"/>
                        </td>
                        <td class="article-data">
                          <span class="article-name">
                            {{ i.Category }}<br/>{{ i.Name }}
                            <span
                              v-if="i.AddOnDisplay!=''"><br />{{ i.AddOnDisplay }}
                            </span>
                          </span>
                          <br/>
                          <span
                            v-for="size in i.Size"
                            :key="size.Value"
                            class="article-size">
                            {{ size.Name }}<br/>
                          </span>
                        </td>
                        <td
                          class="total" style="padding-right:6px;">
                          <div
                          v-if="i.IsDiscount"
                          style="text-decoration:line-through;">{{ i.PriceDisplay }}</div>
                          <div
                            v-if="i.PriceAddOn">+{{ PriceAddOnDisplay }}</div>
                          {{i.PriceTotalDisplay}}
                          <br>
                          <a
                            href="#"
                            style="text-decoration:underline;color:#333;"
                            @click.prevent.stop="deleteFromCart(i.Id)">{{ $getCMSEntry(global_labels,'basket_delete_from_cart', 'Ta bort') }}</a>
                        </td>
                      </tr>
                    </template>
                  </template>
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
                      <strong>{{ $getCMSEntry(global_labels,'basket_total', 'Totalt') }} <span class="payment-total-ex-shipping">{{ $getCMSEntry(global_labels,'basket_ex_shipping', 'exkl.frakt') }}</span></strong>
                    </td>
                    <td colspan="1" class="total" style="white-space:nowrap;padding-right:6px;">
                      <strong><span
                        v-if="cart.IsDiscount"
                        style="text-decoration:line-through;">{{ cart.Price }}<br></span>
                        {{ cart.PriceToPayExShipping }}</strong>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2" style="text-align:right">
                      <strong><span>{{ $getCMSEntry(global_labels,'basket_shipping', 'Frakt') }}</span></strong>
                    </td>
                    <td colspan="1" class="total" style="white-space:nowrap;padding-right:6px;">
                      <strong>{{ cart.Shipping }}</strong>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2" style="text-align:right">
                      <strong>{{ $getCMSEntry(global_labels,'basket_total', 'Totalt') }} <span>{{ $getCMSEntry(global_labels,'basket_inc_shipping', 'inkl.frakt') }}</span></strong>
                    </td>
                    <td colspan="1" class="total" style="white-space:nowrap;padding-right:6px;">
                      <strong>{{ cart.PriceToPayIncShipping }}</strong>
                    </td>
                  </tr>
                </tfoot>
              </table>
              <div v-if="cart.CampaignTextOutput" class="uk-alert-primary" uk-alert>
                <p>{{ cart.CampaignTextOutput }}</p>
              </div>
              <div v-if="cartextensions" class="uk-alert-primary" uk-alert>
                <p>Missa inte!</p>
              </div>
              <ul id="example-1">
                <li v-for="item in cartextensions" :key="item.CartExtensionId">
                  {{ item.ArticleName }}<br />
                  {{ item.DiscountedPriceDisplay }}<br />
                  <img
                    :src="thumb_src + item.ImageIdThumb"
                    alt="" />
                </li>
              </ul>
              <VoucherCode
                @update-cart="updateCart()"/>
              <div
                class="uk-padding-small uk-padding-remove-bottom"
                @click="close()">
                <nuxt-link
                  :to="localePath('/checkout')"
                  class="uk-button uk-width-1-1 uk-button-primary">{{ $getCMSEntry(global_labels,'basket_to_checkout', 'Till betalning') }}</nuxt-link>
              </div>
              <div
                class="uk-padding-small uk-padding-remove-bottom"
                @click="close()">
                <button
                  type="button"
                  class="uk-button uk-width-1-1 uk-button-secondary"
                  uk-toggle="target: #offscreen-basket">{{ $getCMSEntry(global_labels,'basket_to_shop', 'Fortsätt handla') }}</button>
              </div>
            </div>
            <div
              v-else
              class="uk-text-center uk-text-small uk-margin-small">
              {{ $getCMSEntry(global_labels,'basket_nothing_in_basket', 'Du har inte lagt något i varukorgen ännu!') }}
            </div>
          </div>
          <div v-if="extensionlist" class="uk-padding-small uk-width-1-1 uk-width-1-2@m"> <!-- EXTENSIONS -->
            <h3>{{ extensionlist.Title }}</h3>
              <Alert
                v-if="errors.length > 0"
                :errorlist="errors"
                message=""
              />
            <table
                class="uk-table uk-table-justify uk-table-divider uk-margin-remove"
                style="color:#333333;font-size:0.7rem">
              <thead style="font-size:0.7rem">
              </thead>
              <tbody
                  class="uk-background-default">
                   <template v-for="extension in extensionlist.ArticleList">
                      <tr
                      :key="extension.ExtensionId"
                      uk-scrollspy="target: > td; cls: uk-animation-slide-left; repeat: true; delay: 250"
                      >
                      <td style="padding-left:6px;" class="uk-width-1-3"> <!-- BILD -->
                        <img
                          class="uk-width-1-1"
                          :src="extension.ImageName"
                          :alt="extension.ProductName"/>
                      </td>
                      <td class="article-data uk-width-2-3"> <!-- ARTIKELDATA -->
                        <span class="article-name">
                          <div class="ext-container">
                            <div>{{ extension.TeamName }}</div>
                            <div class="uk-text-bold">{{ extension.ProductName }}</div>
                            <div class="uk-text-bold uk-text-danger">{{ extension.PriceOnSaleDisplay }}</div>
                          </div>
                          <div> <!-- DROP & KNAPP -->
                              <div class="uk-width-3-4">
                                <select
                                  v-model="extension.SizeId"
                                  class="uk-select"
                                  style="font-size:0.75rem; height:30px; margin-top: 5px;"
                                  :disabled="extension.IsOneSize"
                                  >
                                  <option v-if="!extension.IsOneSize" value="-1">{{$getCMSEntry(global_labels,'article_details_choose_size', 'Välj storlek')}}</option>
                                  <option
                                    v-for="size in extension.SizeList"
                                    :value="size.Value"
                                    :key="size.Value">{{ size.Name }}
                                  </option>
                                </select>
                              </div>
                              <button
                                style="font-size:0.75rem; white-space: nowrap;"
                                class="uk-width-3-4 ext-button"
                                @click="addToCartFromExtension(extension)"
                              >{{ $getCMSEntry(global_labels,'article_details_add_to_cart_ext', 'Köp') }}</button>
                          </div>
                        </span>
                      </td>
                      </tr>
                    </template>
              </tbody>
              <tfoot>
              </tfoot>
            </table>
            <div class="spacer-below-extensions"></div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import VoucherCode from '@/components/voucher/VoucherCode'
import Alert from '@/components/Alert'

export default {
  async fetch() {
  },
  components:{
    VoucherCode,
    Alert,
  },
  computed: {
    ...mapGetters({
      cart: 'basket/cart',
      counter: 'basket/counter',
      global_labels:'labels'})
  },
  watch:{
    cart(newCart, oldCart) {
        this.getExtensionListForCart()
    },
    counter(oldQuery, newQuery){
      if(newQuery<1){
        try{
          localStorage.removeItem('voucher')
        }catch(err){

        }
      }
    },
    errors() {
      setTimeout(() => {
        this.errors = []
      }, 8000);
    },
  },
  data(){
    return{
      thumb_src:process.env.THUMB_SRC,
      labels: [],
      cartextensions: null,
      extensionlist: null,
      isSubmitting:false,
      errors: [],
    }
  },
  mounted(){
    try{
      if(localStorage.voucher!=undefined){
        this.$axios.setHeader('x-voucherid', this.voucher.VoucherId)
      }
    }catch(err){
      console.log(err)
    }
    this.updateCart()

  },
  methods:{
    async updateCart(){
      var _this = this
      _this.getExtensionListForCart()
      await this.$axios.$get('/webapi/'+this.$i18n.locale+'/cart/Get')
      .then(res => {
        _this.$store.commit('basket/add', res)
        _this.$cookies.set('session', res.SessionId)
        _this.$axios.setHeader('x-session', res.SessionId)
      })
      .catch(function (error) {

      })
    },
    async getExtensionListForCart() {
      try {
        const extensionlist = await this.$axios.$get('/webapi/'+this.$i18n.locale+'/Extension/GetExtensionListForCart?sizeId=0');
        this.extensionlist = extensionlist
      } catch (err) {
        console.log(err);
      }
    },
    close(){
      let _el = document.getElementById('offscreen-basket')
      UIkit.modal(_el).hide();
    },
    async addToCartFromExtension(extension) {
      let _this = this
      _this.errors = []
      if (extension.SizeId > -1) {
          _this.isSubmitting = true
          await this.$axios.post('/webapi/'+this.$i18n.locale+'/cart/PostAddToCart',{
            AddOn: null,
            ArticleId: extension.ProductId,
            Quantity: 1,
            SizeId: extension.SizeId,
            Id: 0,
            ExtensionId: extension.ExtensionId,
          }
        ).then(function (response) {
          _this.isSubmitting = false
          if(response.data.ErrorList){
            _this.errors = response.ErrorList[0]
          }else{
            _this.$store.commit('basket/add', response.data)
          }
        })
        .catch(function (error) {
          _this.isSubmitting = false
          console.log(error)
        })
      }else{
        this.errors = [{Name:'Err', Value:this.$getCMSEntry(this.global_labels,'article_details_forgot_choose_size', 'Du glömde välja storlek!')}]
      }
    },
    async deleteFromCart(id){
      let _this = this
      await this.$axios.delete('/webapi/'+this.$i18n.locale+'/cart?id='+id
      ).then(function (response) {
      _this.$store.commit('basket/add', response.data)
      })
      .catch(function (error) {
      console.log(error)
      })
    },
  }
};
</script>
<style lang="scss">
#offscreen-basket .uk-offcanvas-bar{
  color:#333;
}
.basket-ribbon{
  height:80px;
  background: $global-cart-header;
}
.uk-table td, .uk-table th {
    padding: 8px 6px;}

.total{
  text-align:right;
}
#offscreen-basket.uk-modal-full {
  background: rgba(0, 0, 0, 0.6);
}
#offscreen-basket .uk-modal-dialog {
  margin-left: auto;
  max-width:55vw !important;
  @media only screen and (max-width: 600px) {
    max-width:90vw !important;
  }
}
#offscreen-basket .uk-modal-dialog-no-extensions {
  margin-left: auto;
  max-width: 23vw !important;
  @media only screen and (max-width: 600px) {
    max-width:90vw !important;
  }
}
.thumb-image{
  width:40px;
  > img{
    max-width:40px;
  }
}
.ext-button {
  margin-top: 5px;
  height: 30px;
  background-color: #A91C30;
  border: 0px;
  border-radius: 15px;
  color: white;
  font-family: 'Lato', sans-serif;
  font-size: 14px;
  transition: cubic-bezier(0.075, 0.82, 0.165, 1) 1s;
  &:hover {
    transform: scale(1.04);
    cursor: pointer;
  }
}
.spacer-below-extensions {
  height: 150px;
}
</style>