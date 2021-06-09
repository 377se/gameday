<template>
  <div class="uk-width-1-1 stp-container uk-flex uk-flex-center">
    <div class="uk-flex uk-flex-around stp-logo-container">
      <a href="https://suuporterprylar.se">
        <div class="stp-logo-plate"><img class="stp-logo-image" src="/logos/supporterprylar_logo.svg" alt="Logo Supporterprylar"></div>
      </a>
      <a href="https://samdodds.com">
        <div class="stp-logo-plate"><img class="stp-logo-image" src="/logos/samdodds_logo.svg" alt="Logo Samdodds"></div>
      </a>
      <a href="https://gameday.se">
        <div class="stp-logo-plate"><img class="stp-logo-image" src="/logos/gameday_logo_liggande.svg" alt="Logo Gameday"></div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {

  }
</script>

<style lang="scss" scoped>
  .stp-container {
    background-color: $global-muted-background;
  }
  .stp-logo-container {
    margin-top: 6px;
  }
  .stp-logo-plate {
    background-color: #fff;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    padding: 2px 6px;
    margin: 0 10px;
    width: 75px;
  }
  .stp-logo-image {
    height: 18px;
  }
</style>