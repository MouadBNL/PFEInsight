import { ref } from 'vue'
import axios, { AxiosResponse, AxiosRequestConfig , Method, AxiosError } from "axios"
import { useMessage } from 'naive-ui';

const apiClinet = axios.create({
    baseURL: 'http://localhost:8000/api/v1'
})

interface GetExceptionInterface {type: 'error' | 'info' | 'success' | 'warning', message: string}
type HandleErrorInterface = (err: any) => GetExceptionInterface|null|undefined;

export const useAxios = <T = any>(config: Object = {}, handleException?: HandleErrorInterface) => {

    const m         = useMessage()
    const response  = ref<AxiosResponse<{status: 'success' | 'invalid' | 'error', message: string, data?: T}>|null>()
    const data      = ref<T|null>()
    const isLoading = ref<boolean>(false)

    const getException = (err: any): GetExceptionInterface => {
        if(handleException) {
            const ex = handleException(err)
            if(ex) return ex
        }
        let message = "Une erreur est survenue, veuillez réessayer plus tard."
        if(err?.data?.errors) {
            const errors = err.data.errors
            if(typeof errors == 'string') message = errors
            else if(typeof errors == 'object') {
                const firstval = errors[Object.keys(errors)[0]]
                if(typeof firstval == 'string') message = firstval
                else if(Array.isArray(firstval) && firstval.length > 0) message = firstval[0]
                else message = JSON.stringify(errors)
            }
        }
        else if(err?.data?.message && typeof err.data.message == 'string') message = err.date.message
        else if(err?.message && typeof err.message == 'string') message = err.message

        return {type: 'error', message: message}
    }

    const showMessage = (ex: GetExceptionInterface) => {
        if(ex.type == 'success') m.success(ex.message)
        else m.error(ex.message)
    }

    const fetch = async (payload = {}) => {
        response.value = null
        data.value = null
        isLoading.value = true
        try {
            const res = await apiClinet.request({
                data: {
                    ...payload
                },
                ...config,
            }).catch(err => {throw err})
            if(res.data.status != 'success')
                throw res
            
            response.value = res
            data.value = res.data
        } catch (err: any) {
            response.value = null
            showMessage( getException(err.response) )
        } finally {
            isLoading.value = false
        }
    }

    return { response, data, isLoading, fetch }
}

// export const setAuthorizationHeader = (token: string | null) => {
//     apiClinet.defaults.headers.common['Authorization'] = `Bearer ${token}`
//     if(token) {
//         localStorage.setItem('jwt_token', token)
//     } else {
//         localStorage.removeItem('jwt_token')
//     }
// }