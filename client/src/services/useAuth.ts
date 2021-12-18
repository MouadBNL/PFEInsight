import { useAxios } from './useAxios'
import { useMessage } from 'naive-ui'
import { computed } from 'vue'


export const useLogin = () => {
    console.log('sending login request')
    const axios = useAxios({url: '/auth/login',method: 'POST'}, function(err:any) {
        if(err.data?.status == 'invalid') {
            return {type: 'error', message: 'email ou mot de passe incorrect'}
        }
        return null
    })
    const message = useMessage();
    const login = async (crednetials: {email:string, password: string}) => {
        try {
            await axios.fetch(crednetials)
            if(axios.data.value){
                if(axios.data.value?.data.access_token) {
                    const token = axios.data.value.data.access_token
                    message.success('Vous êtes connecté.')
                } else {
                    message.error('Aucun Token reçu, veuillez réessayer.')
                }
            }
        } catch(e:any) {
            message.error('unkonwn error')
        }
    }
    
    return {
        login,
        isLoading: axios.isLoading, 
        data: axios.data
    }
}