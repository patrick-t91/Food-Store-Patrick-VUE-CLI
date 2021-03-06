export default {
  namespaced: true,
  state: {
    cart: JSON.parse(localStorage.getItem("Cart")) || {
      products: [],
      totalCartPrice: 0,
    },
  },
  getters: {
    getCart: (state) => {
      return state.cart;
    },
  },
  mutations: {
    ADD_TO_CART: (state, { product, quantity }) => {
      if (quantity == 0) return;
      let productPrice;
      if (product.hasDiscount) {
        productPrice =
          (product.price * (100 - product.discountPercentage)) / 100;
      } else {
        productPrice = product.price;
      }
      const isInCart = state.cart.products.find(
        (item) => item.id === product.id
      );
      if (isInCart) {
        product.quantity += quantity;
        state.cart.totalCartPrice += productPrice * quantity;
        localStorage.setItem("Cart", JSON.stringify(state.cart));
      } else {
        product.quantity = 0;
        product.quantity += quantity;
        state.cart.products.push(product);
        state.cart.totalCartPrice += productPrice * quantity;
        localStorage.setItem("Cart", JSON.stringify(state.cart));
      }
    },
    REMOVE_FROM_CART: (state, { product, quantity }) => {
      let productPrice;
      if (product.hasDiscount) {
        productPrice =
          (product.price * (100 - product.discountPercentage)) / 100;
      } else {
        productPrice = product.price;
      }
      if (quantity == 1) {
        product.quantity -= 1;
        state.cart.totalCartPrice -= productPrice;
        localStorage.setItem("Cart", JSON.stringify(state.cart));
        if (product.quantity == 0) {
          let filteredCart = state.cart.products.filter(
            (item) => item.id != product.id
          );
          state.cart.products = filteredCart;
          localStorage.setItem("Cart", JSON.stringify(state.cart));
        }
      } else if (quantity == "all") {
        let filteredCart = state.cart.products.filter(
          (item) => item.id != product.id
        );
        state.cart.products = filteredCart;
        state.cart.totalCartPrice -= productPrice * product.quantity;
        localStorage.setItem("Cart", JSON.stringify(state.cart));
      }
    },
    CLEAR_CART: (state) => {
      state.cart.products = [];
      state.cart.totalCartPrice = 0;
      localStorage.removeItem("Cart");
    },
  },
  actions: {
    addToCart: ({ commit }, item) => {
      commit("ADD_TO_CART", item);
    },
    removeFromCart: ({ commit }, item) => {
      commit("REMOVE_FROM_CART", item);
    },
    clearCart: ({ commit }) => {
      commit("CLEAR_CART");
    },
  },
};
