export const state = () => ({
  counter: 0,
  cart: {data:[]}
})

export const mutations = {
  add(state, cart) {
    state.cart=cart
    state.counter=state.cart.data.length
  }
}
export const getters = {
  cart(state) {
    return state.cart
  },
  counter(state) {
    return state.counter
  }
}
export const actions = {
  
}