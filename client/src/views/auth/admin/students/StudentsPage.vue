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
        title: 'Apogee',
        key: 'apogee',
        sorter: 'default'
    },
    {
        title: 'Stage',
        key: 'internship',
        filterOptions: [
            {
                label: 'Avec stage',
                value: 'with'
            },
            {
                label: 'Sans stage',
                value: 'without'
            }
        ],
        filter (value:any, row:any) {
            if(value== 'without') return (! row.internship || ! row.internship.id)
            if(value== 'with') return ! (! row.internship || ! row.internship.id);
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
    console.log(res.data)
})
</script>