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
        <div class="uk-flex uk-flex-middle">
          <ArticlePageHeader 
            class="uk-width-expand"
            :title="article.ProductName" 
            :teamtitle="article.TeamName"
            :subtitle="article.BrandName"
          />
          <div
            class="uk-width-1-6">
            <img 
              class="uk-width-auto"
              :src="brand_src+article.BrandImage" 
              :alt="article.BrandName"
            />
          </div>
        </div>

        <div class="uk-width-1-1 uk-margin-small price-details">
          <template
              v-if="article.DiscountType==1">
              <span 
                class="sale-price"
                >{{ article.PriceOnSaleDisplay }}</span> 
              <span 
                class="orig-price"
                :class="{'line-through':article.PriceOnSaleDisplay}">
                ({{$getCMSEntry(global_labels,'article_details_original_price', 'ord.')}} {{ article.PriceDisplay }})
              </span>
            </template>
            <template
              v-else-if="article.DiscountType==2">
              <span 
                class="orig-price"
                >{{ article.PriceDisplay }}</span> 
              <span 
                v-if="memberprices"
                class="your-price">
                ({{$getCMSEntry(global_labels,'article_details_member', 'medlem')}} {{ article.PriceOnSaleDisplay }})
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
          theme="uk-button uk-button-primary uppercase uk-width-1-1 uk-margin-small"
          :class="{'uk-button-disabled':chosenSize!==-1 && !article.IsOneSize}"
          @button-click="addToCart()"
        />
        
        <div v-else class="uk-alert-danger" uk-alert>
                  <p class="uk-text-center">{{$getCMSEntry(global_labels,'article_details_sold_out', 'Slutsåld')}}</p>
                </div>

        <button 
          v-if="false"
          type="button"
          class="uk-button uk-button-default uk-width-1-1"
          @click.prevent>
          {{$getCMSEntry(global_labels,'article_details_favourite', 'Favorit')}} <span uk-icon="heart"/>
        </button>

        <div class="uk-padding uk-padding-remove-horizontal uk-padding-remove-bottom">
          <ul uk-accordion>
            <li class="uk-open">
              <a class="uk-accordion-title" href="#">{{$getCMSEntry(global_labels,'article_details_description', 'Beskrivning')}}</a>
              <ArticlePageText 
                class="uk-accordion-content"
                v-bind:content="article.Description"/>
              
              
                <div v-if="article.IsPreorder" class="uk-alert-primary" uk-alert>
                  <p>{{ article.ExtraInformation }}</p>
                </div>
            

              <p>
                <strong>{{$getCMSEntry(global_labels,'article_details_article_number', 'Artikelnummer')}}:</strong> {{ article.ArticleNumber }}<br />
                <strong>{{$getCMSEntry(global_labels,'article_details_article_material', 'Material')}}:</strong> {{ article.Material }}<br />
                
                <strong>{{$getCMSEntry(global_labels,'article_details_article_color', 'Färg')}}:</strong> 
                <span v-for="(item, index) in article.Color" :key="item.Id">
                  {{ item.Name }}<span v-if="index != (article.Color.length - 1)">,</span>
                </span><br />
              
                <strong>{{$getCMSEntry(global_labels,'article_details_washing_advice', 'Tvättråd')}}</strong>:<br /> <i v-for="c in article.WashingGuide" :key="c.IconId" class="washing-instructions" :class="c.IconName"/>
              </p>
            </li>
          </ul>
        </div>

        <div v-if="article.SizeGuide" class="uk-padding-small uk-padding-remove-horizontal uk-padding-remove-bottom">
          <ul uk-accordion>
              <li class="uk-open">
                <a class="uk-accordion-title" href="#">Storleksguide</a>
                <div class="uk-accordion-content uk-margin-remove-top">

                  <div class="uk-overflow-auto">
                    <table class="uk-table uk-table-condensed uk-text-nowrap uk-table-striped">
                          <thead>
                            <tr>
                              <th>&nbsp;</th>
                              <th v-for="sizeHeading in article.SizeGuide" :key="sizeHeading.DisplaySize" class="uk-text-center">{{ sizeHeading.DisplaySize }}</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="line in article.SizeGuide[0].DisplayProperties.length" :key="line">
                              <td>{{ showLegend(line-1, article.SizeTypeId) }}</td>
                              <td v-for="sizeValue in article.SizeGuide" :key="sizeValue.Value" class="uk-text-center">{{ sizeValue.DisplayProperties[line-1].Value }}</td>
                            </tr>
                          </tbody>
                    </table>
                  </div>

                </div>
              </li>
          </ul>
        </div>
      </section>

      <section 
        v-if="relatedarticles.length > 0"
        class="uk-width-1-1">
        <h3>{{$getCMSEntry(global_labels,'more_products', 'Fler produkter')}}</h3>
        <div
          class="uk-grid uk-grid-small uk-width-1-1 uk-child-width-1-2 uk-child-width-1-3@s uk-child-width-1-4@m uk-child-width-1-5@l"
          uk-grid
          uk-height-match="target: .uk-card">
    
          <ArticleCardSimple
            v-for="article in relatedarticles"
            :key="article.ProductId"
            :article="article"
            :url="(siteid==6)?`/article/${article.TeamNameSeo}/${article.UrlSafeName}`:`/a/${article.ProductId}/${article.UrlSafeName}`"
          />
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
import ArticleCardSimple from "@/components/articles/ArticleCardSimple"; //Related articles to be shown

