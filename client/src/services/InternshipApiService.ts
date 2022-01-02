import { AbstractApiService } from "./AbstractApiService"

export class InternshipApiService extends AbstractApiService
{
    public constructor()
    {
        super('/internships')
    }

    public store(data:any) {
        return this.http
            .post('', data)
            .then(this.handleResponse.bind(this))
            .catch(this.handleError.bind(this))
    }
}

export function useInternshipService(): InternshipApiService
{
    return new InternshipApiService()
}