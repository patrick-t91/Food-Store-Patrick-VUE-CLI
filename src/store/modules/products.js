import apiServices from "@/services/api.services.js";

export default {
  namespaced: true,
  state: { products: [], selectedCategory: "", filteredResult: "" },
  getters: {
    getProducts: (state) => {
      if (state.selectedCategory) {
        return state.products.filter(
          (product) => product.category === state.selectedCategory
        );
      }
      if (state.filteredResult) {
        return state.products.filter((product) =>
          product.productName.toLowerCase().includes(state.filteredResult.toLowerCase())
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
    SET_FILTERED_RESULT: (state, filteredResult) => {
      state.filteredResult = filteredResult;
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
    setFilteredResult: ({ commit }, filteredResult) => {
      commit("SET_FILTERED_RESULT", filteredResult);
    },
  },
};
