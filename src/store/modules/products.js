import apiServices from "@/services/api.services.js";

export default {
  namespaced: true,
  state: { products: [] },
  getters: {
    getProducts: (state) => {
      return state.products;
    },
    getProductById: (state, product) => {
      return state.products.find((item) => item.id === product.id);
    },
  },
  mutations: {
    SET_PRODUCTS: (state, data) => {
      state.products = data;
    }
  },
  actions: {
    setProducts: async ({ commit }) => {
      apiServices
        .getProducts()
        .then((products) => commit("SET_PRODUCTS", products))
        .catch((err) => document.write(err));
    },
    updateProduct: async ({ commit }, product) => {
      apiServices
        .updateProduct(product.id)
        .then(apiServices.getProducts())
        .then((products) => commit("SET_PRODUCTS", products))
        .catch((err) => document.write(err));
    },
  },
};
