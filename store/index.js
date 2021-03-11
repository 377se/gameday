export const state = () => ({
  counter: 0,
  brandMenu: [],
  productTypeMenu: [],
  nhlMenu:[],
  nbaMenu:[],
  nflMenu:[],
  mlbMenu:[],
  plMenu:[], 
  labels: [],
  version: 1573637448,
  cid:null
})

export const mutations = {
  increment (state) {
    state.counter++
  },
  setProductTypeMenu(state, menu) {
    state.productTypeMenu = menu
  },
  setBrandMenu(state, menu) {
    state.brandMenu = menu
  },
  setNHLMenu(state, menu) {
    state.nhlMenu = menu
  },
  setNBAMenu(state, menu) {
    state.nbaMenu = menu
  },
  setNFLMenu(state, menu) {
    state.nflMenu = menu
  },
  setMLBMenu(state, menu) {
    state.mlbMenu = menu
  },
  setCid(state, val){
    state.cid = val
  },
  setVersion(state, version){
    state.version = version.version
  },
  setLabels(state,labels){
    state.labels = labels
  }
}
export const getters = {
  productTypeMenu(state) {
    return state.productTypeMenu
  },
  brandMenu(state) {
    return state.brandMenu
  },
  nhlMenu(state) {
    return state.nhlMenu
  },
  nbaMenu(state) {
    return state.nbaMenu
  },
  nflMenu(state) {
    return state.nflMenu
  },
  mlbMenu(state) {
    return state.mlbMenu
  },
  cid(state){
    return state.cid
  },
  version(state){
    return state.version
  },
  labels(state){
    return state.labels
  }
}
//NHL 202
//NBA 327
//NFL 328
//PL 421
//MLB 329
export const actions = {
  
}