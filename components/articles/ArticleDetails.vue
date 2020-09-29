<template>
  <section 
    class="uk-container uk-container-large uk-padding-small uk-padding-remove-top uk-background-default">
    <div 
      class="uk-grid uk-grid-small"
      uk-grid>
      <section class="uk-width-1-1 uk-width-1-2@m">
        <ArticlePageImages
          :images="article.Images"
          :label="article.Label!=null?article.Label:{}"
        />
      </section>

      <section class="uk-width-1-1 uk-width-1-2@m">
        <div class="uk-flex">
          <ArticlePageHeader 
            class="uk-width-expand"
            :title="article.Name" 
            :teamtitle="article.TeamName"
            :subtitle="article.Brand"
          />
          <!--img 
            class="uk-width-auto"
            :src="article.BrandImage" 
            :alt="article.Brand"
            style="width:10%"
          /-->
        </div>
        <div class="uk-width-1-1 uk-margin-small">
          <template
              v-if="article.DiscountType==1">
              <span 
                class="your-price"
                >{{ article.DiscountedPriceDisplay }}</span> 
              <span 
                class="orig-price"
                :class="{'line-through':article.DiscountedPriceDisplay}">
                ({{$getCMSEntry(global_labels,'article_details_original_price', 'ord.')}} {{ article.PriceDisplay }})
              </span>
            </template>
            <template
              v-else-if="article.DiscountType==2">
              <span 
                class="your-price"
                >{{ article.PriceDisplay }}</span> 
              <span 
                v-if="memberprices"
                class="orig-price">
                ({{$getCMSEntry(global_labels,'article_details_member', 'medlem')}} {{ article.DiscountedPriceDisplay }})
              </span>
            </template>
            <template
              v-else>
              <span 
                class="your-price"
                >{{ article.PriceDisplay }}</span>
            </template>
        </div>
        <div
          v-if="!article.IsOneSize" 
          class="uk-flex uk-child-width-expand">
          <div>
            <strong>{{$getCMSEntry(global_labels,'article_details_choose_size', 'Välj storlek')}}</strong>
          </div>
          <div
            v-if="false" 
            class="uk-text-right">
            <a href="#">{{$getCMSEntry(global_labels,'article_details_size_guide', 'Storleksguide')}}</a>
          </div>
        </div>
        <div 
          v-if="!article.IsOneSize"
          class="uk-grid uk-grid-small uk-margin-small uk-width-1-1"
          uk-grid>
          <div
            v-for="size in article.SizeList"
            :key="size.Value"
            class="uk-width-1-3 uk-width-1-4@l uk-grid-margin">
            <button 
              type="button"
              class="button-add-to-cart uk-button uk-width-1-1"
              :class="{'uk-button-default':chosenSize!==size.value, 'uk-button-primary':chosenSize===size.Value, 'uk-disabled':size.ItemsInStock<=0}"
              @click.prevent="setSize(size.Value)">
              {{size.Name}}
              <span 
                v-if="size.ItemsInStock<=0"
                class="sold-out">{{$getCMSEntry(global_labels,'article_details_sold_out', 'Slutsåld')}}</span>
            </button>
          </div>
        </div>
        <form
          v-if="article.AddOn"
          class="uk-margin">
          <h4>{{$getCMSEntry(global_labels,'article_details_addon', 'Tillägg')}}</h4>
          <div class="uk-margin-small">
            <label>
              <input 
                type="checkbox"
                class="uk-checkbox"
                v-model="showNameNumber"
              /> {{$getCMSEntry(global_labels,'article_details_show_name_number', 'Namn- och/eller nummer')}}
            </label>
          </div>
          <div v-if="showNameNumber">
            <div class="uk-margin-small">
              <select 
                v-model="nameNumber"
                @change="setPrint()"
                class="uk-select">
                <option value="">{{$getCMSEntry(global_labels,'article_addon_names', 'Välj spelare eller skriv in eget namn och nummer')}}</option>
                <option 
                  v-for="name in article.AddOn.Names"
                  :value="name"
                  :key="name">{{ name.Name }}, {{ name.Number }}</option>
              </select>
            </div>
            <div class="uk-margin-small uk-flex uk-grid uk-grid-small">
              <div class="uk-width-1-2">
                <label>{{$getCMSEntry(global_labels,'article_addon_name', 'Namn')}}<br>(+ {{ article.AddOn.DisplayPriceName }})</label>
                <input 
                  type="text"
                  class="uk-input uk-width-1-1"
                  v-model="printName">
              </div>
              <div class="uk-width-1-2">
                <label>{{$getCMSEntry(global_labels,'article_addon_number', 'Nummer')}}<br>(+ {{ article.AddOn.DisplayPriceNumber }})</label>
                <input 
                  type="number"
                  class="uk-input uk-width-1-1"
                  v-model="printNumber">
              </div>
            </div>
          </div>
          <div class="uk-margin-small">
            <label>
              <input 
                type="checkbox"
                class="uk-checkbox"
                v-model="patches" 
              /> {{$getCMSEntry(global_labels,'article_details_patches', 'Premier League Patches')}} (+ {{ article.AddOn.DisplayPricePatches }})
            </label>
          </div>
        </form>
        <ButtonSubmit
          v-if="!article.IsSoldOut"
          :is-submitting="isSubmitting"
          :button-text="$getCMSEntry(global_labels,'article_details_add_to_cart', 'Lägg i varukorgen')"
          theme="uk-button uk-button-primary uk-width-1-1 uk-margin-small"
          :class="{'uk-button-disabled':chosenSize!==-1 && !article.IsOneSize}"
          @button-click="addToCart()"
        />
        <div v-else>
          <h4 class="uk-text-center">{{$getCMSEntry(global_labels,'article_details_sold_out', 'Slutsåld')}}</h4>
        </div>
        <button 
          v-if="false"
          type="button"
          class="uk-button uk-button-default uk-width-1-1"
          @click.prevent>
          {{$getCMSEntry(global_labels,'article_details_favourite', 'Favorit')}} <span uk-icon="heart"/>
        </button>

        <div class="uk-padding uk-padding-remove-horizontal">
          <ul uk-accordion>
            <li class="uk-open">
              <a class="uk-accordion-title" href="#">{{$getCMSEntry(global_labels,'article_details_description', 'Beskrivning')}}</a>
              <ArticlePageText 
                class="uk-accordion-content"
                v-bind:content="article.Description"/>
              
              
                <div v-if="article.IsPreorder" class="uk-alert-primary" uk-alert>
                  <p>{{ article.ExtraInformation }}</p>
                </div>
            

              <p>{{$getCMSEntry(global_labels,'article_details_article_number', 'Artikelnummer')}}: {{ article.ArticleNumber }}</p>
              <p>{{$getCMSEntry(global_labels,'article_details_article_material', 'Material')}}: {{ article.Material }}</p>
              <p>{{$getCMSEntry(global_labels,'article_details_article_color', 'Färg')}}: 
                <span v-for="c in article.Color" :key="c.Id">{{ c.Name }}</span>
              </p>
            </li>
          </ul>
        </div>

      </section>
      
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ArticlePageHeader from "@/components/articles/ArticlePageHeader";
import ArticlePageImages from "@/components/articles/ArticlePageImages";
import ArticlePageText from "@/components/articles/ArticlePageText";
import ArticlePageSizeGuide from "@/components/articles/ArticlePageSizeGuide";
import ArticlePageWashAdvice from "@/components/articles/ArticlePageWashAdvice";
import ButtonSubmit from "@/components/ButtonSubmit"

