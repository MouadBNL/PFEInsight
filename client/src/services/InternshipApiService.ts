import { AbstractApiService } from "./AbstractApiService"

export class InternshipApiService extends AbstractApiService
{
    public constructor()
    {
        super('/internships')
    }

    public index()
    {
        return this.http
            .get('')
            .then(this.handleResponse.bind(this))
            .catch(this.handleError.bind(this))
    }

    public get(id:string)
    {
        return this.http
            .get('/' + id)
            .then(this.handleResponse.bind(this))
            .catch(this.handleError.bind(this))
    }

    public store(data:any) {
        return this.http
            .post('', data)
            .then(this.handleResponse.bind(this))
            .catch(this.handleError.bind(this))
    }

    public update(data:any) {
        return this.http
            .put('', data)
            .then(this.handleResponse.bind(this))
            .catch(this.handleError.bind(this))
    }

    public supervise(id: string) {
        return this.http
            .put('/' + String(id) + '/supervise')
            .then(this.handleResponse.bind(this))
            .catch(this.handleError.bind(this))
    }

    public unsupervise(id: string) {
        return this.http
            .put('/' + String(id) + '/unsupervise')
            .then(this.handleResponse.bind(this))
            .catch(this.handleError.bind(this))
    }

    public valid(id: string) {
        return this.http
            .put('/' + String(id) + '/valid')
            .then(this.handleResponse.bind(this))
            .catch(this.handleError.bind(this))
    }

    public invalid(id: string) {
        return this.http
            .put('/' + String(id) + '/invalid')
            .then(this.handleResponse.bind(this))
            .catch(this.handleError.bind(this))
    }

    public score(id: string, score: any) {
        return this.http
            .put('/' + String(id) + '/score', {
                score
            })
            .then(this.handleResponse.bind(this))
            .catch(this.handleError.bind(this))
    }

    public uploadFile(key:string, formData:any)
    {
        return this.http
        .post('/' + key, formData)
        .catch(this.handleError.bind(this))
    }   

    public quit()
    {
        return this.http
        .delete('/quit')
        .catch(this.handleError.bind(this))
    }
}

export function useInternshipService(): InternshipApiService
{
    return new InternshipApiService()
}