<template>
  <ul class="uk-thumbnav uk-margin-small">
    <li 
      v-for="attrib in attributes"
      :key="attrib.AttributeId"
      :class="{'uk-active':attrib.AttributeId==attribute}">
      <nuxt-link 
        :to="'?attribute='+attrib.AttributeId"
        class="uk-text-center"
        style="line-height:0.8;position:relative">
        <span class="active-check" uk-icon="check"></span>
        <img 
          :src="attrib.ImageName" 
          style="width:100px;"
          alt="">
        <br>{{ attrib.Name }}
      </nuxt-link>
    </li>
  </ul> 
</template>
<script>
export default {
  async fetch(){
    try {
      const [attributes] = await Promise.all([
        this.$axios.$get(
          `/webapi/${this.$i18n.locale}/Attribute/GetAttributeList?categoryId=${this.$route.params.categoryid}&productTypeId=${this.$route.params.filterid}`
        )
      ]);
      this.attributes = attributes
    } catch (err) {
      console.log('Attributes error')
      console.log(err);
      console.log(err.request);
    }
  },
  data() {
    return{
      attributes: []
    }
  },
  props: {
    attribute: {
      type: String,
      default: '',
      required: false
    }
  },
}
</script>
<style lang="scss" scoped>
.uk-active .active-check{
  position:absolute;
  top:5px;
  right:5px;
  background:skyblue;
  border-radius:50%;
  padding:3px;
  display:block;
}
.active-check{display:none}
</style>