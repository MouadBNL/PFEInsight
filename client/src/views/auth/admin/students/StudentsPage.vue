<template>
    <div class="flex items-center py-4">
        <n-h1 class="m-0 p-0">Tous les Étudiants</n-h1>
        <n-button type="success" class="ml-4" @click="openExportExcel">
            <template #icon>
                <n-icon>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                    width="50" height="50"
                    viewBox="0 0 50 50"
                    style=" fill:#FFF;"><path d="M 28.8125 0.03125 L 0.8125 5.34375 C 0.339844 5.433594 0 5.863281 0 6.34375 L 0 43.65625 C 0 44.136719 0.339844 44.566406 0.8125 44.65625 L 28.8125 49.96875 C 28.875 49.980469 28.9375 50 29 50 C 29.230469 50 29.445313 49.929688 29.625 49.78125 C 29.855469 49.589844 30 49.296875 30 49 L 30 1 C 30 0.703125 29.855469 0.410156 29.625 0.21875 C 29.394531 0.0273438 29.105469 -0.0234375 28.8125 0.03125 Z M 32 6 L 32 13 L 34 13 L 34 15 L 32 15 L 32 20 L 34 20 L 34 22 L 32 22 L 32 27 L 34 27 L 34 29 L 32 29 L 32 35 L 34 35 L 34 37 L 32 37 L 32 44 L 47 44 C 48.101563 44 49 43.101563 49 42 L 49 8 C 49 6.898438 48.101563 6 47 6 Z M 36 13 L 44 13 L 44 15 L 36 15 Z M 6.6875 15.6875 L 11.8125 15.6875 L 14.5 21.28125 C 14.710938 21.722656 14.898438 22.265625 15.0625 22.875 L 15.09375 22.875 C 15.199219 22.511719 15.402344 21.941406 15.6875 21.21875 L 18.65625 15.6875 L 23.34375 15.6875 L 17.75 24.9375 L 23.5 34.375 L 18.53125 34.375 L 15.28125 28.28125 C 15.160156 28.054688 15.035156 27.636719 14.90625 27.03125 L 14.875 27.03125 C 14.8125 27.316406 14.664063 27.761719 14.4375 28.34375 L 11.1875 34.375 L 6.1875 34.375 L 12.15625 25.03125 Z M 36 20 L 44 20 L 44 22 L 36 22 Z M 36 27 L 44 27 L 44 29 L 36 29 Z M 36 35 L 44 35 L 44 37 L 36 37 Z"></path></svg>
                </n-icon>
            </template>
            Exporter Excel
        </n-button>
    </div>

    <n-card>
        <n-scrollbar  x-scrollable>
            <div style="min-width: 970px;">
                <n-data-table 
                    :columns="createColumns" 
                    :data="data" 
                    :pagination="{pageSize: 20}"
                    :loading="studentService.isLoading.value"
                />
            </div>
        </n-scrollbar>
    </n-card>
</template>
<script setup lang="ts">
import { User } from '@/entities/User'
import { baseUrl } from '@/services/dataService'
import { useStudentService } from '@/services/StudentApiService'
import { NH1, NButton,NCard, NDataTable, useMessage, useDialog, NIcon, NScrollbar } from 'naive-ui'
import { h, onMounted, ref, resolveComponent } from 'vue'
import { useRouter } from 'vue-router'

const message = useMessage()
const studentService = useStudentService()
const router = useRouter()
const dialog = useDialog()

const createColumns: any[] =  [
    {
        title: 'Apogee',
        key: 'apogee',
        sorter: 'default'
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
        title: 'Stage',
        key: 'internship',
        filterOptions: [
            {
                label: 'Avec stage et encadrant',
                value: 'with'
            },
            {
                label: 'Sans Encadrant',
                value: 'withoutSup'
            },
            {
                label: 'Sans stage',
                value: 'without'
            }
        ],
        filter (value:any, row:any) {
            if(value== 'without') return (! row.internship || ! row.internship.id)
            if(value== 'withoutSup') return (! (! row.internship || ! row.internship.id)) && !(row.internship.supervisor_id)
            if(value== 'with') return (! (! row.internship || ! row.internship.id)) && (row.internship.supervisor_id)
        },
        render(row:any) {
            if(! row.internship || ! row.internship.id) return h('span', {}, ['Sans stage'])
            return h(
                resolveComponent('router-link') as any,
                {to: {name: 'auth.internship.show', params: {id: row.internship.id}}, class: 'text-green-700 bg-green-50 px-4 py-2 rounded'},
                {default: () => 'Voir le stage'}
            )
        }
    },
    {
        title: 'Rpport',
        key: 'rapprt',
        filterOptions: [
            {
                label: 'Les deux rapport',
                value: 2
            },
            {
                label: 'Le premièr rapport',
                value: 1
            },
            {
                label: 'Sans rapport',
                value: 0
            }
        ],
        filter (value:any, row:any) {
            if(value== 2) return (row.internship && row.internship.draft_report && row.internship.final_report)
            if(value == 1) return (row.internship && row.internship.draft_report && !row.internship.final_report)
            if(value == 0) return (row.internship && !row.internship.draft_report && !row.internship.final_report)
        },
        render(row:any) {
            if(! row.internship || ! row.internship.id) return h('span', {}, ['Sans stage'])
            return h(
                'span', {}, [row.internship.draft_report ? 
                    row.internship.final_report ? 'Les deux rapport' : 'Le premièr rapport'
                : 'Sans Rapport']
            )
        }
    },
    {
        title: 'Soutenance',
        key: 'soutenance',
        filterOptions: [
            {
                label: 'Valide',
                value: 'valid'
            },
            {
                label: 'Invalide',
                value: 'invalid'
            }
        ],
        filter (value:any, row:any) {
            if(
                value == 'invalid' && !(row.internship && row.internship.valid_soutenance == 1)
                || value== 'valid' && (row.internship && row.internship.valid_soutenance == 1)
            ) {
                return true
            }
        },
        render(row:any) {
            return h('span', {}, [(row.internship && row.internship.valid_soutenance) ? 'Valide' : 'Invalide'])
        }
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
                        router.push({name: 'auth.admin.students.show', params: {id: row.id}})
                    }
                },
                {default: () => 'Profile'}
            )
        },
    }
]
const data = ref<User[]>([])


onMounted(async () => {
    let res = await studentService.getAllStudents()
    data.value = res.data
})

const openExportExcel = async () => {
    message.info('Le téléchargement a été lancé')
    try {
        await studentService.exportExcel()

        message.success('Le téléchargement est terminé')
    }
    finally{

    }
}
</script>