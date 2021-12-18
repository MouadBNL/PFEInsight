import { createRouter, createWebHistory } from "vue-router"
import HomePage from '@/views/HomePage.vue'
import AboutPage from '@/views/AboutPage.vue'
import Loginpage from '@/views/LoginPage.vue'
import DashboardPage from '@/views/auth/DashboardPage.vue'
import TheAuthLayout from '@/layouts/auth/TheAuthLayout.vue'

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/login',
            component: Loginpage,
            name: 'login'
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