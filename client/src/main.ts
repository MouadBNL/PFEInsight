
import './assets/tw.css'
import { createApp } from 'vue'
import { router } from './router'
import { createPinia } from 'pinia'
import App from './App.vue'
import { useVerifyTokenService } from './services/VerifyTokenService'

const app = createApp(App)
app.use(createPinia())
try{
    await useVerifyTokenService().verifyToken(localStorage.getItem('jwt_token') ?? 'wrong token')
} catch (err:any) {
    console.debug('No token or token invalide')
}
// attemptLoginOnPageLoad().then(() => {
    app.use(router)
    app.mount('#app')
// })


