import { User, UserNull } from "@/entities/User"
import { defineStore } from "pinia"

export const useAuthStore = defineStore('auth', {
    state: ():User|UserNull => ({
        first_name: undefined,
        last_name: undefined,
        email: undefined,
        profile_picture: undefined,
        role: undefined,
    })
})