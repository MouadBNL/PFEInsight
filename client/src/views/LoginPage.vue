<template>
    <div class="h-screen w-screen flex items-center justify-center bg-gray-100">
        <NCard class="w-5/12">
            <h1 class="text-center text-3xl font-extrabold mb-8">PFE Insight</h1>
            <NForm
                :model="credentials"
                ref="formRef"
    
            >
                <NFormItem label="Email" path="credentials.email">
                    <NInput v-model:value="credentials.email" placeholder="adc@xyz.com" autofocus />
                </NFormItem>
                <NFormItem label="Mod de passe" path="credentials.password">
                    <NInput v-model:value="credentials.password" placeholder="******"/>
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

const formRef = ref(null)
const credentials = reactive({
    email: '',
    password: ''
})
const login = useLogin();

const handleLogin = async () => {
     await login.login(credentials)
}
</script>