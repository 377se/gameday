<template>
  <section>
    <div class="uk-container uk-container-large uk-padding-small">
      <ul class="uk-breadcrumb">
        <li>
          <nuxt-link to="/">
            <span style="vertical-align: bottom;
              margin-bottom: 2px;" uk-icon="icon:home;ratio:0.7"/></nuxt-link></li>
        <li><nuxt-link :to="'/'+$route.params.league+'-shop'">{{ $route.params.league.toUpperCase() }}-shop</nuxt-link></li>
        <li><nuxt-link :to="'/lag/'+$route.params.league+'/'+$route.params.team">{{ article.HeadCategory }}</nuxt-link></li>
        <li><span>{{ article.Name }}</span></li>
      </ul>
    </div>
    <ArticleDetails v-bind:article="article"></ArticleDetails>
  </section>
</template>

<script>
import ArticleDetails from "@/components/articles/ArticleDetails";

export default {
  head () {
    return {
      title: this.article.SEO_Name,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.article.SEO_Description
        }
      ]
    }
  },
  components: {
    ArticleDetails
  },
  data() {
    return {
      article: {}
    };
  },
  async asyncData({ app, route }) {
    try {
      const url = `/webapi/article/GetArticleDetails?teamName=${
        route.params.team
      }&articleName=${route.params.article}`;
      const article = await app.$axios.$get(url);

      return { article };
    } catch (err) {
      console.log(err);
    }
  }
};
</script>

<style lang="scss" scoped>
  .uk-breadcrumb > * > * {
      font-size: 0.7rem;
  }
  .uk-breadcrumb > :nth-child(n+2):not(.uk-first-column):before{
    margin: 0px 5px;
  }
</style>
