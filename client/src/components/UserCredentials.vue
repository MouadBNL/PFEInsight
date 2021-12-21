<template>
    <n-card title="Information utilisateur" class="mb-8">
        <n-form :model="user" ref="formRef" :rules="rules">
            <div class="flex gap-8">
                <n-form-item path="first_name" label="Prénom" class="w-1/2">
                    <n-input v-model:value="user.first_name" @keydown.enter.prevent placeholder="Mouad" />
                </n-form-item>
                <n-form-item path="last_name" label="Nom" class="w-1/2">
                    <n-input v-model:value="user.last_name" @keydown.enter.prevent placeholder="Benali" />
                </n-form-item>
            </div>
            <n-form-item path="email" label="Email">
                <n-input v-model:value="user.email" @keydown.enter.prevent placeholder="mouad.benali1@uit.ac.ma" />
            </n-form-item>
            <div class="flex gap-8">
                <n-form-item path="password" label="Mot de passe" class="w-1/2">
                    <n-input v-model:value="user.password" @keydown.enter.prevent type="password" placeholder="********" />
                </n-form-item>
                <n-form-item path="password_confirmation" label="Confirmez le mot de passe" class="w-1/2">
                    <n-input v-model:value="user.password_confirmation" @keydown.enter.prevent type="password" placeholder="********" />
                </n-form-item>
            </div>
            <div class="flex justify-end">
                <NButton type="success" @click="handleSubmit">Mettre à jour mes identifiants</NButton>
            </div>
        </n-form>
    </n-card>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { NCard, NButton, NForm,NFormItem,NInput, useDialog, useMessage } from 'naive-ui'
import { useAuthStore } from '@/store/useAuthStore'
import { useUserService } from '@/services/UserApiService'
import { useVerifyTokenService } from '@/services/VerifyTokenService'

const authStore = useAuthStore()
const tokenService = useVerifyTokenService()
const userService = useUserService()
const message = useMessage()

const formRef = ref<any>(null)
const user = reactive({
    first_name: authStore.first_name,
    last_name: authStore.last_name,
    email: authStore.email,
    password: undefined,
    password_confirmation: undefined
})


const rules = {
    first_name: {
        required: true,
        trigger: ['input', 'blur'],
        validator: (rule:any, value:string) => {
            if(! value) return new Error('Prénom est requis')
            else if(value.length > 255) return new Error('Prénom ne doit pas depasser 255 charactere')
            else return true
        }
    },
    last_name: {
        required: true,
        trigger: ['input', 'blur'],
        validator: (rule:any, value:string) => {
            if(! value) return new Error('Nom est requis')
            else if(value.length > 255) return new Error('Nom ne doit pas depasser 255 charactere')
            else return true
        }
    },
    email: {
        required: true,
        trigger: ['input', 'blur'],
        validator: (rule:any, value:string) => {
            if(! value) return new Error('Email est requis')
            else if(value.length > 255) return new Error('Email ne doit pas depasser 255 charactere')
            else if(! /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) return new Error('veuillez entrer un email valide')
            else return true
        }
    },
    role: {
        required: true,
        trigger: ['input', 'blur'],
        validator: (rule:any, value:string) => {
            if(! value) return new Error('Role est requis')
            else return true
        }
    },
    password: {
        required: true,
        trigger: ['input', 'blur'],
        validator: (rule:any, value:string) => {
            if(! value) return new Error('Mot de passe est requis')
            else if(value.length > 255) return new Error('Mot de passe ne doit pas depasser 255 charactere')
            else if(value.length < 8) return new Error('Mot de passe ne doit pas avoir mois de 8 charactere')
            else return true
        }
    },
    password_confirmation: {
        required: true,
        trigger: ['input', 'blur'],
        validator: (rule:any, value:string) => {
            if(! value) return new Error('La confirmation du mot de passe est requise')
            else if(value != user.password) return new Error('Le mot de passe n\'est pas le même') 
            else return true
        }
    }
}


const handleSubmit = () => {
    formRef.value.validate(async(errors:any) => {
        if(!errors) {
            try {
                await userService.update(user)
                await tokenService.verifyToken()
                message.success('Vos identifiants ont été mis à jour')
            } catch (err) {

            }
        } else {
            message.error('Veuillez remplir les données valides')
        }
    })
}
</script>