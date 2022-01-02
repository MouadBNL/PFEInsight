<template>
    <n-card
        title="Ajouter une entreprise"
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
            <n-button type="success" @click="createCompany" :loading="companyService.isLoading.value">Ajouter</n-button>
        </n-form>
    </n-card>
</template>

<script setup lang="ts">
import { useCompanyService } from '@/services/CompanyApiService'
import { NCard, NForm, NFormItem, NInput, NButton, useMessage } from 'naive-ui'
import { ref } from 'vue';

const emit = defineEmits(['created'])
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
    name: '',
    address: '',
    city: '',
    phone: ''
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
            // companiesOptions.value.push({
            //     value: res.data.id,
            //     label: res.data.name + ' ' + res.data.city,
            //     name: res.data.name,
            //     city: res.data.city
            // })
            // internship.value.company_id = res.data.id
            // companyModal.value = false
        }
    })
}
</script>