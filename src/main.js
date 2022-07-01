import Vue from 'vue'
import router from './router.js'
import store from './store'
import App from './App.vue'
import VueSweetalert2 from 'vue-sweetalert2'
import swal from 'vue-sweetalert2'

Vue.config.productionTip = false
Vue.use(VueSweetalert2, swal)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')