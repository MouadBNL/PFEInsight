import { AbstractApiService } from "./AbstractApiService"

export class ProfessorApitService extends AbstractApiService
{
    public constructor()
    {
        super('/professors')
    }

    public getAllStudents()
    {
        return this.http
        .get('')
        .then(this.handleResponse.bind(this))
        .catch(this.handleError.bind(this))
    }

    public getStudent(id:string)
    {
        return this.http
        .get('/' + id)
        .then(this.handleResponse.bind(this))
        .catch(this.handleError.bind(this))
    }
}

export function useProfessorService(): ProfessorApitService
{
    return new ProfessorApitService()
}