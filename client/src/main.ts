
import './assets/tw.css'
import { createApp } from 'vue'
import router from './router'
import { createPinia } from 'pinia'
import App from './App.vue'
import axios from 'axios'
import { useAuthStore } from './store/useAuthStore'

const verifyToken = async () => {
    const http = axios.create({
        baseURL: 'http://localhost:8000/api/v1/auth/me'
    })
    http.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwt_token')}`
    try {
        await http.post('').then(res => {
            if(res.data.data){
                const user = res.data.data
                const auth = useAuthStore()
                auth.id = user.id
                auth.email = user.email
                auth.first_name = user.first_name
                auth.last_name = user.last_name
                auth.role = user.role
                auth.profile_picture = user.profile_picture
            }
        })
    } catch (err) {
        // nothing should happen
    }
}

const app = createApp(App)
app.use(createPinia())

verifyToken().then(() => {
}).finally(() => {
    app.use(router)
    app.mount('#app')
})

