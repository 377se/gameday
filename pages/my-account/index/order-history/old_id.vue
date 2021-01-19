<template>
  <section>
    <div class="uk-container uk-padding-small">
      <h3>Order for orderid {{ route.params.id }} will be shown here.</h3>
    </div>
  </section>
</template>
<script>
export default {
  name: 'Child',
  validate ({ params }) {
    console.log('here I am')
    return true
  }
}
</script>
<style lang="scss">

</style>