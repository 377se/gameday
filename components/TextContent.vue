<template>
  <div 
    v-editable="blok"
    v-html="blok.text.html"
    :class="{'read-more':readmore}"
    @click="setReadMore()"
  />
</template>

<script>
export default {
  props: {
    blok: {
      type: Object,
      required: true,
    }
  },
  data () {
    return {
      readmore: this.blok.read_more
    }
  },
  methods:{
    setReadMore(){
      this.readmore=false
    }
  }
}
</script>
<style lang="scss">
.read-more{
  max-height: 74px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
}
.read-more:after{
    content: "";
    opacity: 1;
    display: block;
    background: linear-gradient(rgba(255,255,255,0) 0%, rgba(255,255,255,1) 70%);
    position: absolute;
    bottom: 0;
    padding: 20px 10px 0;
    left: 0;
    width: 100%;
    box-sizing: border-box;
}
</style>