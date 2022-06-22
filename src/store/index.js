import Vue from "vue";
import Vuex from "vuex";
import userLogged from "./modules/users";
import products from "./modules/products";
import cart from "./modules/cart";

Vue.use(Vuex);
export default new Vuex.Store({
  strict: true,
  modules: {
    userLogged,
    products,
    cart,
  },
});
