<template>
    <div class="flex items-center justify-between">
        <n-h1>Tous les Étudiants</n-h1>
    </div>

    <n-card>
        <n-data-table 
            :columns="createColumns" 
            :data="data" 
            :pagination="{pageSize: 20}"
            :loading="studentService.isLoading.value"
        />
    </n-card>
</template>
<script setup lang="ts">
import { User } from '@/entities/User'
import { useStudentService } from '@/services/StudentApiService'
import { NH1, NButton,NCard, NDataTable, useMessage, useDialog } from 'naive-ui'
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
</script>