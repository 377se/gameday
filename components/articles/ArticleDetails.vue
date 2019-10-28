<template>
  <section 
    class="uk-container uk-background-default">
    <div 
      class="uk-grid-small"
      uk-grid>
      <section class="uk-width-1-1 uk-width-3-5@m uk-width-xlarge@l">
        <ArticlePageImages
          :images="article.Images"
        />
      </section>

      <section class="uk-width-1-1 uk-width-2-5@m uk-width-large@l pad-left@m">
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
          <strong>{{article.PriceDisplay}}</strong>
        </div>
        <div
          v-if="!article.IsOneSize" 
          class="uk-flex uk-child-width-expand">
          <div>
            <strong>Välj storlek</strong>
          </div>
          <div class="uk-text-right">
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
            class="uk-width-1-3 uk-width-1-4@s uk-grid-margin">
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
          type="button"
          class="uk-button uk-button-primary uk-width-1-1 uk-margin-small"
          :class="{'uk-button-disabled':chosenSize!==-1 && !article.IsOneSize}"
          @click.prevent="addToCart()">
          Lägg i varukorgen
        </button>
        <button 
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
        PriceDisplay: ""
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
          await this.$axios.post('https://api.gameday.shopping/webapi/cart/PostAddToCart',{
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
.uk-button.button-add-to-cart{
  border-radius:3px;
  line-height:45px;
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
</style>
