<template>
  <div
    class="uk-grid uk-grid-small product-list-slider"
    uk-grid
    uk-height-match="target: .uk-card">
    <ArticleCardSimple
      v-for="article in articles"
      :key="article.Id"
      :article="article"
      :url="`/lag/${blok.sport}/${article.HeadCategorySeoName}/${article.SeoName}`"
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
      articles: []
    }
  },
  mounted(){
    this.getList()
  },
  methods:{
    async getList(){
      var _this = this
      await this.$axios.get('/webapi/Article/GetArticleListSelection?seoName='+_this.blok.team_seo_name+'&numberOfItems=5&productType='+_this.blok.product_type_seo_name)
      .then(function(res){
        if(res.data.length>0){
          _this.articles = res.data[0].ArticleList
        }
      })
      .catch(function(err){
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