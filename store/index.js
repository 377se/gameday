export const state = () => ({
  counter: 0,
  nhlMenu:[],
  nbaMenu:[],
  nflMenu:[],
  mlbMenu:[],
  plMenu:[],
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
}
//NHL 202
//NBA 327
//NFL 328
//PL 421
//MLB 329
export const actions = {
  async nuxtServerInit (vuexContext, context) {
    await Promise.all([
      await context.app.$axios.$get('https://beta.supporterprylar.se/webapi/Filter/GetTeamListByCategory?categoryId=202'),
      await context.app.$axios.$get('https://beta.supporterprylar.se/webapi/Filter/GetTeamListByCategory?categoryId=327'),
      await context.app.$axios.$get('https://beta.supporterprylar.se/webapi/Filter/GetTeamListByCategory?categoryId=328'),
      await context.app.$axios.$get('https://beta.supporterprylar.se/webapi/Filter/GetTeamListByCategory?categoryId=329'),
      await context.app.$axios.$get('https://beta.supporterprylar.se/webapi/Filter/GetTeamListByCategory?categoryId=421')
    ]).then(res => {
        vuexContext.commit('setNHLMenu', res[0])
        vuexContext.commit('setNBAMenu', res[1])
        vuexContext.commit('setNFLMenu', res[2])
        vuexContext.commit('setMLBMenu', res[3])
        vuexContext.commit('setPLMenu', res[4])
    }).catch((err)=>{
      throw new Error("Error getting teams for menu:" + err)
    })
  }
}