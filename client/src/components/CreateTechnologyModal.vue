<template>
    <n-card
        title="Ajouter une technologie"
        class="w-1/2"
    >
        <n-form :model="tech" ref="formRef" :rules="rules">
            <n-form-item path="name" label="Nom de la technologie">
                <n-input v-model:value="tech.name" placeholder="Nom de la technologie" />
            </n-form-item>
            <n-button type="success" @click="createTech" :loading="techService.isLoading.value">Ajouter</n-button>
        </n-form>
    </n-card>
</template>

<script setup lang="ts">
import { useTechnologyService } from '@/services/TechnologyApiService';
import { NCard, NForm, NFormItem, NInput, NButton, useMessage } from 'naive-ui'
import { ref } from 'vue';

const emit = defineEmits(['created'])
const techService = useTechnologyService()
const message = useMessage()

const formRef = ref<any>(null)
const rules:any = {
    name: [
        {
            required: true,
            message: 'Le nom est requis',
            trigger: ['input', 'blur']
        }
    ]
}
const tech = ref({
    name: ''
})

const createTech = (e:any) => {
    e.preventDefault();
    formRef.value.validate(async (err:any) => {
        if(!err) {
            const res = await techService.store(tech.value)
            message.success('Technologie ajoutée avec succès')
            emit('created', {
                value: res.data.id,
                label: res.data.name
            })
        }
    })
}
</script>