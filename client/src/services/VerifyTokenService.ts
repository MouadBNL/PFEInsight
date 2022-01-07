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

    public verifyToken(): User|any
    {
        this.loadHeaderToken()
        return this.http
        .post('')
        .then((res:any) => {
            const data = this.handleResponse<User>(res)
            console.log(data.data)
            this.setUserStore(data.data as any)
            return data.data
        })
        .catch((err) => {
            return null
        })

    }

    protected setUserStore(user: User)
    {
        console.log(user)
        this.authStore.id = user.id
        this.authStore.first_name = user.first_name
        this.authStore.last_name = user.last_name
        this.authStore.email = user.email
        this.authStore.role = user.role
        this.authStore.profile_picture = user.profile_picture
    }
}

export function useVerifyTokenService(): VerifyTokenService
{ 
    return new VerifyTokenService() 
}