import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";
import products from "./modules/products";
import cart from "./modules/cart";
import loginModal from "./modules/loginModal";

Vue.use(Vuex);
export default new Vuex.Store({
  strict: true,
  modules: {
    user,
    products,
    cart,
    loginModal
  },
});
