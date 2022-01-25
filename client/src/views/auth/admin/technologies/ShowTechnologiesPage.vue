<template>
    <n-h1>Technologies</n-h1>
    <n-card>
        <n-scrollbar  x-scrollable>
            <div style="min-width: 400px;">
                <n-data-table
                    :columns="columns"
                    :data="technologies"
                    :pagination="{pageSize: 20}"
                />
            </div>
        </n-scrollbar>
    </n-card>


    <n-modal v-model:show="isModalOpen">
        <CreateTechnologyModal
            :init="techUpdated"
            @updated="async () => {
                technologies.value = (await techService.get()).data
                isModalOpen = false
            }"
        />
    </n-modal>
</template>

<script setup lang="ts">
import { useTechnologyService } from '@/services/TechnologyApiService'
import { NH1,NCard,NDataTable, NSpace, NButton, NModal, useMessage, NScrollbar } from 'naive-ui'
import { h, onMounted, ref } from 'vue'
import CreateTechnologyModal from '@/components/CreateTechnologyModal.vue'

const message = useMessage()
const techService = useTechnologyService()
const technologies = ref<any>(undefined)
const techUpdated = ref<any>(undefined)
const isModalOpen = ref<boolean>(false)
const columns = [
    {
        title: '#',
        key: 'id'
    },
    {
        title: 'Nom',
        key: 'name'
    },
    {
        title: 'Actions',
        key: 'actions',
        render(row:any) {
            return h(
                NSpace, {}, {default: () => [
                    h(
                        NButton, {type: 'success', onClick(){
                            techUpdated.value = row
                            isModalOpen.value = true 
                    }}, {default:()=> 'Modifier'}
                    ),
                    h(
                        NButton, {type: 'error', onClick: async () => {
                            await techService.delete(row.id)
                            message.success('La technologie ' + row.name + ' a été supprimée')
                            technologies.value = (await techService.get()).data
                    }}, {default:()=> 'Supprimer'}
                    ),
                ]}
            )
        }
    }
]

onMounted(async () => {
    technologies.value = (await techService.get()).data

})
</script>