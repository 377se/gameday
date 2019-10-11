<template>
  <section>
    <div class="uk-container uk-padding-small">
      <div
        class="uk-grid-small uk-child-width-1-2 uk-child-width-1-4@m"
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
      title: 'Gameday',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Gameday'
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
      productTypes: []
    }
  },
  async asyncData (context) {
    try {
      const [a, p] = await Promise.all([
        await context.app.$axios.$get(
          'https://beta.supporterprylar.se/webapi/Article/GetArticleList?pi=202&ci=185&fi=0'
        ),
        await context.app.$axios.$get(
          'https://beta.supporterprylar.se/webapi/Filter/GetProductTypeList'
        ) 
      ]);
      return {
        articles: a[0].ArticleList,
        productTypes: p
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
