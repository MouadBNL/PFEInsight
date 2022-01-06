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

    public store(data:any) {
        return this.http
            .post('', data)
            .then(this.handleResponse.bind(this))
            .catch(this.handleError.bind(this))
    }

    public supervise(id: number) {
        return this.http
            .put('/' + String(id) + '/supervise')
            .then(this.handleResponse.bind(this))
            .catch(this.handleError.bind(this))
    }

    public unsupervise(id: number) {
        return this.http
            .put('/' + String(id) + '/unsupervise')
            .then(this.handleResponse.bind(this))
            .catch(this.handleError.bind(this))
    }
}

export function useInternshipService(): InternshipApiService
{
    return new InternshipApiService()
}