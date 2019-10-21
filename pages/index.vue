<template>
  <section>
    <div class="uk-container uk-padding-small">
      
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
  }
}
</script>
<style lang="scss">
@import '~/assets/scss/vars.scss';
</style>
