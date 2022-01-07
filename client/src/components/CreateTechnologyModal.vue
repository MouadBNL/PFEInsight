<template>
    <n-card
        :title="isUpdate ? 'Modifier une technologie' : 'Ajouter une technologie'"
        class="w-1/2"
    >
        <n-form :model="tech" ref="formRef" :rules="rules">
            <n-form-item path="name" label="Nom de la technologie">
                <n-input v-model:value="tech.name" placeholder="Nom de la technologie" />
            </n-form-item>
            <template v-if="isUpdate">
                <n-button type="success" @click="updateTech" :loading="techService.isLoading.value">Modifier</n-button>
            </template>
            <template v-else>
                <n-button type="success" @click="createTech" :loading="techService.isLoading.value">Ajouter</n-button>
            </template>
        </n-form>
    </n-card>
</template>

<script setup lang="ts">
import { useTechnologyService } from '@/services/TechnologyApiService';
import { NCard, NForm, NFormItem, NInput, NButton, useMessage } from 'naive-ui'
import { onMounted, ref } from 'vue';

const emit = defineEmits(['created', 'updated'])
const props = defineProps<{init?: any}>()
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
    id: undefined,
    name: ''
})
const isUpdate = ref<boolean>(false)
onMounted(() => {
    if(props.init != undefined && props.init != null){
        isUpdate.value = true
        tech.value = props.init
    }
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
const updateTech = (e:any) => {
    e.preventDefault();
    formRef.value.validate(async (err:any) => {
        if(!err) {
            const res = await techService.update(tech.value.id as any, tech.value)
            message.success('Technologie modifiée avec succès')
            emit('updated')
        }
    })
}
</script>