import { createRouter, createWebHistory } from "vue-router"
import auth from "./middlwares/auth"
import guest from "./middlwares/guest"
import role from "./middlwares/role"
import checkMiddlewares from "./middlwares"
import PassThrough from '@/views/PassThrough.vue'

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
            path: '',
            redirect: {name:'login'}
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
                    path: 'admin',
                    component: PassThrough,
                    beforeEnter: (to, from, next) => {
                        return checkMiddlewares({to, from, next}, [auth], ['admin'])
                    },
                    children: [
                        {
                            path: 'users',
                            component: () => import('@/views/auth/admin/users/UsersPage.vue'),
                            name: 'auth.admin.users',
                        },
                        {
                            path: 'users/create',
                            component: () => import('@/views/auth/admin/users/CreateUserPage.vue'),
                            name: 'auth.admin.users.create',
                        },
                        
                        {
                            path: 'students',
                            component: () => import('@/views/auth/admin/students/StudentsPage.vue'),
                            name: 'auth.admin.students'
                        },
                        {
                            path: 'students/:id',
                            component: () => import('@/views/auth/admin/students/StudentProfilePage.vue'),
                            name: 'auth.admin.students.show'
                        },

                        {
                            path: 'professors',
                            component: () => import('@/views/auth/admin/professors/ProfessorsPage.vue'),
                            name: 'auth.admin.professors'
                        },
                        {
                            path: 'professors/:id',
                            component: () => import('@/views/auth/admin/professors/ProfessorProfilePage.vue'),
                            name: 'auth.admin.professors.show'
                        },
                    ]
                },
                {
                    path: 'profile',
                    component: () => import('@/views/auth/profile/UserProfile.vue'),
                    name: 'auth.profile',
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