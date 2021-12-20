import { AbstractApiService } from "./AbstractApiService"

export class StudentApitService extends AbstractApiService
{
    public constructor()
    {
        super('')
    }

    public getProfile() {
        return this.http
            .get('/profile')
            .then(this.handleResponse.bind(this))
            .catch(this.handleError.bind(this))
    }

    public update(data:any) {
        return this.http
            .put('/profile', data)
            .then(this.handleResponse.bind(this))
            .catch(this.handleError.bind(this))
    }
}

export function useStudentService(): StudentApitService
{
    return new StudentApitService()
}