import { defineStore } from "pinia"

export const useAuthStore = defineStore('auth', {
    state: () => {
        return {
            name: null,
            role: null,
            token: null,
            isLogged: false
        }
    }
})