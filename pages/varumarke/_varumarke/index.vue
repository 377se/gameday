<template>
  <section>
    <div class="uk-container uk-padding-small">
      <h1>{{ brand.Name }}</h1>
      <div v-html="brand.Description"/>
    </div>
    <div class="uk-container uk-padding-small">
      <div
        class="uk-grid uk-grid-small uk-child-width-1-2 uk-child-width-1-4@m"
        uk-height-match="target: > a > .uk-card"
        uk-grid>
        <ArticleCardSimple
          v-for="article in brand.ArticleList"
          :key="article.Id"
          :article="article"
          :url="`/varumarke/${$route.params.varumarke}/${article.SeoName}`"
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
      title: this.brand.MetaTitle,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.brand.MetaDescription
        },
        {
          hid: 'og:title',
          name:  'og:title',
          content:  this.brand.MetaTitle,
        },
        {
          hid: 'og:description',
          name:  'og:description',
          content: `${this.brand.MetaDescription}`.replace(/<\/?[^>]+(>|$)/g, ""),
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
      brand: {}
    }
  },
  async asyncData (context) {
    try {
      const [a] = await Promise.all([
        await context.app.$axios.$get(
          '/webapi/Article/GetArticleListByBrand?brandName=' +context.route.params.varumarke
        )
      ]);
      return {
        brand: a
      };
    } catch (err) {
      console.log(err);
      console.log(err.request);
    }

  }
}
</script>
<style lang="scss">

</style>
