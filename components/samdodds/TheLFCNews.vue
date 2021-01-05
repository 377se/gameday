<template>
  <div class="uk-container lfc-news">
      <h3>Nyheter från LFC.se</h3>
    <div 
      class="lfc-slider uk-position-relative uk-background-primary uk-margin-large-bottom uk-border-rounded uk-padding-small"
      tabindex="-1"
      uk-slider>
      <ul class="uk-slider-items uk-grid-medium uk-grid-divider">
        <li class="lfc-slide uk-width-1-2@s uk-width-1-2@m  uk-width-1-3@l  uk-width-1-3@xl"
          v-for="article in lfc" :key="article.NewsId">
          <div class="lfc-date"> {{ article.CreatedDate }}</div>
          <div class="lfc-title"> {{ article.Title }}</div>
          <div class="uk-width-1-4">
            <img 
              class="lfc-image uk-float-left" 
              :src="article.Image" 
              :alt="article.Title"
              onerror="this.style.display='none'">
          </div>
          <div class="lfc-text">{{ article.Preamble }}</div>
          <div class="lfc-read-more"><strong><a target="_new" :href="article.Url">Läs mer...</a></strong></div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  async fetch(){
    try{
      let [lfc] = await Promise.all([
          this.$axios.$get('/webapi/'+this.$i18n.locale+'/BranchSe/GetNewsList')
      ]);

      this.lfc = lfc

    }catch(error){
      logger.error('No data sources '+error);
    }
  },
  data() {
    return {
      lfc: []
    }
  },
}
</script>
<style lang="scss">
  .lfc-news, .lfc-news a {
    color: #fff;
  }
  .lfc-news a:hover {
    text-decoration: underline;
  }
  .lfc-slider {
    overflow: hidden;
  }
  .lfc-news > h3 {
    margin-bottom: 0.5rem;
  }
  .lfc-date {
    font-size: 0.7rem;
  }
  .lfc-title {
    font-size: 1rem;
  }
  .lfc-image {
    margin: 0.5rem 0.4rem 0 0;
    border: 1px solid #fff;
  }
  .lfc-text {
    font-size: 0.8rem;
    line-height: 1.1rem;
    margin: 0.3rem 0 1rem 0;
  }
  .lfc-read-more {
    margin: 0 0 0.3rem 0;
    font-size: 0.8rem;
    text-align: right;
    position: absolute;
    bottom: -10px;
    right: 0;
  }
</style>