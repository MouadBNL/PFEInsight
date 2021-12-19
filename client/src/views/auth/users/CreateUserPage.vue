<template>
    <n-card title="Ajouter un utilisateur" @submit.prevent="handleSubmit">
        <n-form :model="newUser" ref="formRef" :rules="rules">
            <div class="flex gap-8">
                <n-form-item path="first_name" label="Prénom" class="w-1/2">
                    <n-input v-model:value="newUser.first_name" @keydown.enter.prevent placeholder="Mouad" />
                </n-form-item>
                <n-form-item path="last_name" label="Nom" class="w-1/2">
                    <n-input v-model:value="newUser.last_name" @keydown.enter.prevent placeholder="Benali" />
                </n-form-item>
            </div>
            <n-form-item path="email" label="Email">
                <n-input v-model:value="newUser.email" @keydown.enter.prevent placeholder="mouad.benali1@uit.ac.ma" />
            </n-form-item>
            <n-form-item path="role" label="Rôle">
                <n-select v-model:value="newUser.role" :options="roles" placeholder="Étudiant" />
            </n-form-item>
            <div class="flex gap-8">
                <n-form-item path="password" label="Mot de passe" class="w-1/2">
                    <n-input v-model:value="newUser.password" @keydown.enter.prevent type="password" placeholder="********" />
                </n-form-item>
                <n-form-item path="password_confirmation" label="Confirmez le mot de passe" class="w-1/2">
                    <n-input v-model:value="newUser.password_confirmation" @keydown.enter.prevent type="password" placeholder="********" />
                </n-form-item>
            </div>
            <div class="flex justify-end">
                <NButton type="success" @click="handleSubmit">Ajouter</NButton>
            </div>
        </n-form>
    </n-card>
</template>
<script setup lang="ts">
import { useUserService } from '@/services/UserApiService';
import { NButton, NCard, NForm,NFormItem,NInput, NSelect, useDialog, useMessage } from 'naive-ui'
import { onMounted, reactive, ref } from 'vue';
import { onBeforeRouteLeave, useRouter } from 'vue-router';

const userService = useUserService()
const router = useRouter()
const dialog = useDialog()
const message = useMessage()

const roles = [
    {
        label: 'Administrateur',
        value: 'admin'
    },
    {
        label: 'Professeur',
        value: 'professor'
    },
    {
        label: 'Étudiant',
        value: 'student'
    }
]
const formRef = ref(null)
const newUser = reactive({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: ''
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
            else if(value != newUser.password) return new Error('Le mot de passe n\'est pas le même') 
            else return true
        }
    },
}

const handleSubmit = async () => {
    console.log('sending...')
    try {
        await userService.create(newUser)
        message.success('Utilisateur ajouter')

        newUser.first_name = ''
        newUser.last_name = ''
        newUser.email = ''
        newUser.role = ''
        newUser.password = ''
        router.push({name: 'auth.users'})
    } catch (err) {
        console.log(err)
    }
}

onBeforeRouteLeave((to, from, next) => {
    if(
        newUser.first_name.length != 0 ||
        newUser.last_name.length != 0 ||
        newUser.email.length != 0 ||
        newUser.role.length != 0 ||
        newUser.password.length != 0
    ) {
        dialog.error({
            title: 'Données non enregistrées',
            content: 'voulez-vous continuer sans enregistrer ?',
            positiveText: 'Oui',
            onPositiveClick: () => {
                return next()
            }
        })
    }else {
        return next()
    }
})
</script>