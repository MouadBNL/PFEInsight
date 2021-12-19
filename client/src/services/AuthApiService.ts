import { AxiosResponse } from "axios"
import { AbstractApiService } from "./AbstractApiService"
import { User } from "@/entities/User"
import { useAuthStore } from "@/store/useAuthStore"
export class AuthApiService extends AbstractApiService
{
    readonly authStore
    public constructor()
    {
        super('/auth')
        this.authStore = useAuthStore()
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
            let user:User = await this.verifyToken(data.data.access_token)
            console.log(user)
            // this.router.push({name: 'auth.dashboard'})
            this.setUserStore(user)
            return data
        })
        .catch(this.handleError.bind(this))
    }

    public verifyToken(token: string): User|any
    {
        return this.http
        .post('me')
        .then((res:any) => {
            const data = this.handleResponse<User>(res)
            return data.data
        })
        .catch(this.handleError.bind(this))

    }

    protected setUserStore(user: User)
    {
        this.authStore.first_name = user.first_name
        this.authStore.last_name = user.last_name
        this.authStore.email = user.email
        this.authStore.role = user.role
    }
}

export function useAuthService(): AuthApiService {
    return new AuthApiService()
}