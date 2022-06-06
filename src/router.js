import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: "/",
        name: "HomeComponent",
        component: () => import('./views/home/HomeComponent.vue')
    },
    {
        path: "/sugerencias-y-reclamos",
        name: "SuggestionsForm",
        component: () => import('./views/suggestionsForm/SuggestionsForm.vue')
    },
    {
        path: "/mis-pedidos",
        name: "UserOrders",
        component: () => import('./views/userOrders/UserOrders.vue')
    }
]

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
})

export default router;