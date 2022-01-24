<template>
    <n-card
        :title="isUpdate ? 'Modifier une entreprise' : 'Ajouter une entreprise'"
        class="w-1/2"
    >
        <n-form :model="company" ref="companyForm" :rules="companyRules">
            <n-form-item path="name" label="Nom de l'entreprise">
                <n-input v-model:value="company.name" placeholder="Nom de l'entreprise" />
            </n-form-item>
            <n-form-item path="address" label="Adresse">
                <n-input v-model:value="company.address" placeholder="Adresse" />
            </n-form-item>
            <n-form-item path="city" label="Ville">
                <n-input v-model:value="company.city" placeholder="Ville" />
            </n-form-item>
            <n-form-item path="phone" label="Numéro de téléphone">
                <n-input v-model:value="company.phone" placeholder="Numéro de téléphone" />
            </n-form-item>
            <template v-if="isUpdate">
                <n-button type="success" @click="updateCompany" :loading="companyService.isLoading.value">Modifier</n-button>
            </template>
            <template v-else>
                <n-button type="success" @click="createCompany" :loading="companyService.isLoading.value">Ajouter</n-button>
            </template>
        </n-form>
    </n-card>
</template>

<script setup lang="ts">
import { useCompanyService } from '@/services/CompanyApiService'
import { NCard, NForm, NFormItem, NInput, NButton, useMessage } from 'naive-ui'
import { onMounted, ref } from 'vue';

const emit = defineEmits(['created', 'updated'])
const props = defineProps<{init?: any}>()
const companyService = useCompanyService()
const message = useMessage()

const companyForm = ref<any>(null)
const companyRules:any = {
    name: [
        {
            required: true,
            message: 'Le nom est requis',
            trigger: ['input', 'blur']
        }
    ],
    address: [
        {
            required: true,
            message: 'L\'adresse est requise',
            trigger: ['input', 'blur']
        }
    ],
    city: [
        {
            required: true,
            message: 'La ville est requise',
            trigger: ['input', 'blur']
        }
    ],
    phone: [
        {
            required: true,
            message: 'Le numero est requis',
            trigger: ['input', 'blur']
        }
    ]
}
const company = ref({
    id: undefined,
    name: '',
    address: '',
    city: '',
    phone: ''
})
const isUpdate = ref<boolean>(false)
onMounted(() => {
    if(props.init != undefined && props.init != null){
        isUpdate.value = true
        company.value = props.init
    }
})
const createCompany = (e:any) => {
    e.preventDefault();
    companyForm.value.validate(async (err:any) => {
        if(!err) {
            const res = await companyService.store(company.value)
            message.success('entreprise ajoutée avec succès')
            emit('created', {
                value: res.data.id,
                label: res.data.name + ' ' + res.data.city,
                name: res.data.name,
                city: res.data.city
            })
        }
    })
}
const updateCompany = (e:any) => {
    e.preventDefault();
    companyForm.value.validate(async (err:any) => {
        if(!err) {
            if(company.value.id){
                const res = await companyService.update(company.value.id,company.value)
                message.success('entreprise modifier avec succès')
                emit('updated')
            } else {
                message.success('une erreur s\'est produite veuillez réessayer plus tard')
            }
        }
    })
}
</script>