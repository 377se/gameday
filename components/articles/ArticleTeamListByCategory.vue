<template>
  <section>
    <template v-if="$fetchState.pending">
      <div class="uk-container uk-container-large uk-padding-small">
        <content-placeholders :rounded="true">
          <content-placeholders-img />
          <content-placeholders-heading />
        </content-placeholders>
        <div class="uk-grid uk-grid-small uk-child-width-1-2 uk-child-width-1-3@s uk-child-width-1-4@m uk-child-width-1-5@l">
          <content-placeholders 
            v-for="p in 20"
            :key="p"
            :rounded="true"
            class="uk-padding-small">
            <content-placeholders-img 
            class="ph-img"/>
            <content-placeholders-text :lines="2" />
          </content-placeholders>
        </div>
      </div>
    </template>
    <template v-else>
        <div v-if="!sb">
          <h1 class="uk-margin-remove-top">{{ article.SeoTitle }}</h1>
          <img 
            v-if="article.SeoContentDescription !== null"
            :src="this.article.ImageThumb" 
            alt=""
            class="team-icon" />
        <div 
          :class="{'read-more':readmore}"
          @click="setReadMore()"
          v-html="article.SeoContentDescription"/>
        </div>
        <div 
          class="uk-container uk-container-large uk-padding-small">
          <h3
            v-if="producttypes!=null && producttypes.length>0"
            >{{ $getCMSEntry(global_labels,'header_categories', 'Kategorier') }}</h3>
          <div
            v-if="producttypes!=null && producttypes.length>0"
            class="uk-grid uk-grid-small uk-margin-bottom uk-margin-top category-list-slider"
            uk-grid
            >
            <div>
              <nuxt-link
                class="uk-label"
                :class="!$route.params.filterid?'uk-background-secondary':'uk-background-primary'"
                :to="localePath(`/c/${$route.params.parentid}/${$route.params.categoryid}/${$route.params.categoryname}`)"><span>{{ $getCMSEntry(global_labels,'category_all', 'Alla') }}</span></nuxt-link>
            </div>
            <div
              v-for="pt in producttypes"
              :key="pt.GarmentId"
              >
              <nuxt-link
                class="uk-label"
                :class="($route.params.filterid && $route.params.filterid==pt.GarmentId)?'uk-background-secondary':'uk-background-primary'"
                :to="localePath(`/c/${$route.params.parentid}/${$route.params.categoryid}/${$route.params.categoryname}/${pt.GarmentId}/${pt.SeoName}`)"><span>{{ pt.Name }}</span></nuxt-link>
            </div>
          </div>
          <div 
          class="ts-filter uk-flex uk-flex-middle uk-margin-small-bottom"
          uk-sticky="offset:118;width-element:body;bottom:true"
          style="z-index:3">
          <strong>{{ article.TotalNumberOfProducts }} {{ $getCMSEntry(global_labels,'info_products', 'produkter') }}</strong> 
          <FilterItems
            :product-types="producttypes"
            :colors="colors"
            :sizes="sizes"
            :gender="gender"
            :brands="brands"
            :teams="teamlist"
            :show_sale="true"/>
          </div>
          <div
            class="ts-article-list uk-grid uk-grid-small uk-child-width-1-2 uk-child-width-1-3@s uk-child-width-1-4@m uk-child-width-1-5@l"
            uk-grid
            uk-height-match="target: .uk-card">
            <ArticleCardSimple
              v-for="article in articles"
              :key="article.Id"
              :article="article"
              :url="`/a/${article.ProductId}/${article.UrlSafeName}`"
            />
            <div
              v-if="articles.length<1"
              class="uk-margin-bottom uk-margin-top" 
            >
              {{ $getCMSEntry(global_labels,'info_no_items_found', 'Vi hittade inga produkter för det aktuella urvalet.') }}
            </div>
          </div>
          <ul 
            v-if="article.TotalPages>1"
            class="uk-pagination uk-flex-center uk-margin-large uk-margin-bottom">
            <li>
              <a 
                href="#"
                @click.stop.prevent="previous()"><span uk-pagination-previous></span> {{ $getCMSEntry(global_labels,'paging_previous', 'Föregående') }}</a></li>
            <li><span>{{ pageNum }}/{{ article.TotalPages }}</span></li>
            <li>
              <a 
                href="#"
                @click.stop.prevent="next()">{{ $getCMSEntry(global_labels,'paging_next', 'Nästa') }} <span uk-pagination-next></span></a></li>
          </ul>
      </div>
    </template>
  </section>
</template>
<script>
import {mapGetters} from 'vuex'
import ArticleCardSimple from "@/components/articles/ArticleCardSimple";
import FilterItems from "@/components/filter/Filter";

