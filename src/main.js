import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import cartMixin from './mixins/cartMixin/cartMixin.js';

Vue.config.productionTip = false

Vue.mixin(cartMixin)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
