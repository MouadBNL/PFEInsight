import { createRouter, createWebHistory } from "vue-router"
import HomePage from '@/views/HomePage.vue'
import AboutPage from '@/views/AboutPage.vue'
import Loginpage from '@/views/LoginPage.vue'
import DashboardPage from '@/views/auth/DashboardPage.vue'
import TheAuthLayout from '@/layouts/auth/TheAuthLayout.vue'
import { useAuthStore } from "./store/useAuthStore"
import { useMessage } from "naive-ui"
import auth from "./middlwares/auth"

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/login',
            component: Loginpage,
            name: 'login',
            beforeEnter: (to, from, next) => {
                const authStore = useAuthStore()
                if(authStore.first_name && authStore.role){
                    return next({name: 'auth.dashboard'})
                }
                next()
            }
        },
        {
            path: '/',
            component: HomePage,
            name: 'home'
        },
        {
            path: '/about',
            component: AboutPage,
            name: 'about'
        },
        {
            path: '',
            component: TheAuthLayout,
            name: 'auth',
            beforeEnter: (to, from, next) => {
                const authStore = useAuthStore()
                if(! authStore.role) {
                        // const message = useMessage()
                        // message.warning('Veuillez vous connecter')
                    return next({name: 'login'})
                }
                next()
            },
            children: [
                {
                    path: 'dashboard',
                    component: DashboardPage,
                    name: 'auth.dashboard'
                }
            ]
        }
    ]
})