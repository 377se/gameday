export const state = () => ({
  counter: 0,
  cart: {data:[]}
})

export const mutations = {
  add(state, cart) {
    state.cart=cart
    state.counter=state.cart.ItemsInCart
  },
  setCart(state, cart){
    state.cart = cart
    state.counter =state.cart.ItemsInCart
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