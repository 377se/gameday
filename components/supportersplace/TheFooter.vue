<template>
  <footer
    class="uk-section-default uk-section uk-section-large uk-padding-small uk-padding-remove-horizontal">
    <div class="uk-container">
      <div 
        class="uk-flex uk-grid-small uk-grid-stack" 
        uk-grid>
        <div class="uk-flex-last uk-flex-first@m uk-width-expand@m uk-width-1-2@s">                  
          <div class="uk-margin">
            <nuxt-link to="/">
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
            <img src="https://cdn.klarna.com/1.0/shared/image/generic/badge/sv_se/checkout/long-white.png?width=320" alt="Klarna">
          </div>    
        </div>

        <div class="uk-width-expand@m uk-width-1-2@s">               
          <h3 class="uk-h4">Shoppar</h3>
          <ul class="uk-list uk-text-small">
            <li><nuxt-link to="/nhl-shop">NHL Shop</nuxt-link></li>
            <li><nuxt-link to="/nba-shop">NBA Shop</nuxt-link></li>
            <li><nuxt-link to="/nfl-shop">NFL Shop</nuxt-link></li>
            <li><nuxt-link to="/mlb-shop">MLB Shop</nuxt-link></li>
          </ul>
        </div>

        <div class="uk-width-expand@m uk-width-1-2@s">               
          <h3 class="uk-h4">Få hjälp</h3>
          <ul class="uk-list uk-text-small">
            <li><nuxt-link to="/kopvillkor">Köpvillkor</nuxt-link></li>
            <li><nuxt-link to="/leverans-och-betalning">Leverans &amp; betalning</nuxt-link></li>
            <li><nuxt-link to="/returer-och-byten">Returer &amp; byten</nuxt-link></li>
            <li><nuxt-link to="/faq">Ofte stillede spørgsmål</nuxt-link></li>
          </ul>
        </div>

        <div class="uk-width-expand@m uk-width-1-2@s">               
          <h3 class="uk-h4">Om Gameday</h3>
          <ul class="uk-list uk-text-small">
            <li><nuxt-link to="/foretagsinformation">Företagsinformation</nuxt-link></li>
          </ul>
        </div>

        <div class="uk-width-expand@m uk-width-1-2@s">               
          <NewsLetter />
        </div>

      </div>
    </div>
    <div 
      class="uk-container uk-margin gd-copyright">
      <span class="uk-margin-small-right">Copyright © 2019 This site is Licensed to 377 Sport AB</span> 
      <nuxt-link to="/integritetspolicy">Integritetspolicy</nuxt-link> <nuxt-link to="/cookies">Cookies</nuxt-link>
    </div>
  </footer>
</template>
<script>
import NewsLetter from '@/components/NewsLetter'
export default {
  components:{
    NewsLetter
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