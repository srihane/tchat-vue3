import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import ErrorPage from '@/views/ErrorPage.vue'


const routes = [
    
    {
        name: 'Home',
        path: '/',
        component: Home,
        meta: {
            title: 'Home'
        }
    },
    {
        name: 'ErrorPage',
        path: '/ErrorPage',
        component: ErrorPage,
        meta: {
            title: 'Error Page'
        }
    },

];

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.afterEach((to) => {
    //router.afterEach((to, from) => {
    //console.log(to, from)
    document.title = to.meta.title;
})

export default router;