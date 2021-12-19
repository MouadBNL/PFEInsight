import { createRouter, createWebHistory } from "vue-router"
import auth from "./middlwares/auth"
import guest from "./middlwares/guest"
import checkMiddlewares from "./middlwares"

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/login',
            component: () => import('@/views/LoginPage.vue'),
            name: 'login',
            beforeEnter: (to, from, next) => {
                return checkMiddlewares({to, from, next}, [guest])
            }
        },
        {
            path: '/home',
            component: () => import('@/views/HomePage.vue'),
            name: 'home'
        },
        {
            path: '/about',
            component: () => import('@/views/AboutPage.vue'),
            name: 'about'
        },
        {
            path: '/auth',
            component: () => import('@/layouts/auth/TheAuthLayout.vue'),
            name: 'auth',
            beforeEnter: (to, from, next) => {
                return checkMiddlewares({to, from, next}, [auth])
            },
            children: [
                {
                    path: 'dashboard',
                    component: () => import('@/views/auth/DashboardPage.vue'),
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