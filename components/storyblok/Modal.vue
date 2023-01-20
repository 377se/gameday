<template>
  <div
    id="modal-article"
    class="uk-modal-full uk-modal"
    style="background:rgba(0,0,0,.6);padding-top:30px;"
    uk-modal="container:false;stack:true;">
    <div
      class="uk-modal-dialog"
      style="display:block;min-height:100vh;">
        <button
          class="uk-modal-close-full uk-close-large"
          type="button"
          @click="$router.go(-1)"
          uk-close></button>
        <slot/>
    </div>
  </div>
</template>
<script>
</script>