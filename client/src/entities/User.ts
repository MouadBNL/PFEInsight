export class User
{
    id?: number
    first_name: string
    last_name: string
    role: string
    email: string
    profile_picture?: string
    created_at?: string
    updated_at?: string
    password?: string
    password_confirmation?: string
    [key: string]: any

    public constructor(
        user: UserParams
    )
    {
        this.first_name = user.first_name
        this.last_name = user.last_name
        this.role = user.role
        this.email = user.email
        this.id = user.id
        this.profile_picture = user.profile_picture
        this.created_at = user.created_at
        this.updated_at = user.updated_at
    }

    
}

type UserParams = {
    first_name: string, last_name: string, role: string, email: string, id?: number, profile_picture?: string, created_at?: string, updated_at?: string
}

export type UserNull = {
    id?: number
    first_name?: string
    last_name?: string
    role?: string
    email?: string
    profile_picture?: string
    created_at?: string
    updated_at?: string
}