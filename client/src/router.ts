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
                    path: 'profile',
                    component: () => import('@/views/auth/profile/UserProfile.vue'),
                    name: 'auth.profile',
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
                            path: 'professors',
                            component: () => import('@/views/auth/admin/professors/ProfessorsPage.vue'),
                            name: 'auth.admin.professors'
                        },
                        {
                            path: 'professors/:id',
                            component: () => import('@/views/auth/admin/professors/ProfessorProfilePage.vue'),
                            name: 'auth.admin.professors.show'
                        },
                        {
                            path: 'companies',
                            component: () => import('@/views/auth/admin/companies/ShowCompaniesPage.vue'),
                            name: 'auth.admin.companies'
                        },
                        {
                            path: 'technologies',
                            component: () => import('@/views/auth/admin/technologies/ShowTechnologiesPage.vue'),
                            name: 'auth.admin.technologies'
                        }
                    ]
                },
                {
                    path: 'students',
                    component: PassThrough,
                    beforeEnter: (to, from, next) => {
                        return checkMiddlewares({to, from, next}, [auth], ['student']);
                    },
                    children: [
                        {
                            path: 'internship',
                            component: () => import('@/views/auth/student/InternshipPage.vue'),
                            name: 'auth.students.internship'
                        },
                        {
                            path: 'internship/create',
                            component: () => import('@/views/auth/student/CreateInternshipPage.vue'),
                            name: 'auth.students.internship.create'
                        }
                    ]
                },
                {
                    path: 'professor',
                    component: PassThrough,
                    beforeEnter: (to, from ,next) => {
                        return checkMiddlewares({to, from, next}, [auth], ['professor'])
                    },
                    children: [
                        {
                            path: 'internships',
                            component: () => import('@/views/auth/internship/ShowInternshipsPage.vue'),
                            name: 'auth.professor.internships'
                        }
                    ]
                },
                {
                    path: 'internship/:id',
                    component: () => import('@/views/auth/internship/InternshipPage.vue'),
                    name: 'auth.internship.show',
                    beforeEnter: (to, from ,next) => {
                        return checkMiddlewares({to, from, next}, [auth], ['professor', 'admin'])
                    }
                },
                {
                    path: 'students/:id',
                    component: () => import('@/views/auth/admin/students/StudentProfilePage.vue'),
                    name: 'auth.admin.students.show',
                    beforeEnter: (to, from ,next) => {
                        return checkMiddlewares({to, from, next}, [auth], ['professor', 'admin'])
                    }
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