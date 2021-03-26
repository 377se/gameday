<template>
  <div
    v-editable="blok"
    class="uk-flex uk-grid-small uk-margin-medium-bottom uk-padding uk-padding-remove-horizontal uk-padding-remove-top uk-margin-large-top product-list-slider uk-flex-nowrap"
    uk-height-match="target: .uk-card">
    <ArticleCardSimple
      v-for="article in articles"
      :key="article.ProductId"
      :article="article"
      :url="(siteid==6)?`/article/${article.HeadCategorySeoName}/${article.SeoName}`:`/a/${article.ProductId}/${article.UrlSafeName}`"
    />
  </div>
</template>
<script>
import ArticleCardSimple from "@/components/articles/ArticleCardSimple";

export default {
  components:{
    ArticleCardSimple
  },
  props: {
    blok: {
      type: Object,
      required: true,
    }
  },
  data () {
    return {
      articles: [],
      siteid: process.env.SITE_ID
    }
  },
  mounted(){
    this.getList()
  },
  methods:{
    async getList(){
      let _params = '&brand=null&attribute=null&teamList=null&color=null&size=null&gender=null&sale=false&pageNum=1'
      let _producttype = this.blok.product_type_id?this.blok.product_type_id:null
      let _seoname = this.blok.category_id?this.blok.category_id:null
      let _pagesize = this.blok.page_size?this.blok.page_size:5
      var _this = this
      await this.$axios.get('/webapi/'+this.$i18n.locale+'/Article/getArticleListByCategoryId?lookUpBrand=false&productType='+_producttype+'&seoName='+_seoname+'&pageSize='+_pagesize+_params)
      .then(function(res){
        if(res.data.length>0){
          _this.articles = res.data[0].ArticleList
        }
      })
      .catch(function(err){
        console.log('productslist error')
        console.log(err)
      })
    }
  }
}
</script>
<style lang="scss">
.product-list-slider{
  overflow-y:hidden;
  overflow-x:scroll;
  flex-wrap:nowrap;
  margin-right:-15px;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none;  /* Internet Explorer 10+ */
  padding-bottom:15px;
  padding-right:15px;
}

.product-list-slider::-webkit-scrollbar { /* WebKit */
    width: 0;
    height: 0;
}

.product-list-slider > div > .uk-card{
  max-width: 60vw;
  width: 16.5625rem;
}
.product-list-slider > div:last-child{
  padding-right:15px;
}
@media (min-width: 1240px){
  .product-list-slider{
    justify-content:center;
  }
  .product-list-slider > div > .uk-card{
    max-width: 60vw;
    width: 14rem;
  }
  .product-list-slider > div:last-child{
    padding-right:0px;
  }

}

</style>