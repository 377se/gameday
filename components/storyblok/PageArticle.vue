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
        <SeoHead
          v-if="article"
          :title="article.MetaTitle"
          :description="`${article.MetaDescription}`.replace(/<\/?[^>]+(>|$)/g, '')"
          :canonical="metadata.Canonical"
          :lang-hrefs="metadata.LangHref"
          :image="detailsSrc + article.Images[0].Name" />
        <div class="uk-container uk-container-large uk-padding-small uk-padding-remove-top">
          <ul
            v-if="metadata.Breadcrumb && metadata.Breadcrumb.length>0" 
            class="uk-breadcrumb">
            <li>
              <nuxt-link :to="localePath('/')">
                <span style="vertical-align: bottom;
                  margin-bottom: 2px;" uk-icon="icon:home;ratio:0.7"/></nuxt-link></li>
            <li
              v-for="(b,index) in metadata.Breadcrumb[0].ItemList"
              :key="index">
              <nuxt-link 
                v-if="b.Url"
                :to="localePath(b.Url)">{{ b.Name }}</nuxt-link>
              <span v-else>{{ b.Name }}</span>
            </li>
          </ul>
        </div>
        <ArticleDetails 
          v-if="article"
          v-bind:article="article"
          :metadata="metadata"
          :league="league"/>
      </template>
  </div>
</template>

<script>
import ArticleDetails from "@/components/articles/ArticleDetails";

export default {
  components: {
    ArticleDetails
  },
  data() {
    return {
      article: null,
      detailsSrc: process.env.DETAILS_SRC,
      metadata: {Canonical:this.$route.path, LangHref:[]},
      siteid: process.env.SITE_ID,
      league:''
    }
  },
  async fetch() {
    try {
      const url = `/webapi/${this.$i18n.locale}/Article/GetArticleDetailsById?teamName=null&articleId=${this.$route.params.id}`;
      const metadataurl = `/webapi/${this.$i18n.locale}/MetaData/GetMetaData?url=/a/${this.$route.params.id}/${this.$route.params.slug}`;
      const article = await this.$axios.$get(url);
      this.article=article

      const metadata = await this.$axios.$get(metadataurl);
 
      this.metadata = metadata
      // ✅ Unified Tracking - Single call distributes to GTM, Google Ads, Meta, GA4
      // Only track on client-side (not during SSR)
      if (process.client && this.$track && this.$track.viewItem) {
        try {
          this.$track.viewItem(this.article)
        } catch(err) {
          // Silent - tracking errors don't block page
        }
      }

      try{
        this.league=this.metadata.Breadcrumb[0].ItemList[0].Name
      }catch(err){
        console.log(err)
      }

    } catch (err) {
      console.log(err);
      this.$nuxt.error({
          statusCode: 404,
          message: err.response.data,
        });
    }
  }
};
</script>

<style lang="scss">
</style>
