import { createRouter, createWebHistory } from "vue-router"
import HomePage from '@/views/HomePage.vue'
import AboutPage from '@/views/AboutPage.vue'
import Loginpage from '@/views/LoginPage.vue'
import DashboardPage from '@/views/auth/DashboardPage.vue'
import TheAuthLayout from '@/layouts/auth/TheAuthLayout.vue'
import { useAuthStore } from "./store/useAuthStore"
import auth from "./middlwares/auth"
import guest from "./middlwares/guest"
import checkMiddlewares from "./middlwares"

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/login',
            component: Loginpage,
            name: 'login',
            beforeEnter: (to, from, next) => {
                return checkMiddlewares({to, from, next}, [guest])
            }
        },
        {
            path: '/home',
            component: HomePage,
            name: 'home'
        },
        {
            path: '/about',
            component: AboutPage,
            name: 'about'
        },
        {
            path: '/auth',
            component: TheAuthLayout,
            name: 'auth',
            beforeEnter: (to, from, next) => {
                return checkMiddlewares({to, from, next}, [auth])
            },
            children: [
                {
                    path: 'dashboard',
                    component: DashboardPage,
                    name: 'auth.dashboard'
                },
                {
                    path: 'users',
                    component: () => import('@/views/auth/users/UsersPage.vue'),
                    name: 'auth.users'
                },
                {
                    path: 'users/create',
                    component: () => import('@/views/auth/users/CreateUserPage.vue'),
                    name: 'auth.users.create'
                },
                {
                    path: 'about',
                    component: () => import('@/views/auth/AboutPage.vue'),
                    name: 'auth.about'
                }
            ]
        }
    ]
})

export default router