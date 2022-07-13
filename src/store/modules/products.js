import apiServices from "@/services/api.services.js";

export default {
  namespaced: true,
  state: { products: [], selectedCategory: "" },
  getters: {
    getProducts: (state) => {
      if (state.selectedCategory) {
        return state.products.filter(
          (product) => product.category === state.selectedCategory
        );
      }
      return state.products;
    },
    getCategory: (state) => {
      return state.selectedCategory;
    },
  },
  mutations: {
    SET_PRODUCTS: (state, data) => {
      state.products = data;
    },
    SET_CATEGORY: (state, category) => {
      state.selectedCategory = category;
    },
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
    },
    setCategory: ({ commit }, category) => {
      commit("SET_CATEGORY", category);
    },
  },
};
