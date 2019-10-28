<template>
  <section>
    <h1>Varumärken</h1>
    <div class="uk-child-width-1-3@s uk-child-width-1-5@m uk-child-width-1-6@l" uk-grid>
      <div
        v-for="brand in brands"
        :key="brand.BrandId">
        <nuxt-link
          :to="'/varumarke/'+brand.SeoName">
          <div class="uk-card uk-card-default">
            <div class="uk-card-media-top">
              <img :src="brand.Image" alt="">
            </div>
            <div class="uk-card-body">
              <h3 class="uk-card-title">{{ brand.Name }}</h3>
            </div>
          </div>
        </nuxt-link>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  head () {
    return {
      title: '',//this.brands.MetaTitle,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: ''//this.brands.MetaDescription
        }
      ]
    }
  },
  data () {
    return {
      story: { content: {} },
      brands: []
    }
  },
  async asyncData (context) {
    try {
      const [a] = await Promise.all([
        await context.app.$axios.$get(
          'https://api.gameday.shopping/webapi/Brand/GetBrandList'
        )
      ]);
      return {
        brands: a
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
</style>

