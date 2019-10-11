<template>
  <div 
    class="uk-container uk-container-xsmall uk-width-medium uk-background-default">
    <form>
      <fieldset 
        class="uk-fieldset uk-margin-left uk-margin-right uk-margin-top uk-margin-bottom">
        <legend 
          class="uk-legend">Logga in</legend>

        <div 
          class="uk-margin">
          <input 
            class="uk-input" type="text" placeholder="Användarnamn">
          <input 
            class="uk-input uk-margin-small-top" type="password" placeholder="Lösenord">
        </div>

        <button 
          class="uk-button uk-button-primary uk-width-1-1">Logga in</button>

        <ul 
          class="uk-list">
          <li>
            <a 
              class="uk-link-text" href>Glömt ditt lösenord?</a>
          </li>
          <li>
            <a 
              class="uk-link-text" href>Bli medlem</a>
          </li>
        </ul>
      </fieldset>
    </form>
  </div>
</template>

<script>
</script>

<style lang="scss">
@import "~scss/vars";

.text {
  color: $global-inverse-color;
  margin-right: 18px;
  font-size: 15px;
}
</style>


