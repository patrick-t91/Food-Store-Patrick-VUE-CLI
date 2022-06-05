import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import userMixin from "./mixins/userMixin/userMixin.js";
import loginMixin from "./mixins/loginMixin/loginMixin.js";
import cartMixin from './mixins/cartMixin/cartMixin.js';

Vue.config.productionTip = false

Vue.mixin(userMixin)
Vue.mixin(loginMixin)
Vue.mixin(cartMixin)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
