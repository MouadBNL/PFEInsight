<template>
    <div class="flex items-center justify-between">
        <n-h1>Tous les utilisateur</n-h1>
        <router-link :to="{name: 'auth.users.create'}">
            <n-button type="success">Ajouter un utilisateur</n-button>
        </router-link>
    </div>

    <n-card>
        <n-data-table 
            :columns="createColomuns()" 
            :data="data" 
            :pagination="{pageSize: 20}"
            :loading="userService.isLoading.value"
        />
    </n-card>
</template>
<script setup lang="ts">
import { User } from '@/entities/User'
import { UserApiService, useUserService } from '@/services/UserApiService'
import { NH1, NButton,NCard, NDataTable, useMessage, useDialog } from 'naive-ui'
import { h, onMounted, ref } from 'vue'

const message = useMessage()
const userService = useUserService()
const dialog = useDialog()

const createColomuns = () => [
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
        title: 'Role',
        key: 'role',
        defaultFilterOptionValues: ['Administrateur', 'Professeur', 'Étudiant'],
        filterOptions: [
            {
                label: 'Administrateur',
                value: 'Administrateur'
            },
            {
                label: 'Professeur',
                value: 'Professeur'
            },
            {
                label: 'Étudiant',
                value: 'Étudiant'
            }
        ],
        filter (value:string, row:any) {
            return ~row.role.indexOf(value)
        }
    },
    {
        title: 'Actions',
        key: 'actions',
        render(row:any) {
            return h(
                NButton,
                {
                    type: 'error',
                    onClick: () => {
                        dialog.warning({
                            title: 'suppression d \'un utilisateur',
                            positiveText: 'Oui',
                            content: 'Vous êtes sur le point de supprimer un utilisateur, êtes-vous sûr de vouloir continuer?',
                            onPositiveClick: async () => {
                                try {
                                    await userService.delete(row.id)
                                    message.success('Utilisateur: ' + row.first_name + ' ' + row.last_name + ' a été supprimé')
                                    data.value = data.value.filter((r) => r.id != row.id)
                                } catch (err: any) {
                                    console.log(err)
                                }
                            }
                        })
                    }
                },
                {default: () => 'supprimer'}
            )
        },
    }
]
const data = ref<User[]>([])


onMounted(async () => {
    let res = await userService.index()
    data.value = res.data.map((user:any) => {
        return UserApiService.formatUser(user)
    })
    console.log(res.data)
})
</script>