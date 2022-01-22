<template>
    <div class="flex items-center justify-between">
        <n-h1>Tous les Étudiants</n-h1>
    </div>

    <n-card>
        <n-data-table 
            :columns="createColumns" 
            :data="data" 
            :pagination="{pageSize: 20}"
            :loading="professorService.isLoading.value"
        />
    </n-card>
</template>
<script setup lang="ts">
import { User } from '@/entities/User'
import { useProfessorService } from '@/services/ProferssorApiService'
import { NH1, NButton,NCard, NDataTable, useMessage, useDialog } from 'naive-ui'
import { h, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const message = useMessage()
const professorService = useProfessorService()
const router = useRouter()
const dialog = useDialog()

const createColumns: any[] =  [
    {
        title: '#',
        key: 'id'
    },
    {
        title: 'Prénom',
        key: 'first_name',
        sorter: 'default'
    },
    {
        title: 'Nom',
        key: 'last_name',
        sorter: 'default'
    },
    {
        title: 'Email',
        key: 'email',
        sorter: 'default'
    },
    {
        title: 'Nombre de stage encadrer',
        key: 'internships_count',
        sorter: 'default'
    },
    {
        title: 'Actions',
        key: 'actions',
        render(row:any) {
            return h(
                NButton,
                {
                    type: 'success',
                    onClick: () => {
                        router.push({name: 'auth.admin.professors.show', params: {id: row.id}})
                    }
                },
                {default: () => 'Profile'}
            )
        },
    }
]
const data = ref<User[]>([])


onMounted(async () => {
    let res = await professorService.getAllProfessors()
    data.value = res.data
    console.log(res.data)
})
</script>