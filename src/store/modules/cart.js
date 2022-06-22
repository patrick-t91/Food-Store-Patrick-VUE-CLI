export default {
  namespaced: true,
  state: { cart: [] },
  getters: {
    getCart: (state) => {
      return state.cart;
    },
  },
  mutations: {},
  actions: {},
};
