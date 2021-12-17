import { useAxios } from "./use-axios"


export const useLogin = (payload: {email:string, password: string}) => {
    console.log('sending login request');
    const axios = useAxios('/auth/login', payload);
    const login = async () => {
        try {
            axios.fetch()

        } catch {
            // message error
        }
    }
    return {
        login, 
        isLoading: axios.isLoading, 
        error: axios.error,
        data: axios.data
    }
}