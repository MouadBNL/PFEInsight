<template>
    <n-h1>Tous les stages</n-h1>

    <n-card>
        <n-data-table 
            :bordered="true"
            :single-line="false"
            :columns="columns"
            :data="internships"
            :pagination="{pageSize: 20}"
            :loading="internshipService.isLoading.value"
        />
    </n-card>
</template>

<script setup lang="ts">
import StudentSmallCard from '@/components/StudentSmallCard.vue'
import { useInternshipService } from '@/services/InternshipApiService'
import { useAuthStore } from '@/store/useAuthStore'
import { NH1, NCard, NDataTable, NButton, useMessage, idID } from 'naive-ui'
import { h, onMounted, ref, resolveComponent } from 'vue'

const internshipService = useInternshipService()
const message = useMessage()
const auth = useAuthStore()

const internships = ref<any[]>([])

const createColumns = () => {
    return [
        {
            title: '#',
            key: 'id'
        },
        {
            title: 'Etudiants',
            key: 'students',
            render (row:any) {
                console.log(row.students);
                return row.students.map((student:any) => {
                    return h(
                        StudentSmallCard,
                        {
                            student: student
                        }
                    )
                })
            }
        },
        {
            title: 'Sujet',
            key: 'title'
        },
        {
            title: 'Encadrant',
            key: 'supervisor_name'
        },
        {
            title: 'Encadrant academique',
            key: 'supervisor',
            filterOptions: [
                {
                    label: 'Sans Encadrant',
                    value: null
                },
                {
                    label: 'Avec Encadrant',
                    value: true
                }
            ],
            defaultFilterOptionValues: [null, true],
            filter (value:any, row:any) {
                if(value== null) return (! row.supervisor || !row.supervisor.id)
                if(value == true) return !(! row.supervisor || !row.supervisor.id)
                return true
            },
            render(row:any) {
                if(! row.supervisor || !row.supervisor.id){
                    return h(
                        'div', {class: 'text-center'}, [
                            h('span', {class: 'text-gray-500 block'}, ['ce stage n\'a pas de superviseur']),
                            h(
                                NButton, {
                                    type: 'success',
                                    class: 'w-full',
                                    onClick() {
                                        superviseInternship(row.id)
                                    }
                                },
                                {default: () => 'Encadrer ce stage'}
                            )
                        ]
                    )
                    
                } else if(row.supervisor.id == auth.id){
                    return h(
                        'div', {class: 'text-center'}, [
                            h('span', {class: 'text-gray-500 block'}, ['vous êtes le superviseur']),
                            h(
                                NButton,
                                {
                                    type: 'error',
                                    class: 'w-full',
                                    onClick(){
                                        unsuperviseInternship(row.id)
                                    }
                                },
                                {default: () => 'Abandonné'}
                            )
                        ]
                    )
                    
                }
                return h(
                    'div',
                    {},
                    [row.supervisor.first_name + ' ' + row.supervisor.last_name]
                )
            }
        },
        {
            title: 'Soutenance',
            key: 'valid_soutenance',
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
            defaultFilterOptionValues: ['valid', 'invalid'],
            filter (value:any, row:any) {
                return row.valid_soutenance == ('valid' === value)
            },
            render(row:any) {
                return h('span', {class:'block text-center'}, [row.valid_soutenance ? 'Valide' : 'Invalide'])
            }
        },
        {
            title: 'Action',
            key: 'actions',
            render(row:any) {
                return h(
                    resolveComponent('router-link') as any,
                    {to: {
                        name: 'auth.internship.show',
                        params: {
                            id: row.id
                        }
                    }},
                    {
                        default: () => h(NButton, {type: 'success'}, {default: () => 'voir les détails'})
                    }
                )
            }
        }
    ]
}
const columns: any[] = createColumns();


onMounted( async () => {
    internships.value = await (await internshipService.index()).data
    console.log(internships.value)
})

const superviseInternship = async (id: number) =>  {
    try {
        await internshipService.supervise(id)
        message.success('vous êtes maintenant le superviseur du stage avec l\'id: ' + id)
    } finally {
        internships.value = (await internshipService.index()).data
    }
}
const unsuperviseInternship = async (id: number) =>  {
    try {
        await internshipService.unsupervise(id)
        message.success('vous n\'êtes plus le superviseur du stage avec l\'id: ' + id)
    } finally {
        internships.value = (await internshipService.index()).data
    }
}
</script>