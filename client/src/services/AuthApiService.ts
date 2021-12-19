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
            this.setHeaderToekn(data.data.access_token)
            let user:User = await this.verifyToken.verifyToken(data.data.access_token)
            console.log(user)
            // this.router.push({name: 'auth.dashboard'})
            return data
        })
        .catch(this.handleError.bind(this))
    }
}

export function useAuthService(): AuthApiService {
    return new AuthApiService()
}