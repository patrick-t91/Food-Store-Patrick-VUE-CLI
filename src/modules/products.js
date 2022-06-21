export default {
  namespaced: true,
  state: { products: [] },
  getters: {
    getProducts: (state) => {
      return state.products;
    },
  },
  mutations: {
    SET_PRODUCTS: {}
  },
  actions: {
    getProducts: ({ commit }) => {
      apiServices
        .getProducts()
        .then((products) => commit("SET_PRODUCTS", products))
        .catch((err) => console.log(err));
    },
  },
};
