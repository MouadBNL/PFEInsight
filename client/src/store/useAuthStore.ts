import { defineStore } from "pinia"

export const useAuthStore = defineStore('auth', {
    state: (): any => {
        return {
            first_name: null,
            last_name: null,
            email: null,
            role: null,
            token: null,
            isLogged: false
        }
    }
})