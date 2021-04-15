<template>
  <div
      class="uk-slider gd-slider uk-background-secondary" 
      uk-slider="autoplay:true">
      <div 
        style="position:relative">
        <div uk-slider-container>
          <ul class="uk-slider-items uk-child-width-1-1 uk-text-small"> 
            <li>
              <div class="uk-text-center gd-slider-item uk-padding-small">
                <strong>{{ $getCMSEntry(labels,'rolling_text_one', 'Street Week Souther Swing - History in the Making') }}</strong>
              </div>
            </li>
            <li>
              <div class="uk-text-center gd-slider-item uk-padding-small">
                <strong>{{ $getCMSEntry(labels,'rolling_text_two', 'Street Week Souther Swing - History in the Making') }}</strong>
              </div>
            </li>
            <li>
              <div class="uk-text-center gd-slider-item uk-padding-small">
                <strong>{{ $getCMSEntry(labels,'rolling_text_three', 'Street Week Souther Swing - History in the Making') }}</strong>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>  
</template>
<script>
export default {
  async fetch(){
    try{
      let [storyblok] = await Promise.all([
          this.$axios.$get("https://api.storyblok.com/v1/cdn/datasource_entries?dimension="+ this.$i18n.locale +"&datasource=fe-rolling-text-streetweek&token="+process.env.STORYBLOK +"&cv=1"+this.$store.getters.version)
      ]);
      
      this.labels = storyblok.datasource_entries
    }catch(error){
      console.log('No data sources '+error);
    }
  },
  data() {
    return {
      labels: [],
      story: process.env.STORYBLOK_LABELS
    }
  },
}
</script>
<style lang="scss" scoped>
.gd-slider{
  background:  #222224;
  color: #fcf8e2;
}
</style>