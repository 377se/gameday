import Vue from 'vue'

Vue.filter('thousandsDelimiter', (value) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  })
