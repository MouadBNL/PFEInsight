import { AbstractApiService } from "./AbstractApiService"

export class TechnologyApiService extends AbstractApiService
{
    public constructor()
    {
        super('/technologies')
    }

    public get() {
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

    public update(id:string, data:any) {
        return this.http
            .put('/' + id, data)
            .then(this.handleResponse.bind(this))
            .catch(this.handleError.bind(this))
    }

    public delete(id:string)
    {
        return this.http
        .delete('/' + id)
        .then(this.handleResponse.bind(this))
        .catch(this.handleError.bind(this))
    }
}

export function useTechnologyService(): TechnologyApiService
{
    return new TechnologyApiService()
}