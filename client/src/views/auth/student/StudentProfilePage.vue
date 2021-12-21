<template>
    <div>
        <div class="flex items-center gap-8">
            <div>
                <n-h1 class="block">Mon profil</n-h1>
            </div>
            <div>
                <n-tag v-if="profile.user.role"> {{ profile.user.role }} </n-tag>
            </div>
        </div>
        
        <UserCredentials />

        <n-card title="Information profil">
            <n-form :model="profile" ref="profileForm" :rules="profileRules">
                <div class="flex gap-8">
                    <n-form-item path="profile.apogee" label="Apogee" class="w-1/2">
                        <n-input v-model:value="profile.profile.apogee" @keydown.enter.prevent placeholder="xxxxxxxx" />
                    </n-form-item>
                    <n-form-item path="profile.field" label="Filière" class="w-1/2">
                        <n-select v-model:value="profile.profile.field" :options="fieldOprions" placeholder="filière" />
                    </n-form-item>
                </div>
                <div class="flex gap-8">
                    <n-form-item path="profile.sex" label="Sexe" class="w-1/2">
                        <n-select v-model:value="profile.profile.sex" :options="sexOptions" placeholder="sexe" />
                    </n-form-item>
                    <n-form-item path="profile.birthday" label="Date de naissance" class="w-1/2">
                        <n-date-picker v-model:value="profile.profile.birthday" placeholder="YYYY-MM-DD" type="date" class="w-full" />
                    </n-form-item>
                </div>
                <div class="flex justify-end">
                    <NButton type="success" @click="handleUpdateProfile">Mettre à mon profil</NButton>
                </div>
            </n-form>
        </n-card>
    </div>
</template>
<script setup lang="ts">
import { useStudentService } from '@/services/StudentApiService';
import { UserApiService } from '@/services/UserApiService';
import { NH1,NTag, NDatePicker, NCard, NButton, NForm,NFormItem,NInput, NSelect, useDialog, useMessage } from 'naive-ui'
import { onMounted, reactive, ref } from 'vue';
import UserCredentials from '@/components/UserCredentials.vue';

const studentService = useStudentService()
const message = useMessage()

const sexOptions = [{label: 'Homme', value:'male'}, {label:'Femmes',value:'female'}]
const fieldOprions = [
    {label: 'Génie Informatique', value: 'GI'},
    {label: 'Génie Electrique', value: 'GE'},
    {label: 'Génie Industriel', value: 'GInd'},
    {label: 'Génie Mécatronique d’automobile', value: 'GM'},
    {label: 'Réseaux et Systèmes de Télécommunications', value: 'RST'},
]
const profileRules = {
    profile: {
        apogee: {
            required: true,
            trigger: ['input', 'blur'],
            validator: (rule:any, value:string) => {
                if(! value) return new Error('Numero apogee est requis')
                else if(value.length > 8) return new Error('Numero apogee ne doit pas depasser 8 charactere')
                else return true
            }
        },
        field: {
            required: true,
            trigger: ['input', 'blur'],
            validator: (rule:any, value:string) => {
                if(! value) return new Error('La filière est requise')
                else return true
            }
        },
        sex: {
            required: true,
            trigger: ['input', 'blur'],
            validator: (rule:any, value:string) => {
                if(! value) return new Error('La sexualité est requise')
                else return true
            }
        },
        birthday: {
            required: true,
            trigger: ['input', 'blur'],
            validator: (rule:any, value:string) => {
                if(! value) return new Error('La date de naissance est requise')
                else return true
            }
        },
    }
}

const profileForm = ref<any>(null)
const profile = reactive({
    user: {
        id: undefined as any,
        key: undefined as any,
        first_name: undefined as any,
        last_name: undefined as any,
        email: undefined as any,
        role: undefined as any,
        password: undefined as any as any,
        password_confirmation: undefined as any
    },
    profile: {
        apogee: undefined,
        birthday: undefined,
        field: undefined,
        profile_picture: undefined,
        sex: undefined,
    }
})

const handleSubmit = () => {

}

const handleUpdateProfile = () => {
    profileForm.value.validate( async (errors:any[]) => {
        if(!errors) {
            try {
                let data:any = {...profile.profile}
                let birthday = new Date(data.birthday as any)
                data.birthday = birthday.toISOString().split('T')[0]
                await studentService.update(data)
                message.success('Profil mis à jour')
            } catch (err:any) {
                console.log({err})
            }
        } else {
            message.error('veuillez entrer des données valides')
        }
    })
}

onMounted(async () => {
    try {
        let data = await studentService.getProfile()
        profile.user = {
            ...UserApiService.formatUser({
                id : data.data.id,
                first_name : data.data.first_name,
                last_name : data.data.last_name,
                email : data.data.email,
                role : data.data.role
            }),
            password: null,
            password_confirmation: null
        }
        profile.profile = {
            apogee: data.data.apogee,
            birthday: data.data.birthday ? (new Date(data.data.birthday)).getTime() as any : null,
            field: data.data.field,
            profile_picture: data.data.profile_picture,
            sex: data.data.sex
        }
    } catch (err) {

    }
})
</script>