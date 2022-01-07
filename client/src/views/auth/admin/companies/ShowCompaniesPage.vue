<template>
    <n-h1>Entreprises</n-h1>
    <n-card>
        <n-data-table
            :columns="columns"
            :data="companies"
            :pagination="{pageSize: 20}"
        />
    </n-card>


    <n-modal v-model:show="isModalOpen">
        <create-company-modal
            :init="companyOnEdit"
            @updated="async () => {companies.value = (await companyService.get()).data; isModalOpen = false}"
        />
    </n-modal>
</template>

<script setup lang="ts">
import { useCompanyService } from '@/services/CompanyApiService';
import { NH1, NCard, NDataTable, NSpace, NButton, NModal, useMessage } from 'naive-ui'
import { h, onMounted, ref } from 'vue';
import CreateCompanyModal from '@/components/CreateCompanyModal.vue';

const message = useMessage()

const companyService = useCompanyService()
const companies = ref<any>([])
const companyOnEdit = ref<any>(undefined)
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
        title: 'Adresse',
        key: 'address'
    },
    {
        title: 'Ville',
        key: 'city'
    },
    {
        title: 'Telephone',
        key: 'phone'
    },
    {
        title:'Actions',
        key:'actions',
        render(row:any) {
            return h(
                NSpace, {}, {default: () => [
                    h(
                        NButton, {type: 'success', onClick(){
                            companyOnEdit.value = row
                            isModalOpen.value = true
                    }}, {default:()=> 'Modifier'}
                    ),
                    h(
                        NButton, {type: 'error', onClick: async () => {
                        await companyService.delete(row.id)
                        message.success('L\'entreprise ' + row.name + ' a été supprimée ')
                        companies.value = (await companyService.get()).data
                    }}, {default:()=> 'Supprimer'}
                    ),
                ]}
            )
        }
    }
]

onMounted(async () => {
    companies.value = (await companyService.get()).data
})

</script>