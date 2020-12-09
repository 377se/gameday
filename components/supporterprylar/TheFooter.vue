<template>
  <footer
    class="uk-section-default uk-section uk-section-large uk-padding-small uk-padding-remove-horizontal">
    <div class="uk-container">
      <div 
        class="uk-flex uk-grid uk-grid-small uk-grid-stack" 
        uk-grid>
        <div class="uk-flex-last uk-width-expand@m uk-width-1-2@s">       
          <h3 class="uk-h4">&nbsp;</h3>           
          <div class="uk-margin">
            <img :src="'https://cdn.klarna.com/1.0/shared/image/generic/badge/'+this.$i18n.locale.replace('-','_').replace('en','en_gb')+'/checkout/long-white.png?width=720'" alt="Klarna">
          </div>
          <div class="uk-margin uk-text-right">
            <img 
              style="height:30px;width:auto;" 
              :src="'/delivery_method_'+this.$i18n.locale.replace('-','_').replace('en','en_us')+'.svg'" alt="">
          </div>   
        </div>

        <div class="uk-width-1-1 uk-width-expand@m uk-width-1-2@s">               
          <h3 class="uk-h4">{{ $getCMSEntry(global_labels,'footer_header_gethelp', 'Få hjälp') }}</h3>
          <ul class="uk-list uk-text-small">
            <li><nuxt-link :to="localeRoute($getCMSEntry(global_labels,'localePath_purchase_conditions', '/kopvillkor'))">{{ $getCMSEntry(global_labels,'footer_purchase_conditions', 'Köpvillkor') }}</nuxt-link></li>
            <li><nuxt-link :to="localeRoute($getCMSEntry(global_labels,'localePath_delivery', '/leverans-betalning'))">{{ $getCMSEntry(global_labels,'footer_delivery', 'Leverans &amp; betalning') }}</nuxt-link></li>
            <li><nuxt-link :to="localeRoute($getCMSEntry(global_labels,'localePath_returns', '/returer-byten'))">{{ $getCMSEntry(global_labels,'footer_exchanges', 'Returer &amp; byten') }}</nuxt-link></li>
            <li><nuxt-link :to="localeRoute($getCMSEntry(global_labels,'localePath_faq', '/vanliga-fragor'))">{{ $getCMSEntry(global_labels,'footer_faq', 'Vanliga frågor') }}</nuxt-link></li>
          </ul>
        </div>

        <div class="uk-width-1-1 uk-width-expand@m uk-width-1-2@s">               
          <h3 class="uk-h4">{{ $getCMSEntry(global_labels,'footer_header_about_us', 'Om Supportersplace') }}</h3>
          <ul class="uk-list uk-text-small">
             <li><nuxt-link :to="localeRoute($getCMSEntry(global_labels,'localePath_corporate_information', '/foretagsinformation'))">{{ $getCMSEntry(global_labels,'footer_company_information', 'Företagsinformation') }}</nuxt-link></li>
          </ul>
          <div class="uk-margin-medium uk-bottom-padding-large">
            <a href="https://www.facebook.com/supporterprylar" target="_new"><span uk-icon="icon: facebook;ratio:1.5"></span></a>
          </div>
        </div>

      </div>
    </div>
    <div class="uk-container uk-margin gd-copyright uk-text-right">
      <span class="uk-margin-small-right">Copyright © 2019 This site is Licensed to 377 Sport AB</span> 
      <nuxt-link :to="localeRoute($getCMSEntry(global_labels,'localePath_Integrity', '/integritetspolicy'))">{{ $getCMSEntry(global_labels,'footer_integrity_policy', 'Integritetspolicy') }}</nuxt-link> <nuxt-link :to="localeRoute($getCMSEntry(global_labels,'localePath_cookies', '/cookies'))">{{ $getCMSEntry(global_labels,'footer_cookies', 'Cookies') }}</nuxt-link>
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

</style>