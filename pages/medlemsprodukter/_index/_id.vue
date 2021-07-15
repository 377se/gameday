<template>
  <div 
    class="uk-modal-full uk-modal uk-open"
    style="display:block;">
    <div 
      class="uk-modal-dialog"
      style="min-height:100%;max-width:800px!important;margin-left:auto;">
      <div class="uk-modal-header uk-flex uk-flex-middle">
        <a
          :href="localePath('/')"
          @click.stop.prevent="$router.back()" 
          class="uk-icon uk-close"
          style="margin-left:-14px;"><svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg" data-svg="close-icon"><line fill="none" stroke="#000" stroke-width="1.1" x1="1" y1="1" x2="13" y2="13"></line><line fill="none" stroke="#000" stroke-width="1.1" x1="13" y1="1" x2="1" y2="13"></line></svg>
        </a>
        <h2 class="uk-modal-title uk-margin-remove uk-text-center">{{ articleName }}</h2>
      </div>
      
      <div 
        class="uk-modal-body uk-overflow-auto"
        style="padding:0;height:100vh;"
        uk-overflow-auto
      >
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
            v-bind:article="article"
            :showrelated="false"/>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import ArticleDetails from "@/components/articles/ArticleDetails";

export default {
  transition (to, from) {
    if (!from) { return 'slide-right' }
    return 'slide-left'
  },
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
      ]
    }
  },
  components: {
    ArticleDetails
  },
  data() {
    return {
      article: {},
      articleName: '...'
    }
  },
  async fetch() {
    try {
      const url = `/webapi/${this.$i18n.locale}/Article/GetArticleDetailsExtension?teamName=null&articleId=${this.$route.params.articleid}&cartId=${this.$route.query.cartid}`;
      const article = await this.$axios.$get(url);
 
      article.CartId = this.$route.query.cartid
      this.article=article
      this.articleName=article.Name
    } catch (err) {
      console.log(err);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