export default {
  components: {
    ArticlePageHeader,
    ArticlePageImages,
    ArticlePageText,
    ArticlePageSizeGuide,
    ArticlePageWashAdvice,
    ButtonSubmit
  },
  props: {
    article: {
      type: Object,
      default: () => ({
        AddOn: null,
        Name: "",
        Images: [],
        SizeList: [],
        Description: "",
        IsOneSize: false,
        TeamName: "",
        PriceDisplay: "",
        IsSoldOut: false
      }),
      required: false
    }
  },
  data() {
    return{
      chosenSize:-1,
      isSubmitting:false,
      memberprices: process.env.MEMBER_PRICES,
      printName:'',
      printNumber: '',
      patches: false,
      showNameNumber: false,
      nameNumber: ''
    }
  },
  jsonld() {
    var article = this.article
    return {
      '@context': 'http://schema.org',
      '@type': 'Product',
      "productID":article.ArticleNumber,
      "name":article.Name,
      "description":article.Description,
      "url": process.env.SITE_URL + this.$route.path,
      "image": process.env.DETAILS_SRC + article.Images[0].Name,
      "brand": article.Brand,
      "offers": [
        {
          "@type": "Offer",
          "price": article.Price.toFixed(2),
          "priceCurrency": process.env.CURRENCY_CODE,
          "itemCondition": "https://schema.org/NewCondition",
          "availability": "https://schema.org/InStock"
        }
      ]
    };
  },
  computed: {
    ...mapGetters({
      global_labels:'labels'})
  },
  watch: {
    showNameNumber: function(oldQ, newQ){
      if(oldQ){
        this.printName = ''
        this.printNumber = ''
      }
    }
  },
  mounted() {
    if(this.article.IsOneSize){
      if(this.article.SizeList.length>0 && this.article.SizeList[0].ItemsInStock>0){
        this.chosenSize=this.article.SizeList[0].Value
      }
    }
  },
  methods:{
    setPrint(){
      this.printName = this.nameNumber.Name
      this.printNumber = this.nameNumber.Number
    },
    setSize(size){
      this.chosenSize=size
    },
    async addToCart(){
      let _this = this
      if(this.chosenSize>-1){
          this.isSubmitting = true
          await this.$axios.post('/webapi/cart/PostAddToCart',{
            AddOn: {Name:this.printName, Number:this.printNumber, Patches:this.patches, PrintTypeId:1},
            ArticleId: this.article.Id,
            Quantity: 1,
            SizeId: this.chosenSize
          }
        ).then(function (response) {
          _this.isSubmitting = false
          if(response.data.ErrorList){
            UIkit.modal.alert(response.data.ErrorList[0].Value)
          }else{
            _this.$store.commit('basket/add', response.data)
            UIkit.modal('#offscreen-basket').show();
            try{
            _this.$gtm.push({event: 'AddToCart', content:{
              content_name: _this.article.Name, 
              content_category: _this.article.HeadCategory,
              content_ids: [_this.article.ArticleNumber],
              content_type: 'product',
              value: _this.article.Price.toFixed(2),
              currency: process.env.CURRENCY_CODE
            }});
            }catch(err){
              console.log(err)
            }   
          }
          //console.log(response)
        })
        .catch(function (error) {
          _this.isSubmitting = false
          console.log(error)
        })
      }else{
        UIkit.modal.alert(this.$getCMSEntry(this.global_labels,'article_details_forgot_choose_size', 'Du glömde välja storlek!'))
      }
    },
  }
};
</script>

<style lang="scss">
.uk-button.button-add-to-cart{
  border-radius:3px;
  line-height:45px;
  padding-left:2px;
  padding-right:2px;
  text-align:center;
}
.uk-button.uk-disabled{
  color:#ccc;
  position:relative;
}
.sold-out{
  display:block;
  width:100%;
  position:absolute;
  left:0;
  bottom:-15px;
  text-align:center;
  font-size:0.7rem;
}

.your-price{
  color:$global-primary-background;
  font-weight:bold;
}
.orig-price{
  font-weight:bold;
  color: #F7A803;
}
.line-through{
  text-decoration:line-through;
}
.orig-price.line-through{
  font-weight:normal;
}
</style>
