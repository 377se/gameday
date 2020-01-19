<template>
  <section 
    class="uk-container uk-container-large uk-padding-small uk-padding-remove-top uk-background-default">
    <div 
      class="uk-grid uk-grid-small"
      uk-grid>
      <section class="uk-width-1-1 uk-width-1-2@m">
        <ArticlePageImages
          :images="article.Images"
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
          <span class="your-price">{{ article.DiscountedPriceDisplay }}</span> 
          <span 
            class="orig-price"
            :class="{'line-through':article.DiscountedPriceDisplay}">{{ article.PriceDisplay }}</span>
        </div>
        <div
          v-if="!article.IsOneSize" 
          class="uk-flex uk-child-width-expand">
          <div>
            <strong>Välj storlek</strong>
          </div>
          <div
            v-if="false" 
            class="uk-text-right">
            <a href="#">Storleksguide</a>
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
                class="sold-out">Slutsåld</span>
            </button>
          </div>
        </div>
        <button 
          v-if="!article.IsSoldOut"
          type="button"
          class="uk-button uk-button-primary uk-width-1-1 uk-margin-small"
          :class="{'uk-button-disabled':chosenSize!==-1 && !article.IsOneSize}"
          @click.prevent="addToCart()">
          Lägg i varukorgen
        </button>
        <div v-else>
          <h4 class="uk-text-center">Slutsåld</h4>
        </div>
        <button 
          v-if="false"
          type="button"
          class="uk-button uk-button-default uk-width-1-1"
          @click.prevent>
          Favorit <span uk-icon="heart"/>
        </button>

        <div class="uk-padding uk-padding-remove-horizontal">
          <ul uk-accordion>
            <li class="uk-open">
              <a class="uk-accordion-title" href="#">Beskrivning</a>
              <ArticlePageText 
                class="uk-accordion-content"
                v-bind:content="article.Description"/>
              <p>Artikelnummer: {{ article.ArticleNumber }}</p>
            </li>
          </ul>
        </div>
      </section>
      
    </div>
  </section>
</template>

<script>
import ArticlePageHeader from "@/components/articles/ArticlePageHeader";
import ArticlePageImages from "@/components/articles/ArticlePageImages";
import ArticlePageText from "@/components/articles/ArticlePageText";
import ArticlePageSizeGuide from "@/components/articles/ArticlePageSizeGuide";
import ArticlePageWashAdvice from "@/components/articles/ArticlePageWashAdvice";

export default {
  components: {
    ArticlePageHeader,
    ArticlePageImages,
    ArticlePageText,
    ArticlePageSizeGuide,
    ArticlePageWashAdvice
  },
  props: {
    article: {
      type: Object,
      default: () => ({
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
      chosenSize:-1
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
    setSize(size){
      this.chosenSize=size
    },
    async addToCart(){
      let _this = this
      if(this.chosenSize>-1){
          await this.$axios.post('/webapi/cart/PostAddToCart',{
            AddOn: null,
            ArticleId: this.article.Id,
            Quantity: 1,
            SizeId: this.chosenSize
          }
        ).then(function (response) {
          _this.$store.commit('basket/add', response.data)
          //console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
      }
    },
  }
};
</script>

<style lang="scss">
@import '~/assets/scss/vars.scss';
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
