<template>
    <div class="h-screen max:w-screen flex items-center justify-center bg-gray-100 p-4">
        <NCard class="w-11/12 md:w-5/12 xl:w-3/12">
            <h1 class="text-center text-3xl font-extrabold mb-8 mt-0">PFE Insight</h1>
            <NForm
                :model="credentials"
                :rules="rules"
                ref="formRef"
                @submit.prevent="handleLogin"
            >
                <NFormItem label="Email" path="email">
                    <NInput v-model:value="credentials.email" placeholder="adc@xyz.com" autofocus />
                </NFormItem>
                <NFormItem label="Mod de passe" path="password">
                    <NInput v-model:value="credentials.password" placeholder="******" type="password"/>
                </NFormItem>
                <NFormItem>
                    <NButton @click="handleLogin" type="primary" :loading="login.isLoading.value">Connexion</NButton>
                </NFormItem>
            </NForm>
        </NCard>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { NCard ,NForm, NFormItem, NInput, NButton } from 'naive-ui'
import { useLogin } from '@/services/useAuth'

const formRef = ref<any>(null)
const credentials = ref({
    email: '',
    password: ''
})
const rules = {
    email: [{
        required: true,
        validator(rule:any, value:any) {
            if(!value) {
                return new Error('un e-mail est requis')
            }
            else if(! /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) return new Error('veuillez entrer un email valide')
            return true
        },
        trigger: ['input'],
    }],
    password: [{
        required: true,
        // validator (rule:any, value:any) {
        //     if(!value) throw new Error('un mot de passe est requis')
        //     return true
        // },
        trigger: ['input', 'blur'],
        message: 'un mot de passe est requis'
    }]
}
const login = useLogin();

const handleLogin = async (e:any) => {
    let passVlidation = false
    await formRef.value?.validate(async (errors: Array<any>|null|undefined) => {
        if(!errors || errors.length  == 0){
            passVlidation = true
            await login.login({
                email: credentials.value.email,
                password: credentials.value.password
            })
        }
    })

}
</script>