import { AbstractApiService } from "./AbstractApiService"

export class CompanyApiService extends AbstractApiService
{
    public constructor()
    {
        super('/companies')
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

    public delete(id:string)
    {
        return this.http
        .delete('/' + id)
        .then(this.handleResponse.bind(this))
        .catch(this.handleError.bind(this))
    }
}

export function useCompanyService(): CompanyApiService
{
    return new CompanyApiService()
}