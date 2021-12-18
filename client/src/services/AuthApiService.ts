import { AxiosResponse } from "axios"
import { AbstractApiService } from "./AbstractApiService"
import { useRouter } from "vue-router"

export class AuthApiService extends AbstractApiService
{
    protected readonly router
    public constructor()
    {
        super('/auth')
        this.router = useRouter()
    }

    public login(email: string, password: string): Promise<any>
    {
        console.log({email, password})
        return this.http
        .post('login', {
            email,
            password
        })
        .then((res:any) => {
            this.message.success('Vous êtes connecté')
            this.router.push({name: 'auth.dashboard'})
            return this.handleResponse(res)
        })
        .catch(this.handleError.bind(this))
    }
}

export function useAuthService(): AuthApiService {
    return new AuthApiService()
}