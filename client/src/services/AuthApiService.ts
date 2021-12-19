import { AxiosResponse } from "axios"
import { AbstractApiService } from "./AbstractApiService"
import { VerifyTokenService } from "./VerifyTokenService"
import { User } from "@/entities/User"
import { useAuthStore } from "@/store/useAuthStore"
export class AuthApiService extends AbstractApiService
{
    readonly authStore
    readonly verifyToken

    public constructor()
    {
        super('/auth')
        this.authStore = useAuthStore()
        this.verifyToken = new VerifyTokenService
    }

    public login(email: string, password: string): Promise<any>
    {
        return this.http
        .post('login', {
            email,
            password
        })
        .then(async (res:any) => {
            this.message.success('Vous êtes connecté')
            const data = this.handleResponse(res)
            if(!data.data.access_token){
                throw new Error('Token not found in response')
            }
            this.setHeaderToken(data.data.access_token)
            let user:User = await this.verifyToken.verifyToken()
            return data
        })
        .catch(this.handleError.bind(this))
    }

    public logout()
    {
        return this.http
            .post('logout')
            .then((res) => {
                localStorage.removeItem('jwt_token')
                window.location.reload()
            }).catch((err:any) => {
                console.log({err})
            })
    }
}

export function useAuthService(): AuthApiService {
    return new AuthApiService()
}