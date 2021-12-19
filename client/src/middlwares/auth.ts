import { useAuthStore } from '@/store/useAuthStore'

const auth = () => {
    const authStore = useAuthStore()
    if(! authStore.email ){
        return {location: {name: 'login'}, message: 'vous devez être authentifié pour accéder à cette page'}
    }
    return true
}

export default auth