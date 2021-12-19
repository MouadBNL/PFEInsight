
import './assets/tw.css'
import { createApp } from 'vue'
import { router } from './router'
import { createPinia } from 'pinia'
import App from './App.vue'
import { useVerifyTokenService } from './services/VerifyTokenService'

const app = createApp(App)
app.use(createPinia())

const token = useVerifyTokenService()
token.verifyToken().finally((res:any) => {
    app.use(router)
    app.mount('#app')
})
