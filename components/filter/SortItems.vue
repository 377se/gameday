<template>
  <div>
    <div uk-form-custom="target: > * > span:first-child">
      <select
        v-model="selected"
        @change="sort()"
        >
        <option
          v-for="sort in sortItemList"
          :value="sort.Id"
          :key="sort.Id"
          :selected="selected==sort.Id">{{ sort.Name }}</option>
      </select>
      <button class="uk-button uk-button-default uk-button-small" type="button" tabindex="-1">
        <span></span>
        <span uk-icon="icon: chevron-down"></span>
      </button>
    </div>
  </div>
</template>
<script>
export default {
  async fetch(){
    this.selected = this.$route.query.sortorder?this.$route.query.sortorder:0
  },
  props:{
    sortItemList:{
      type: Array,
      default: () => [],
      required: false
    }
  },
  data() {
    return{
      selected: 0
    }
  },
  methods:{
    sort(ev){
      this.$router.push({query: {...this.$route.query, sortorder: this.selected}})
    }
  }
}
</script>
<style lang="scss">

</style>