export default {

  async fetch(){
    //Fetch related articles
    try {
      const [a] = await Promise.all([
        this.$axios.$get(
          '/webapi/'+this.$i18n.locale+'/Article/GetRelatedArticleList?categoryId='+this.article.CategoryId+'&productId='+this.article.ProductId+'&productTypeId='+this.article.ProductTypeId
        )
      ]);
      this.relatedarticles=a.ArticleList
    } catch (err) {
      console.log('Related articles error')
      console.log(err);
      console.log(err.request);
    }
  },
  components: {
    ArticlePageHeader,
    ArticlePageImages,
    ArticlePageText,
    ArticlePageSizeGuide,
    ArticlePageWashAdvice,
    ButtonSubmit,
    ArticleCardSimple
  },
  props: {
    article: {
      type: Object,
      default: () => ({
        Id: 0,
        ProductTypeId:0,
        CategoryId:0,
        AddOn: null,
        Name: "",
        Images: [],
        SizeList: [],
        SizeGuide: [],
        Description: "",
        IsOneSize: false,
        TeamName: "",
        TeamNameSeo: "",
        PriceDisplay: "",
        IsSoldOut: false,
        CartId: 0
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
      nameNumber: '',
      relatedarticles: [],
      siteid: process.env.SITE_ID,
      brand_src:process.env.BRAND_SRC,
    }
  },
  jsonld() {
    var article = this.article
    return {
      '@context': 'http://schema.org',
      '@type': 'Product',
      "productID":article.ArticleNumber,
      "name":article.MetaTitle,
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
      global_labels:'labels'}),
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
    
    showLegend(line, sizeTypeId) {
      if (sizeTypeId==1 || sizeTypeId==2) {
        return line==0 ? 'Längd' : 'Bredd'
      } else {
        return line==0 ? 'EU' : line==1 ? 'UK' : 'US'
      }
    },
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
          await this.$axios.post('/webapi/'+this.$i18n.locale+'/cart/PostAddToCart',{
            AddOn: {Name:this.printName, Number:this.printNumber, Patches:this.patches, PrintTypeId:1},
            ArticleId: this.article.ProductId,
            Quantity: 1,
            SizeId: this.chosenSize,
            Id: this.article.CartId?this.article.CartId:0
          }
        ).then(function (response) {
          _this.isSubmitting = false
          if(response.data.ErrorList){
            UIkit.modal.alert(response.data.ErrorList[0].Value)
          }else{
            _this.$store.commit('basket/add', response.data)
            if(response.data.CartId && response.data.CartId>0 && response.data.IsMemberPackage){
              _this.$router.push(_this.localePath('/extension/'+_this.$route.params.id+'?cartid='+response.data.CartId))
            }else{
              UIkit.modal('#offscreen-basket').show();
            }
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


.price-details {
  
  font-weight:bolder;
  font-size: 1.2rem;
  display:block;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  margin-bottom: 30px;
  padding:10px 0;
}
.price-details .your-price{
  color:$global-primary-background;
  font-size: 1.5rem;
  font-family: $base-heading-font-family;
}

.price-details .sale-price{
  color:$global-primary-background;
  color: $discounted-price-color;
  font-size: 1.5rem;
  font-family: $base-heading-font-family;
}

.price-details .orig-price{
  font-weight:bold;
  font-size: 1.5rem;
  color:#000000;
}
.line-through{
  text-decoration:line-through;
}
.orig-price.line-through{
  font-weight:normal;
}

.washing-instructions{
  font-size:1.5rem;
  margin-right:10px;
}

</style>
