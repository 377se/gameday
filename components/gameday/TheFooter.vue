<template>
  <footer
    class="uk-section-default uk-section uk-section-large uk-padding-small uk-padding-remove-horizontal">
    <div class="uk-container">
      <div 
        class="uk-flex uk-grid uk-grid-small uk-grid-stack" 
        uk-grid>
        <div class="uk-flex-last uk-flex-first@m uk-width-expand@m uk-width-1-2@s">                  
          <div class="uk-margin">
            <nuxt-link :to="localePath('/')">
              <img 
                style="width:100px;"
                src="~assets/gameday_fox.svg" 
                alt="Gameday">
            </nuxt-link>
          </div>
          <div class="uk-margin-small">
            <a href="https://www.instagram.com/gamedaysverige/" target="_new"><span uk-icon="icon: instagram;ratio:1.5"></span></a>
            <a href="https://www.youtube.com/channel/UCJLMRbrjHstkG0P7Bv0-JAA" target="_new"><span uk-icon="icon: youtube;ratio:1.5"></span></a>
            <a href="https://www.facebook.com/gameday.se/" target="_new"><span uk-icon="icon: facebook;ratio:1.5"></span></a>
          </div>
          <div class="uk-margin">
            <img src="https://cdn.klarna.com/1.0/shared/image/generic/badge/sv_se/checkout/short-white.png?width=320" alt="Klarna">
          </div>    
        </div>

        <div class="uk-width-1-1 uk-width-expand@m uk-width-1-2@s">               
          <h3 class="uk-h4">{{ $getCMSEntry(global_labels,'footer_header_shops', 'Shoppar') }}</h3>
          <ul class="uk-list uk-text-small">
            <li><nuxt-link :to="localePath('/nhl-shop')">{{ $getCMSEntry(global_labels,'footer_link_nhl', 'NHL Shop') }}</nuxt-link></li>
            <li><nuxt-link :to="localePath('/nba-shop')">{{ $getCMSEntry(global_labels,'footer_link_nba', 'NBA Shop') }}</nuxt-link></li>
            <li><nuxt-link :to="localePath('/nfl-shop')">{{ $getCMSEntry(global_labels,'footer_link_nfl', 'NFL Shop') }}</nuxt-link></li>
            <li><nuxt-link :to="localePath('/mlb-shop')">{{ $getCMSEntry(global_labels,'footer_link_mlb', 'MLB Shop') }}</nuxt-link></li>
            <li><nuxt-link :to="localePath('/premier-league')">{{ $getCMSEntry(global_labels,'footer_link_premier', 'Premier League Shop') }}</nuxt-link></li>
          </ul>
        </div>

        <div class="uk-width-1-1 uk-width-expand@m uk-width-1-2@s">               
          <h3 class="uk-h4">{{ $getCMSEntry(global_labels,'footer_header_gethelp', 'Få hjälp') }}</h3>
          <ul class="uk-list uk-text-small">
            <li><nuxt-link :to="$getCMSEntry(global_labels,'localePath_purchase_conditions', '/kopvillkor')">{{ $getCMSEntry(global_labels,'footer_purchase_conditions', 'Köpvillkor') }}</nuxt-link></li>
            <li><nuxt-link :to="$getCMSEntry(global_labels,'localePath_delivery', '/leverans-betalning')">{{ $getCMSEntry(global_labels,'footer_delivery', 'Leverans &amp; betalning') }}</nuxt-link></li>
            <li><nuxt-link :to="$getCMSEntry(global_labels,'localePath_returns', '/returer-byten')">{{ $getCMSEntry(global_labels,'footer_exchanges', 'Returer &amp; byten') }}</nuxt-link></li>
          </ul>
        </div>

        <div class="uk-width-1-1 uk-width-expand@m uk-width-1-2@s">               
          <h3 class="uk-h4">{{ $getCMSEntry(global_labels,'footer_header_about_us', 'Om Gameday') }}</h3>
          <ul class="uk-list uk-text-small">
            <li><nuxt-link :to="$getCMSEntry(global_labels,'localePath_corporate_information', '/foretagsinformation')">{{ $getCMSEntry(global_labels,'footer_company_information', 'Företagsinformation') }}</nuxt-link></li>
          </ul>
        </div>

        <div class="uk-width-1-1 uk-width-expand@m uk-width-1-2@s">               
          <NewsLetter />
        </div>

      </div>
    </div>
    <div 
      class="uk-container uk-margin gd-copyright">
      <span class="uk-margin-small-right">Copyright © 2019 This site is Licensed to 377 Sport AB</span> 
      <nuxt-link :to="localePath('/integritetspolicy')">{{ $getCMSEntry(global_labels,'footer_integrity_policy', 'Integritetspolicy') }}</nuxt-link> <nuxt-link :to="$getCMSEntry(global_labels,'localePath_cookies', '/cookies')">{{ $getCMSEntry(global_labels,'footer_cookies', 'Cookies') }}</nuxt-link>
    </div>
  </footer>
</template>
<script>
import NewsLetter from '@/components/NewsLetter'
import { mapGetters } from 'vuex'

export default {
  components:{
    NewsLetter
  },
  computed:{
    ...mapGetters({
      global_labels: 'labels'
    })
  }
}
</script>
<style lang="scss" scoped>
footer{
  background:#002a32;
  color: #ffffff;
}
footer a{
  color:#ffffff;
}
footer h3, footer .h4{
  color:#fff;
}
.gd-copyright{
  font-size:0.7rem;
  a{text-decoration:underline}
}
</style>