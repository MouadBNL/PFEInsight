import { AbstractApiService } from "./AbstractApiService"

export class InvitationApiService extends AbstractApiService
{
    public constructor()
    {
        super('/invitations')
    }
    
    public getAllInvitations() {
        return this.http
        .get('/')
        .catch(this.handleError.bind(this))
    }

    public accept(id:string) {
        return this.http
        .put('/' + id)
        .catch(this.handleError.bind(this))
    }

    public refuse(id:string) {
        return this.http
        .delete('/' + id)
        .catch(this.handleError.bind(this))
    }

}

export function useInvitationService(): InvitationApiService
{
    return new InvitationApiService()
}