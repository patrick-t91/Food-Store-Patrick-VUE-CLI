import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import store from './store'
import userMixin from "./mixins/userMixin/userMixin.js";
import cartMixin from './mixins/cartMixin/cartMixin.js';

Vue.config.productionTip = false

Vue.mixin(userMixin)
Vue.mixin(cartMixin)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')