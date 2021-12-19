import { User } from "@/entities/User"
import { AbstractApiService } from "./AbstractApiService"

export class UserApiService extends AbstractApiService
{

    public constructor(){
        super('/users')
    }

    public create(user:User) 
    {
        console.log(user)
        return this.http
        .post('', {
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
            "role": user.role,
            "password": user.password,
            "password_confirmation": user.password_confirmation,
        })
        .then(this.handleResponse.bind(this))
        .catch(this.handleError.bind(this))
    }
}

export function useUserService(): UserApiService
{
    return new UserApiService();
}