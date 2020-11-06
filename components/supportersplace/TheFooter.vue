<template>
  <footer
    class="uk-section-default uk-section uk-section-large uk-padding-small uk-padding-remove-horizontal">
    <div class="uk-container">
      <div 
        class="uk-flex uk-grid-small uk-grid-stack" 
        uk-grid>
        <div class="uk-flex-last uk-width-expand@m uk-width-1-2@s">                  
          <div class="uk-margin">
            <img :src="'https://cdn.klarna.com/1.0/shared/image/generic/badge/'+this.$i18n.locale.replace('-','_').replace('en','en_gb')+'/checkout/long-white.png?width=720'" alt="Klarna">
          </div>
          <div class="uk-margin uk-text-right">
            <img 
              style="height:30px;width:auto;" 
              :src="'/delivery_method_'+this.$i18n.locale.replace('-','_').replace('en','en_us')+'.svg'" alt="">
          </div>   

              <div class="uk-container uk-margin gd-copyright uk-text-right">
      <span class="uk-margin-small-right">Copyright © 2019 This site is Licensed to 377 Sport AB</span> 
      <nuxt-link :to="localeRoute($getCMSEntry(global_labels,'localePath_Integrity', '/integritetspolicy'))">{{ $getCMSEntry(global_labels,'footer_integrity_policy', 'Integritetspolicy') }}</nuxt-link> <nuxt-link :to="localeRoute($getCMSEntry(global_labels,'localePath_cookies', '/cookies'))">{{ $getCMSEntry(global_labels,'footer_cookies', 'Cookies') }}</nuxt-link>
    </div>
        </div>

        <div class="uk-width-expand@m uk-width-1-2@s">               
          <h3 class="uk-h4">{{ $getCMSEntry(global_labels,'footer_header_gethelp', 'Få hjälp') }}</h3>
          <ul class="uk-list uk-text-small">
            <li><nuxt-link :to="localeRoute($getCMSEntry(global_labels,'localePath_purchase_conditions', '/kopvillkor'))">{{ $getCMSEntry(global_labels,'footer_purchase_conditions', 'Köpvillkor') }}</nuxt-link></li>
            <li><nuxt-link :to="localeRoute($getCMSEntry(global_labels,'localePath_delivery', '/leverans-betalning'))">{{ $getCMSEntry(global_labels,'footer_delivery', 'Leverans &amp; betalning') }}</nuxt-link></li>
            <li><nuxt-link :to="localeRoute($getCMSEntry(global_labels,'localePath_returns', '/returer-byten'))">{{ $getCMSEntry(global_labels,'footer_exchanges', 'Returer &amp; byten') }}</nuxt-link></li>
            <li><nuxt-link :to="localeRoute($getCMSEntry(global_labels,'localePath_faq', '/vanliga-fragor'))">{{ $getCMSEntry(global_labels,'footer_faq', 'Vanliga frågor') }}</nuxt-link></li>
          </ul>
        </div>

        <div class="uk-width-expand@m uk-width-1-2@s">               
          <h3 class="uk-h4">{{ $getCMSEntry(global_labels,'footer_header_about_us', 'Om Supportersplace') }}</h3>
          <ul class="uk-list uk-text-small">
             <li><nuxt-link :to="localeRoute($getCMSEntry(global_labels,'localePath_corporate_information', '/foretagsinformation'))">{{ $getCMSEntry(global_labels,'footer_company_information', 'Företagsinformation') }}</nuxt-link></li>
          </ul>
          <div class="uk-margin-medium uk-bottom-padding-large">
            <a href="https://www.instagram.com/supporters_place/" target="_new"><span uk-icon="icon: instagram;ratio:1.5"></span></a>
            <a href="https://www.facebook.com/supportersplace" target="_new"><span uk-icon="icon: facebook;ratio:1.5"></span></a>
          </div>
        </div>

      </div>
    </div>


     <div class="uk-container uk-padding-small shoplinks">
        <div 
          class="uk-flex uk-flex-center uk-flex-middle uk-grid uk-grid-small" 
          uk-grid>

          <div class="uk-width-1-2 uk-width-1-4@s uk-width-1-5@m uk-width-1-6@l">               
            <a
              href="https://www.samdodds.com/"
              target="_new">
              <img src="/sites/samdodds/samdodds-logo.png" alt="Sam Dodds"/>
            </a>
            <p class="uk-text-small">
              {{ $getCMSEntry(global_labels,'shoplink_samdodds', 'Text om Sam Dodds') }}
            </p>
          </div>

          <div class="uk-width-1-2 uk-width-1-4@s uk-width-1-5@m uk-width-1-6@l">               
            <a
              href="https://gameday.se/"
              target="_new">
              <img src="/sites/gameday/gameday-logo.svg" alt="Gameday"/>
            </a>
            <p class="uk-text-small">
              {{ $getCMSEntry(global_labels,'shoplink_gameday', 'Text om Gameday') }}
            </p>
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
  background: $global-primary-background;
  color: #ffffff;
  padding-bottom:70px;
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

.shoplinks{
  margin-top:2em;
}
</style>