export default {
  async fetch () {
    let pageNum = this.$route.query.page?this.$route.query.page:1
    let color = this.$route.query.color?this.$route.query.color:null
    let gender = this.$route.query.gender?this.$route.query.gender:null
    let productType = this.$route.query.producttype?this.$route.query.producttype:(this.$route.params.filterid?this.$route.params.filterid:null)
    let size = this.$route.query.size?this.$route.query.size:null
    let attribute = this.$route.query.attribute?this.$route.query.attribute:null
    let sale = this.$route.query.sale?this.$route.query.sale:false
    let brand = this.$route.query.brand?this.$route.query.brand:null
    let team = this.$route.query.team?this.$route.query.team:null
    
    try {
      const [a, p, c, s, g, b, t] = await Promise.all([
        this.$axios.$get(
          '/webapi/'+this.$i18n.locale+'/Article/getArticleListByCategoryId?pageSize=0&lookUpBrand=false&brand='+brand+'&attribute=null&teamList='+team+'&color='+color+'&size='+size+'&gender='+gender+'&productType='+productType+'&sale='+sale+'&pageNum='+ pageNum +'&seoName=' +this.$route.params.categoryid
        ),
        this.$axios.$get(
          `/webapi/${this.$i18n.locale}/Filter/GetProductTypeListByCategoryId?categoryId=${this.$route.params.categoryid}&teamName=null&brandName=null`
        ),
        this.$axios.$get(
          `/webapi/${this.$i18n.locale}/Filter/GetColourListByCategoryId?categoryId=${this.$route.params.categoryid}&teamName=null&garmentName=null&brandName=null`
        ),
        this.$axios.$get(
          `/webapi/${this.$i18n.locale}/Filter/GetSizeListByCategoryId?categoryId=${this.$route.params.categoryid}&teamName=null&garmentName=null&brandName=null`
        ),
        this.$axios.$get(
          `/webapi/${this.$i18n.locale}/Filter/GetGenderListByCategoryId?categoryId=${this.$route.params.categoryid}&teamName=null&garmentName=null`
        ),
        this.$axios.$get(
          `/webapi/${this.$i18n.locale}/Filter/GetBrandListByCategoryId?categoryId=${this.$route.params.categoryid}&teamName=null&garmentName=null`
        ),
        this.$axios.$get(
          `/webapi/${this.$i18n.locale}/Filter/GetTeamListByCategory?categoryId=${this.$route.params.categoryid}&productTypeId=0&brandId=0`
        )
      ]);
      this.articles=a.ArticleList
      this.producttypes=p
      this.colors=c
      this.sizes=s
      this.gender=g
      this.brands=b
      this.teamlist=t
      this.article=a
      this.pageNum=pageNum
    } catch (err) {
      console.log('_team error')
      console.log(err);
      console.log(err.request);
    }

  },
  components:{
    ArticleCardSimple,
    FilterItems
  },
  props: {
    sb: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  data () {
    return {
      article: {},
      articles: [],
      producttypes: [], //To filter on
      colors: [],
      sizes: [],
      gender: [],
      brands: [],
      teamlist: [],
      sale: [],
      pageNum: 1,
      totalPages:1,
      numOfProducts: 1,
      readmore: true,
      siteid: process.env.SITE_ID
    }
  },
  computed: {
    ...mapGetters({
      global_labels:'labels'})
  },
  watch: {
    '$route.query': function(oldQuery, newQuery){
      if((this._inactive === false || this._inactive===null) && JSON.stringify(newQuery) !== JSON.stringify(oldQuery)){
        window.scrollTo(0,0)
        this.$fetch()
      }
    }
  },
  methods:{
    setReadMore(){
      this.readmore=false
    },
    next(){
      if(this.pageNum<this.article.TotalPages){
        this.$router.push({query: {...this.$route.query, page: (parseInt(this.pageNum)+1)}})
      } 
    },
    previous(){
      if(this.pageNum>1){
        this.$router.push({query: {...this.$route.query, page: (parseInt(this.pageNum)-1)}})
      } 
    }
  }
}
</script>
<style lang="scss">
.ph-img{
  height:200px;
  margin-bottom:10px;
}
.read-more{
  max-height: 74px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
}
.read-more:after{
    content: "";
    opacity: 1;
    display: block;
    background: linear-gradient(rgba(255,255,255,0) 0%, rgba(255,255,255,1) 70%);
    position: absolute;
    bottom: 0;
    padding: 20px 10px 0;
    left: 0;
    width: 100%;
    box-sizing: border-box;
}
.team-icon {
  float: right;
  width: 70px;
}
</style>
