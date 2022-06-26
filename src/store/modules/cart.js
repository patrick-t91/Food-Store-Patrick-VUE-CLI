export default {
  namespaced: true,
  state: {
    cart: JSON.parse(localStorage.getItem("Carrito")) || {
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
      console.log("cart from storage in actions: ", state.cart);
      if (quantity == 0) return;
      const isInCart = state.cart.products.find((item) => item.id === product.id);
      if (isInCart) {
        console.log("isInCart: ", isInCart);
        console.log("product quantity in existing cart: ", product.quantity);
        isInCart.quantity += quantity;
        state.cart.totalCartPrice += product.price * quantity;
        localStorage.setItem("Carrito", JSON.stringify(state.cart));
      } else {
        product.quantity = 0;
        product.quantity += quantity;
        state.cart.products.push(product);
        state.cart.totalCartPrice += product.price * quantity;
        localStorage.setItem("Carrito", JSON.stringify(state.cart));
      }
    },
    REMOVE_FROM_CART: (state, product, quantity) => {
      console.log(
        "product from mutation: ",
        product,
        "quantity from mutation: ",
        quantity
      );
      if (quantity == 1) {
        product.quantity -= 1;
        state.cart.totalCartPrice -= product.price;
        localStorage.setItem("Carrito", JSON.stringify(state.cart));
        if (product.quantity == 0) {
          let filteredCart = state.cart.products.filter((item) => item.id != product.id);
          state.cart.products = filteredCart;
          localStorage.setItem("Carrito", JSON.stringify(state.cart));
        }
      } else if (quantity == "all") {
        let filteredCart = state.cart.products.filter((item) => item.id != product.id);
        state.cart.products = filteredCart;
        state.cart.totalCartPrice -= product.price * product.quantity
        localStorage.setItem("Carrito", JSON.stringify(state.cart));
      }
    },
    CLEAR_CART: (state) => {
      state.cart.products = [];
      localStorage.removeItem("Carrito");
    },
  },
  actions: {
    addToCart: ({ commit }, item) => {
      console.log("product from action: ", item);
      commit("ADD_TO_CART", item);
    },
    removeFromCart: ({ commit }) => {
      commit("FROM_FROM_CART");
    },
    clearCart: ({ commit }) => {
      commit("CLEAR_CART");
    },
  },
};
