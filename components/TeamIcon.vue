<template>
  <div
    v-editable="blok" 
    class="team-icon">
    <img :src="teamicon" alt="" />
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
.team-icon {
  float: right;
  width: 70px;
}
</style>