<template>
  <div class="uk-padding-small uk-padding-remove-horizontal uk-padding-remove-bottom">
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
        <ArticleDetails 
          v-bind:article="article"/>
      </template>
  </div>
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
          content: `${this.article.MetaDescription}`.replace(/<\/?[^>]+(>|$)/g, ""),
        }
      ],
      link:[
        {
          rel: 'canonical',
          hid: 'can',
          href: this.siteid<3?'/'+this.$i18n.locale+this.metadata.Canonical:this.metadata.Canonical
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
      metadata: {Canonical:this.$route.path},
      siteid: process.env.SITE_ID
    }
  },
  async fetch() {
    try {
      const url = `/webapi/${this.$i18n.locale}/Article/GetArticleDetailsById?teamName=null&articleId=${this.$route.params.id}`;
      const metadataurl = `/webapi/${this.$i18n.locale}/MetaData/GetMetadataByArticleId?articleId=${this.$route.params.id}`;
      const article = await this.$axios.$get(url);
      const metadata = await this.$axios.$get(metadataurl);
 
      this.article=article
      this.metadata = metadata
      var _this = this
      try{
        this.$gtm.push({event:'ViewContent',
          data: {
            content_name: _this.article.Name,
            content_category: _this.article.HeadCategory,
            content_ids: [_this.article.ArticleNumber],
            content_type: 'product',
            value: _this.article.Price.toFixed(2),
            currency: process.env.CURRENCY_CODE
          }
        })
      }catch(err){
        console.log(err)
      }
    } catch (err) {
      console.log(err);
    }
  }
};
</script>

<style lang="scss">
</style>
