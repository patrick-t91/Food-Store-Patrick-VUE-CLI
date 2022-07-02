import apiServices from "@/services/api.services.js";

export default {
  namespaced: true,
  state: { products: []},
  getters: {
    getProducts: (state) => {
      return state.products;
    },
    getProductById: (state) => (productId) => {
      return state.products.find((item) => item.id == productId);
    }
    
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
    updateProduct: async ({ commit }, { productId, product }) => {
      apiServices
        .updateProduct(productId, product)
        .then(apiServices.getProducts())
        .then((products) => commit("SET_PRODUCTS", products))
        .catch((err) => document.write(err));
    },
    postProduct: async ({ commit }, product) => {
      apiServices
        .postProduct(product)
        .then(apiServices.getProducts())
        .then((products) => commit("SET_PRODUCTS", products))
        .catch((err) => document.write(err));
    }
  },
};
