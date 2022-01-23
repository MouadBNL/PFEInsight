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

    public getAllStudents()
    {
        return this.http
        .get('students')
        .then(this.handleResponse.bind(this))
        .catch(this.handleError.bind(this))
    }

    public getStudent(id:string)
    {
        return this.http
        .get('students/' + id)
        .then(this.handleResponse.bind(this))
        .catch(this.handleError.bind(this))
    }

    public invite(id:string)
    {
        return this.http
        .post('/invite/' + id)
        .catch(this.handleError.bind(this))
    }


    public uploadFile(key:"certificate"|"scorecard" ,formData:any)
    {
        return this.http
        .post('/profile/' + key, formData)
        .catch(this.handleError.bind(this))
    }
}

export function useStudentService(): StudentApitService
{
    return new StudentApitService()
}