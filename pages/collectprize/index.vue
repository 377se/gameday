<template>

  <div>

    <!-- Images & Info -->
    <section class="uk-container uk-container-large uk-padding-small uk-background-default">

      <div class="uk-flex uk-flex-wrap">

        

        <transition name="fade" appear mode="out-in">
          <div v-if="thankYouMessageSwitch" key="notVisible">
        <!-- Article-images -->
        <section class="uk-width-1-1@s uk-width-1-2@m">
          <ArticlePageImages
            :images="collectPrizeDTO.Article.Images"
            :label={}
          />
        </section>

        <!-- Message, sizes and collect-button -->
          <section class="uk-width-1-1@s uk-width-1-2@m uk-padding-small">
              <h1>Grattis till vinsten {{collectPrizeDTO.WinnerName}}!</h1>
                <p>Du har vunnit en {{collectPrizeDTO.Article.ArticleName}}.
                <p>Välj önskad storlek nedan och klicka på "hämta priset" så levererar vi priset till dig så snabbt vi bara kan.</p>
                <p>Tack för att du är med och tävlar tillsammans med Official Supporters Club Sweden och Sam Dodds.</p>
                <p>YOU'LL NEVER WALK ALONE</p>

              <div 
                v-if="!collectPrizeDTO.Article.IsOneSize"
                class="uk-grid uk-grid-small uk-margin-small uk-width-1-1"
                uk-grid>
                <div
                  v-for="size in collectPrizeDTO.Article.SizeList"
                  :key="size.Value"
                  class="uk-width-1-2 uk-width-1-4@l uk-grid-margin">
                  <button 
                    type="button"
                    class="button-select-size uk-button uk-width-1-1"
                    :class="{'uk-button-default':chosenSize!==size.value, 'uk-button-primary':chosenSize===size.Value, 'uk-disabled':size.ItemsInStock<=0}"
                    @click.prevent="setSize(size.Value)">
                    {{size.Name}}
                    <span 
                      v-if="size.ItemsInStock<=0"
                      class="sold-out">{{$getCMSEntry(global_labels,'article_details_sold_out', 'Slutsåld')}}</span>
                  </button>
                </div>
              </div>

              <ButtonSubmit
                v-if="!collectPrizeDTO.Article.IsSoldOut"
                :is-submitting="isSubmitting"
                :button-text="$getCMSEntry(global_labels,'collect_prize', 'Hämta pris')"
                theme="uk-button uk-button-primary uppercase uk-width-1-1 uk-margin-small"
                :class="{'uk-button-disabled':chosenSize!==-1 && !collectPrizeDTO.Article.IsOneSize}"
                @button-click="postPrize()"
              />

          </section>
          </div>
        <!-- Thank you -->
          <section v-else key="visible" class="uk-width-1-1@s uk-width-1-2@m uk-padding-small">
            <div class="uk-background-primary uk-border-rounded uk-padding uk-width-1-1">
              <img src="/logos/samdodds_lfc.png" width="200px">
            </div>
            <h2 class="thankyou">{{this.thankYouMessage}}</h2>
          </section>

        </transition>

      </div>

    </section>

    <!-- App Features -->
    <section class="uk-width-1-1@s uk-width-1-1@m uk-background-primary uk-margin-bottom uk-padding" id="app-features">
        <div class="uk-flex uk-flex-wrap uk-flex-top uk-text-center">
          <div class="uk-width-1-1@s uk-width-1-3@l uk-padding-small">
            <img src="/icons/f_icon1.png" class="icons">
            <h2 class="uk-text-uppercase">För fans av fans.</h2>
            <p>Vårt motto är enkelt. Vi producerar produkter som vi själva vill ha.</p>
          </div>
        <div class="uk-width-1-1@s uk-width-1-3@l uk-padding-small">
          <img src="/icons/f_icon2.png" class="icons">
          <h2 class="uk-text-uppercase">Officiellt licensierade.</h2>
          <p>Vi har ett nära samarbete med Liverpool Football Club och är officiellt licensierade.</p>
        </div>
        <div class="uk-width-1-1@s uk-width-1-3@l uk-padding-small">
          <img src="/icons/f_icon3.png"  class="icons">
          <h2 class="uk-text-uppercase">Stort utbud.</h2>
          <p>Vi har en stor mängd med produkter och vi fyller på löpande.</p>
        </div>
        </div>
    </section>

  </div>

</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import ButtonSubmit from "@/components/ButtonSubmit"
import ArticlePageImages from "@/components/articles/ArticlePageImages";
import ArticlePageHeader from "@/components/articles/ArticlePageHeader";
import ArticleCardSimple from "@/components/articles/ArticleCardSimple";

export default {

  async fetch () {
    try {
      let [collectPrizeDTO] = await Promise.all([
        this.$axios.$get("/webapi/CollectPrize/GetPrize?guid=6F2A7D4F-AE7C-45DD-86ED-A04AF56515E0")
      ]);
      console.log(collectPrizeDTO)
      this.collectPrizeDTO = collectPrizeDTO
    } catch (err) {
      console.log(err)
    }
  },

  components:{
    ButtonSubmit,
    ArticlePageImages,
    ArticlePageHeader,
    ArticleCardSimple,
  },
  data () {
    return {
      chosenSize:-1,
      SizeList: [],
      IsOneSize: false,
      labels: [],
      errors: [],
      isSubmitting: false,
      collectPrizeDTO: null,
      Images: [],
      thankYouMessageSwitch: true,
      thankYouMessage: "",
    }
  },
    mounted() {
    if(this.collectPrizeDTO.Article.IsOneSize){
      if(this.collectPrizeDTO.Article.SizeList.length>0 && this.collectPrizeDTO.Article.SizeList[0].ItemsInStock>0){
        this.chosenSize=this.collectPrizeDTO.Article.SizeList[0].Value
      }
    }
  },
  methods:{
    setSize(size){
      this.chosenSize=size
      this.collectPrizeDTO.SelectedSizeId = this.chosenSize
      console.log(this.collectPrizeDTO)
    },
    async postPrize(){
          let _this = this

          if(this.chosenSize>-1){
              this.isSubmitting = true
            await this.$axios.post("/webapi/CollectPrize/PostPrize", _this.collectPrizeDTO)
            .then(function (response) {
              _this.isSubmitting = false

              _this.thankYouMessageSwitch = !_this.thankYouMessageSwitch
              _this.thankYouMessage = response.data.Message
              window.scrollTo(0,0)
              console.log(response.data.Message)

              if(response.data.ErrorList){
                UIkit.modal.alert(response.data.ErrorList[0].Value)
              }
            })
            .catch (function (error) {
              _this.isSubmitting = false
              console.log(error)
            })
          } else {
            UIkit.modal.alert(this.$getCMSEntry(this.global_labels,'article_details_forgot_choose_size', 'Du glömde välja storlek!'))
          }
    },
  },
  computed: {
    ...mapGetters({
      global_labels:'labels'}) 
  },

}
</script>
<style lang="scss" scoped>
#app-features, #app-features h2 {
  color: #fff;
  & .icons {
    width: 10%;
  }
}
.uk-button.button-select-size{
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
.fade-enter-active {
  transition: opacity 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}
.fade-leave-active {
  transition: opacity 0s cubic-bezier(1, 0.5, 0.8, 1);
}
.fade-enter {
  opacity: 0;
}
.fade-leave-to {
  opacity: 0;
}
.thankyou {
  margin-top: 20px;
}
</style>