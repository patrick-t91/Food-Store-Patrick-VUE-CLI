import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: "/sugerencias-y-reclamos",
        name: "SuggestionsForm",
        component: () => import('./views/suggestionsForm/SuggestionsForm.vue')
    },
    {
        path: "/",
        name: "HomeComponent",
        component: () => import('./views/home/HomeComponent.vue')
    }
]

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
})

export default router;