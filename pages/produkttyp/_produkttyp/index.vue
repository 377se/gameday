<template>
  <section>
    <div class="uk-container uk-padding-small">
      <h1>{{ article.SeoTitle }}</h1>
      <div v-html="article.SeoContentDescription"/>
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
          :url="`/lag/${$route.params.league}/${$route.params.team}/${article.SeoName}`"
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
      title: this.article.MetaTitle,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.article.MetaDescription
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
      article: {},
      articles: []
    }
  },
  async asyncData (context) {
    try {
      const [a,m] = await Promise.all([
        await context.app.$axios.$get(
          '/webapi/Article/GetArticleListByProductType(string teamName, string productType)?teamName=' +context.route.params.team
        )/*,
        await context.app.$axios.$get(
          '/webapi/metadata/GetFilterMetaData?pi=0&ci='+context.route.params.teamid+'&fi=0'
        )*/
      ]);
      return {
        articles: a[0].ArticleList,
        article: a[0]/*,
        metadata: m*/
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
