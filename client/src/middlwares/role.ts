import { useAuthStore } from '@/store/useAuthStore'
import auth from './auth'

const role = (roles:string|string[]) => {
    const authStore = useAuthStore()
    if(! authStore.email ){
        return {location: {name: 'login'}, message: 'vous devez être authentifié pour accéder à cette page'}
    }
    if(typeof roles == 'string') {
        if(authStore.role === roles){
            return true
        } else {
            return {
                location: {name: 'auth.dashboard'},
                message: 'vous n\'avez pas le droit d\'accès'
            }
        }
    } else if(Array.isArray(roles)) {
        let ok = false
        roles.forEach(role => {
            if(typeof role === 'string'){
                if(authStore.role == role){
                    ok = true
                }
            }
        })
        return ok ? ok : {
            location: {name: 'auth.dashboard'},
            message: 'vous n\'avez pas le droit d\'accès'
        }
    } else {
        throw new Error('Rôle invalide')
    }
}

export default role