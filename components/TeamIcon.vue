<template>
  <div>
    <img :src="teamicon" style="width:90px; float: right;" />
  </div>
</template>
<script>
export default {
  props: {
    blok: {
      type: Object,
      required: true,
    }
  },
data() {
    return {
      teamicon: this.blok.teamicon.filename
    }
  },
}
</script>
<style lang="scss">
</style>