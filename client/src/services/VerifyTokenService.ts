import { User } from "@/entities/User"
import { useAuthStore } from "@/store/useAuthStore"
import { AbstractApiService } from "./AbstractApiService"

export class VerifyTokenService extends AbstractApiService
{
    readonly authStore

    public constructor ()
    {
        super('/auth/me')
        this.authStore = useAuthStore()
    }

    public verifyToken(token: string): User|any
    {
        return this.http
        .post('')
        .then((res:any) => {
            const data = this.handleResponse<User>(res)
            this.setUserStore(data.data as User)
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

export const useVerifyTokenService = () => { return new VerifyTokenService() }