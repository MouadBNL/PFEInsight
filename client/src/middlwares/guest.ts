import { useAuthStore } from '@/store/useAuthStore'

const guest = () => {
    const authStore = useAuthStore()
    if(authStore.email){
        return{location: {name: 'auth.dashboard'}, message: 'vous ne pouvez pas accéder à cette page tant que vous êtes authentifié, veuillez vous déconnecter'}
    }
    return true
}

export default guest