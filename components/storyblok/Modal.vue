<template>
  <div
    id="modal-article"
    class="uk-modal-full uk-modal"
    style="background:rgba(0,0,0,.6);padding-top:30px;"
    uk-modal="container:false;stack:true;">
    <div
      class="uk-modal-dialog"
      style="display:block;min-height:100vh;">
      <div
        class="uk-text-right"
        uk-sticky>
        <span
        class="uk-margin-right"
        style="cursor:pointer;"
        uk-icon="close"
        @click="$router.go(-1)"></span>
      </div>
        <slot/>
    </div>
  </div>
</template>
<script>
</script>