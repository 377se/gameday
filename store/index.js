export const state = () => ({
  counter: 0,
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
  setPLMenu(state, menu) {
    state.plMenu = menu
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
  plMenu(state) {
    return state.plMenu
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
  async nuxtServerInit ({getters, commit, dispatch}, context) {
    if(context.app.$cookies.get('cid')!=undefined){
      commit('setCid', context.app.$cookies.get('cid'))
    }

    await Promise.all(
      [context.app.$axios.$get('https://api.storyblok.com/v1/cdn/spaces/me?token='+process.env.STORYBLOK)]
    ).then(res =>{
      commit('setVersion', res[0].space)
    }).catch((err)=>{
      throw new Error("Error getting version:" + err)
    })

    try {
      let [storyblok] = await Promise.all([
        context.app.$axios.$get("https://api.storyblok.com/v1/cdn/datasource_entries?dimension="+this.$i18n.locale +"&datasource=fe-labels-global&token="+process.env.STORYBLOK +"&per_page=1000&cv="+getters.version)
      ]);
      commit('setLabels', storyblok.datasource_entries.concat(storyblok.datasource_entries))
    } catch (err) {
      console.log(err);
    }

    if(process.env.SITE_ID==6){ //Gameday
      await Promise.all([
        context.app.$axios.$get('/webapi/Filter/GetTeamListByCategory?categoryId=202'),
        context.app.$axios.$get('/webapi/Filter/GetTeamListByCategory?categoryId=327'),
        context.app.$axios.$get('/webapi/Filter/GetTeamListByCategory?categoryId=328'),
        context.app.$axios.$get('/webapi/Filter/GetTeamListByCategory?categoryId=329'),
        context.app.$axios.$get('/webapi/Filter/GetTeamListByCategory?categoryId=527'),
      ]).then(res => {
          commit('setNHLMenu', res[0])
          commit('setNBAMenu', res[1])
          commit('setNFLMenu', res[2])
          commit('setMLBMenu', res[3])
          commit('setPLMenu', res[4])
      }).catch((err)=>{
        throw new Error("Error getting teams for menu:" + err)
      })
    }
  }
}