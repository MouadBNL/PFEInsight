import { User } from "@/entities/User"
import { AbstractApiService } from "./AbstractApiService"

export class UserApiService extends AbstractApiService
{

    public constructor(){
        super('/users')
    }

    public index()
    {
        return this.http
        .get('')
        .then(this.handleResponse.bind(this))
        .catch(this.handleError.bind(this))
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
            "apogee": user.apogee,
            "password": user.password,
            "password_confirmation": user.password_confirmation,
        })
        .then(this.handleResponse.bind(this))
        .catch(this.handleError.bind(this))
    }

    public delete(id:string) {
        return this.http
        .delete('' + id)
        .then(this.handleResponse.bind(this))
        .catch(this.handleError.bind(this))
    }

    public static formatUser(user: User)
    {
        return {
            id: user.id,
            key: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            role:   user.role == 'admin' ? 'Administrateur' : 
                    user.role == 'professor' ? 'Professeur' : 
                    user.role == 'student' ? 'Étudiant' : 'non defini!'
        }
    }

    public update(user: Object)
    {
        return this.http
        .put('', user)
        .then(this.handleResponse.bind(this))
        .catch(this.handleError.bind(this))
    }

    public uploadProfilePicture(formData:any)
    {
        return this.http
        .post('/profile/picture', formData)
        .catch(this.handleError.bind(this))
    }
}

export function useUserService(): UserApiService
{
    return new UserApiService();
}