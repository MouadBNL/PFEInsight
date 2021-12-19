export class User
{
    readonly id?: number
    readonly first_name: string
    readonly last_name: string
    readonly role: string
    readonly email: string
    readonly created_at?: string
    readonly updated_at?: string

    public constructor(
        first_name:string, last_name:string, role:string, email:string, id?: number, created_at?:string, updated_at?:string
    )
    {
        this.first_name = first_name
        this.last_name = last_name
        this.role = role
        this.email = email
        this.id = id
        this.created_at = created_at
        this.updated_at = updated_at
    }

    
}