import type { AxiosError, AxiosInstance, AxiosResponse } from 'axios'
import axios from 'axios'
import { useMessage, MessageApi } from 'naive-ui'

export function isAxiosError(value: any): value is AxiosError {
    return typeof value?.response == 'object'
}

export abstract class AbstractApiService 
{
    protected readonly http: AxiosInstance
    protected readonly message: MessageApi

    protected constructor(
        protected readonly path?: string,
        protected readonly baseURL: string = 'http://localhost:8000/api/v1'
    )
    {
        if(path) {
            baseURL += path
        }
        this.http = axios.create({
            baseURL,
            //.. other config e.g JWT token & data
        })
        this.http.defaults.headers.common['Accept'] = 'application/json;charset=UTF-8';
        this.http.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8';
        this.loadHeaderToken()
        this.message = useMessage()
    }

    protected createParams(record: Record<string, any>): URLSearchParams 
    {
        const params: URLSearchParams = new URLSearchParams();
        for (const key in record) {
            if (Object.prototype.hasOwnProperty.call(record, key)) {
                const value: any = record[key];
                if (value !== null && value !== undefined) {
                    params.append(key, value);
                } else {
                    console.debug(`Param key '${key}' was null or undefined and will be ignored`);
                }
            }
        }
        return params;
    }

    protected handleResponse<T = any>(response: AxiosResponse<T>): T {
        return response.data;
    }

    protected handleError(error: unknown): never {
        if (error instanceof Error) {
            if (isAxiosError(error)) {
                if (error.response) {
                    // TODO: make errors more user friendly and checking the errors array
                    if(error.response.data?.message){
                        this.message.error(error.response.data.message)
                    }
                    console.log(error.response.data);
                    // console.log(error.response.status);
                    // console.log(error.response.headers);
                    throw error;
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser
                    // console.log(error.request);

                    this.message.error('une erreur s\'est produite, veuillez vérifier votre connexion Internet')
                    throw new Error(error as any);
                }
            } else {
                // Something happened in setting up the request that triggered an Error
                this.message.error('une erreur s\'est produite, veuillez vérifier votre connexion Internet')
                // console.log('Error', error.message);
                throw new Error(error.message);
            }
        }
        throw new Error(error as any);
    }

    protected setHeaderToekn(token?: string) 
    {
        this.http.defaults.headers.common['Authorization'] = `Bearer ${token}`
        if(token) {
            localStorage.setItem('jwt_token', token)
            this.loadHeaderToken()
        } else {
            localStorage.removeItem('jwt_token')
        }
    }

    protected loadHeaderToken()
    {
        if(localStorage.getItem('jwt_token')){
            this.http.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwt_token')}`
        }
    }
}