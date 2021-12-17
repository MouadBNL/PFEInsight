import { useAxios } from './useAxios'
import { useMessage } from 'naive-ui'
import { computed } from 'vue'


export const useLogin = () => {
    console.log('sending login request')
    const axios = useAxios('/auth/login', {method: 'POST'})
    const message = useMessage();
    const login = async (crednetials: {email:string, password: string}) => {
        try {
            await axios.fetch(crednetials)
            if(axios.data.value?.data.access_token) {
                const token = axios.data.value.data.access_token
                message.success('Vous êtes connecté, ' + token)
            }
        } catch {
            // message error
            message.error('Erreur lors de la tentative de connexion')
        }
    }
    return {
        login,
        isLoading: axios.isLoading, 
        error: axios.error,
        data: axios.data
    }
}