import apiServices from "@/services/api.services.js";

export default {
  namespaced: true,
  state: { products: [] },
  getters: {
    getProducts: (state) => {
      return state.products;
    },
  },
  mutations: {
    SET_PRODUCTS: (state, data) => {
      state.products = data;
    },
  },
  actions: {
    setProducts: async ({ commit }) => {
      apiServices
        .getProducts()
        .then((products) => commit("SET_PRODUCTS", products))
        .catch((err) => console.log(err));
    },
  },
};
