<template>
  <footer
    class="uk-section-default uk-section uk-section-large uk-padding-small uk-padding-remove-horizontal">
    <div class="uk-container">
      <div 
        class="uk-flex uk-grid uk-grid-small uk-grid-stack" 
        uk-grid>
        <div class="uk-flex-last uk-flex-first@m uk-width-expand@m uk-width-1-2@s">                  
          <div class="uk-margin">
            <a 
              :href="localePath('/')"
              @click.stop.prevent="$router.push({path:localePath('/')})">
              <img 
                style="width:100px;"
                src="~assets/gameday_fox.svg" 
                alt="Gameday">
            </a>
          </div>
          <div class="uk-margin-small">
            <a href="https://www.instagram.com/gamedaysverige/" target="_new"><span uk-icon="icon: instagram;ratio:1.5"></span></a>
            <a href="https://www.youtube.com/channel/UCJLMRbrjHstkG0P7Bv0-JAA" target="_new"><span uk-icon="icon: youtube;ratio:1.5"></span></a>
            <a href="https://www.facebook.com/gameday.se/" target="_new"><span uk-icon="icon: facebook;ratio:1.5"></span></a>
          </div>
          <div class="uk-margin">
            <img 
              src="https://cdn.klarna.com/1.0/shared/image/generic/badge/sv_se/checkout/short-white.png?width=320" 
              alt="Klarna">
          </div>    
        </div>

        <div class="uk-width-1-1 uk-width-expand@m uk-width-1-2@s">               
          <h3 class="uk-h4">{{ $getCMSEntry(global_labels,'footer_header_shops', 'Shoppar') }}</h3>
          <ul class="uk-list uk-text-small">
            <li><a :href="localePath('/nhl-shop')" @click.stop.prevent="$router.push({path:localePath('/nhl-shop')})">{{ $getCMSEntry(global_labels,'footer_link_nhl', 'NHL Shop') }}</a></li>
            <li><a :href="localePath('/nba-shop')" @click.stop.prevent="$router.push({path:localePath('/nba-shop')})">{{ $getCMSEntry(global_labels,'footer_link_nba', 'NBA Shop') }}</a></li>
            <li><a :href="localePath('/nfl-shop')" @click.stop.prevent="$router.push({path:localePath('/nfl-shop')})">{{ $getCMSEntry(global_labels,'footer_link_nfl', 'NFL Shop') }}</a></li>
            <li><a :href="localePath('/mlb-shop')" @click.stop.prevent="$router.push({path:localePath('/mlb-shop')})">{{ $getCMSEntry(global_labels,'footer_link_mlb', 'MLB Shop') }}</a></li>
            <li><a :href="localePath('/street-week')" @click.stop.prevent="$router.push({path:localePath('/street-week')})">{{ $getCMSEntry(global_labels,'footer_link_streetweek', 'Street Week') }}</a></li>
          </ul>
        </div>

        <div class="uk-width-1-1 uk-width-expand@m uk-width-1-2@s">               
          <h3 class="uk-h4">{{ $getCMSEntry(global_labels,'footer_header_gethelp', 'Få hjälp') }}</h3>
          <ul class="uk-list uk-text-small">
            <li><a :href="$getCMSEntry(global_labels,'localepath_purchase_conditions', '/kopvillkor')" @click.stop.prevent="$router.push({path:$getCMSEntry(global_labels,'localepath_purchase_conditions', '/kopvillkor')})">{{ $getCMSEntry(global_labels,'footer_purchase_conditions', 'Köpvillkor') }}</a></li>
            <li><a :href="$getCMSEntry(global_labels,'localepath_delivery', '/leverans-betalning')" @click.stop.prevent="$router.push({path:$getCMSEntry(global_labels,'localepath_delivery', '/leverans-betalning')})">{{ $getCMSEntry(global_labels,'footer_delivery', 'Leverans &amp; betalning') }}</a></li>
            <li><a :href="$getCMSEntry(global_labels,'localepath_returns', '/returer-byten')" @click.stop.prevent="$router.push({path:$getCMSEntry(global_labels,'localepath_returns', '/returer-byten')})">{{ $getCMSEntry(global_labels,'footer_exchanges', 'Returer &amp; byten') }}</a></li>
          </ul>
        </div>

        <div class="uk-width-1-1 uk-width-expand@m uk-width-1-2@s">               
          <h3 class="uk-h4">{{ $getCMSEntry(global_labels,'footer_header_about_us', 'Om Gameday') }}</h3>
          <ul class="uk-list uk-text-small">
            <li>
              <a 
                :href="$getCMSEntry(global_labels,'localepath_corporate_information', '/foretagsinformation')"
                @click.stop.prevent="$router.push({path:$getCMSEntry(global_labels,'localepath_corporate_information', '/foretagsinformation')})">{{ $getCMSEntry(global_labels,'footer_company_information', 'Företagsinformation') }}</a></li>
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
      <a 
        :href="$getCMSEntry(global_labels,'localepath_integrity', '/integritetspolicy')"
        @click.stop.prevent="$router.push({path:$getCMSEntry(global_labels,'localepath_integrity', '/integritetspolicy')})">{{ $getCMSEntry(global_labels,'footer_integrity_policy', 'Integritetspolicy') }}</a> <a :href="$getCMSEntry(global_labels,'localepath_cookies', '/cookies')" @click.stop.prevent="$router.push({path:$getCMSEntry(global_labels,'localepath_cookies', '/cookies')})">{{ $getCMSEntry(global_labels,'footer_cookies', 'Cookies') }}</a>
    </div>

      <div 
        v-if="false"
        class="uk-container uk-padding-small">
        <div 
          class="uk-flex uk-flex-center uk-flex-middle uk-grid uk-grid-small" 
          uk-grid>

          <div class="uk-width-1-2 uk-width-1-4@s uk-width-1-5@m uk-width-1-6@l">               
            <a
              href="https://www.samdodds.com/"
              target="_new">
              <img src="/sites/samdodds/samdodds-logo.png" alt="Sam Dodds"/>
            </a>
          </div>

          <div class="uk-width-1-2 uk-width-1-4@s uk-width-1-5@m uk-width-1-6@l">               
            <a
              href="https://www.supportersplace.com/"
              target="_new">
              <img src="/sites/supportersplace/supportersplace-logo-light.png" alt="Supporters Place"/>
            </a>
          </div>
        </div>
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