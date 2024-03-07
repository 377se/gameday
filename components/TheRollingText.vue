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
                <strong v-html="$getCMSEntry(labels, 'rolling_text_one', 'Alltid 30 Dagars öppet köp och fria returer')"></strong>
              </div>
            </li>
            <li>
              <div class="uk-text-center gd-slider-item uk-padding-small">
                <strong v-html="$getCMSEntry(labels, 'rolling_text_two', 'Snabba leveranser från vårt lager')"></strong>
              </div>
            </li>
            <li>
              <div class="uk-text-center gd-slider-item uk-padding-small">
                <strong v-html="$getCMSEntry(labels, 'rolling_text_three', 'Every day is... Gameday!')"></strong>
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
          this.$axios.$get("https://api.storyblok.com/v1/cdn/datasource_entries?dimension="+ this.$i18n.locale +"&datasource=fe-rolling-text-"+process.env.STORYBLOK_LABELS+"&token="+process.env.STORYBLOK +"&cv=1"+this.$store.getters.version)
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
<style lang="scss">
.gd-slider{
  background: $global-slider-background;
  color: $global-slider-color;
}
</style>