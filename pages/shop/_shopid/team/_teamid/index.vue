<template>
  <section>
    <div class="uk-container uk-padding-small">
      <h1>{{ metadata.SeoTitle }}</h1>
      <div v-html="metadata.SeoContentDescription"/>
    </div>
    <div class="uk-container uk-padding-small">
      <div
        class="uk-grid uk-grid-small uk-child-width-1-2 uk-child-width-1-4@m"
        uk-height-match="target: > a > .uk-card"
        uk-grid>
        <ArticleCardSimple
          v-for="article in articles"
          :key="article.Id"
          :article="article"
        />
      </div>
    </div>
  </section>
</template>
<script>
import ArticleCardSimple from "@/components/articles/ArticleCardSimple";
export default {
  head () {
    return {
      title: this.metadata.MetaTitle,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.metadata.MetaDescription
        },
        {
          hid: 'og:title',
          name:  'og:title',
          content:  this.metadata.MetaTitle,
        },
        {
          hid: 'og:description',
          name:  'og:description',
          content: `${this.metadata.MetaDescription}`.replace(/<\/?[^>]+(>|$)/g, ""),
        }
      ]
    }
  },
  components:{
    ArticleCardSimple
  },
  data () {
    return {
      story: { content: {} },
      articles: [],
      metadata: {}
    }
  },
  async asyncData (context) {
    try {
      const [a,m] = await Promise.all([
        await context.app.$axios.$get(
          '/webapi/Article/GetArticleList?pi='+context.route.params.shopid+'&ci='+context.route.params.teamid+'&fi=0'
        ),
        await context.app.$axios.$get(
          '/webapi/metadata/GetFilterMetaData?pi=0&ci='+context.route.params.teamid+'&fi=0'
        )
      ]);
      return {
        articles: a[0].ArticleList,
        metadata: m
      };
    } catch (err) {
      console.log(err);
      console.log(err.request);
    }

  }
}
</script>
<style lang="scss">
@import '~/assets/scss/vars.scss';

.lfc-green{
  color: $global-secondary-background;
}
</style>
