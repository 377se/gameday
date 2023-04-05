<template>
  <section>
    <div class="uk-container uk-container-large uk-padding-small">
      <template v-if="$fetchState.pending">
        <div uk-grid class="uk-grid uk-grid-small uk-grid-stack">
          <section class="uk-width-1-1 uk-width-1-2@m">
            <content-placeholders
              :rounded="true">
              <content-placeholders-img 
                class="ph-article-img"/>
            </content-placeholders>
          </section>
          <section class="uk-width-1-1 uk-width-1-2@m">
            <content-placeholders
              :rounded="true">
              <content-placeholders-heading />
              <content-placeholders-text :lines="5" />
            </content-placeholders>
          </section>
        </div>
      </template>
      <template
        v-else>
        <ul class="uk-breadcrumb">
          <li>
            <nuxt-link to="/">
              <span style="vertical-align: bottom;
                margin-bottom: 2px;" uk-icon="icon:home;ratio:0.7"/></nuxt-link></li>
          <li><span>{{ article.Name }}</span></li>
        </ul>
        <ArticleDetails v-bind:article="article"></ArticleDetails>
      </template>
    </div>
  </section>
</template>

<script>
import ArticleDetails from "@/components/articles/ArticleDetails";

export default {
  head () {
    return {
      title: this.article.MetaTitle,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.article.MetaDescription
        },
        {
          hid: 'og:title',
          name:  'og:title',
          content:  this.article.MetaTitle,
        },
        {
          hid: 'og:description',
          name:  'og:description',
          content: `${this.article.MetaTitle}`.replace(/<\/?[^>]+(>|$)/g, ""),
        }
      ]
    }
  },
  components: {
    ArticleDetails
  },
  data() {
    return {
      article: {},
      shop:''
    }
  },
  async fetch() {
    try {
      const url = `/webapi/${this.$i18n.locale}/Article/GetArticleDetails?teamName=${
        this.$route.params.id
      }&articleName=${this.$route.params.slug}`;
      const article = await this.$axios.$get(url);

      this.article = article
      var _this = this
      try{
        /*this.$gtm.push({event:'ViewContent',
          data: {
            content_name: _this.article.Name,
            content_category: _this.shop + '/lag/'+_this.$route.params.league+'/'+_this.$route.params.team+'/'+article.HeadCategory,
            content_ids: [_this.article.ArticleNumber],
            content_type: 'product',
            value: _this.article.Price.toFixed(2),
            currency: process.env.CURRENCY_CODE
          }
        })*/
      }catch(err){
        console.log(err)
      }

    } catch (err) {
      console.log(err)
    }
  },
  activated(){
    if (this.$fetchState.timestamp <= Date.now() - 600000) {
      this.$fetch()
    }
  }
};
</script>

<style lang="scss" scoped>
  .ph-article-img{
    height:400px;
  }
</style>
