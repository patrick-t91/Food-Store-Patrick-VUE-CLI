import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: "/",
        name: "HomeView",
        component: () => import('./views/home/HomeView.vue'),
        props: true
    },
    {
        path: "/sugerencias-y-reclamos",
        name: "SuggestionsForm",
        component: () => import('./views/suggestionsForm/SuggestionsForm.vue'),
        props: true
    },
    {
        path: "/mis-pedidos/:userId",
        name: "UserOrders",
        component: () => import('./views/userOrders/UserOrders.vue'),
        props: true
    },
    {
        path: "/admin",
        name: "AdminView",
        component: () => import('./views/admin/AdminView.vue'),
        props: true
    }
]

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
})

export default router;