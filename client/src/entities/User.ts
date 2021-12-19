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
        user: UserParams
    )
    {
        this.first_name = user.first_name
        this.last_name = user.last_name
        this.role = user.role
        this.email = user.email
        this.id = user.id
        this.created_at = user.created_at
        this.updated_at = user.updated_at
    }

    
}

type UserParams = {
    first_name: string, last_name: string, role: string, email: string, id?: number, created_at?: string, updated_at?: string
}

export type UserNull = {
    id?: number
    first_name?: string
    last_name?: string
    role?: string
    email?: string
    created_at?: string
    updated_at?: string
}