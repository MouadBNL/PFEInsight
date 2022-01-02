<template>
    <div>
        <n-h1>Ajouter un stage</n-h1>
    </div>
    <div v-if="studentService.isLoading.value" class="h-96 flex items-center justify-center">
        <n-spin size="large" />
    </div>
    <div v-else>
        <n-card title="Formulaire de stage">
            <n-form :model="internship" ref="formRef" :rules="internshipRules">
                <n-form-item path="title" label="Intitulé du sujet">
                    <n-input v-model:value="internship.title" placeholder="Intitulé du sujet" />
                </n-form-item>
                <n-form-item path="description" label="Description">
                    <n-input v-model:value="internship.description" type="textarea" placeholder="Description" />
                </n-form-item>
                <div class="grid grid-cols-2 gap-8">
                    <n-form-item path="supervisor_name" label="Nom et le prénom de l'encadrant">
                    <n-input v-model:value="internship.supervisor_name" placeholder="Nom et le prénom de l'encadrant" />
                    </n-form-item><n-form-item path="supervisor_phone" label="Telephone de l'encadrant ">
                        <n-input v-model:value="internship.supervisor_phone" placeholder="Telephone de l'encadrant " />
                    </n-form-item>
                </div>

                <div class="flex items-center gap-8">
                    <n-button @click="companyModal = true">
                        Ajouter une entreprise
                    </n-button>
                    <n-form-item path="company_id" label="Entreprise" class="w-full">
                        <n-select 
                            v-model:value="internship.company_id"
                            :options="companiesOptions"
                            :render-label="renderCompanyLabel"
                            :render-tag="renderCompanyTag"
                            filterable
                        />
                    </n-form-item>
                </div>

                <div class="flex items-center gap-8">
                    <n-button @click="technologyModal = true">
                        Ajouter une technologie
                    </n-button>
                    <n-form-item path="technologies" label="Technologies" class="w-full">
                        <n-select 
                            v-model:value="internship.technologies"
                            :options="technologiesOptions"
                            multiple
                            filterable
                        />
                    </n-form-item>
                </div>

                <n-button
                    @click="createInternship"
                >
                    Ajouter
                </n-button>
            </n-form>
        </n-card>
    </div>

    <n-modal v-model:show="companyModal">
        <CreateCompanyModal
            @created="companyCreated"
        />
    </n-modal>

    <n-modal v-model:show="technologyModal">
        <CreateTechnologyModalVue
            @created="technologieCreated"
        />
    </n-modal>
</template>

<script setup lang="ts">
import { useCompanyService } from '@/services/CompanyApiService'
import { useStudentService } from '@/services/StudentApiService'
import { useTechnologyService } from '@/services/TechnologyApiService'
import CreateCompanyModal from '@/components/CreateCompanyModal.vue'
import CreateTechnologyModalVue from '@/components/CreateTechnologyModal.vue'
import { NH1, NCard, NSpin, NForm, NFormItem, NInput, NSelect, NButton, NModal, useMessage } from 'naive-ui'
import { h, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useInternshipService } from '@/services/InternshipApiService'

const formRef = ref<any>(null);
const internship = ref({
    title: '',
    description: '',
    supervisor_name: '',
    supervisor_phone: '',
    company_id: 0,
    technologies: [],
})

const studentService = useStudentService()
const internshipService = useInternshipService()
const companyService = useCompanyService()
const technologyService = useTechnologyService()
const router = useRouter()
const message = useMessage()

const companiesOptions = ref<any[]>([])
const companyModal = ref<boolean>(false)

const companyCreated = (company:any) => {
    companiesOptions.value.push(company)
    internship.value.company_id = company.value
    companyModal.value = false
}

const technologiesOptions = ref<any[]>([])
const technologyModal = ref<boolean>(false)

const technologieCreated = (tech:any) => {
    technologiesOptions.value.push(tech)
    internship.value.technologies.push(tech.value as never)
    technologyModal.value = false
}

onMounted(async () => {
    const profile = await studentService.getProfile()
    if (profile.data.internship != null) {
        router.push({ name: 'auth.students.internship' })
    }

    // fetch companies
    const res = await companyService.get()
    companiesOptions.value = res.data.map((item:any) => {
        return {
            value: item.id,
            label: item.name + ' ' + item.city,
            name: item.name,
            city: item.city
        }
    })

    // fech technologies
    const res2 = await technologyService.get()
    technologiesOptions.value = res2.data.map((item:any) => {
        return {
            label: item.name,
            value: item.id
        }
    })
})


const renderCompanyLabel = (option:any) => {
    return h(
        'div',
        {
            class: 'px-2 py-1'
        },
        [
            h(
                'div',
                {
                    class: 'mb-1'
                },
                [option.name]
            ),
            h(
                'div',
                {
                    class: 'mb-1 text-gray-300'
                },
                [option.city]
            )
        ]
    )
}
const renderCompanyTag = ({option}: any) => {
    return h(
        'div',
        {
            
        },
        [option.name]
    );
}


const internshipRules = {
    title: [
        {
            required: true,
            trigger: ['input', 'blur'],
            validator: (rule:any, value:string) => {
                if(! value) return new Error('Le titre est requis')
                else if(value.length > 255) return new Error('Le titre ne peut pas contenir plus de 255 caractères')
                else return true
            }
        },
    ],
    description: [

        {
            trigger: ['input', 'blur'],
            validator: (rule:any, value:string) => {
                if(value.length > 2000) return new Error('La description ne peut pas contenir plus de 2000 caractères')
                else return true
            }
        }
    ],
    supervisor_name: [
        {
            required: true,
            trigger: ['input', 'blur'],
            validator: (rule:any, value:string) => {
                if(! value) return new Error('Le nom de l\'encadrant est requis')
                else if(value.length > 255) return new Error('Le nom de l\'encadrant ne peut pas contenir plus de 255 caractères')
                else return true
            }
        }
    ],
    supervisor_phone: [
        {
            required: true,
            trigger: ['input', 'blur'],
            validator: (rule:any, value:string) => {
                if(! value) return new Error('Le numero de l\'encadrant est requis')
                else if(value.length > 20) return new Error('Le numero de l\'encadrant ne peut pas contenir plus de 20 caractères')
                else return true
            }
        },
    ],
    company_id: [
        {
            required: true,
            trigger: ['input', 'blur'],
            validator: (rule:any, value:number) => {
                const compvals = companiesOptions.value.map(el => el.value)
                if(! value) return new Error('L\'entreprise est requise')
                else if(! compvals.includes(value)) return new Error('L\'entreprise est invalide')
                return true
            }
        },
    ],
    technologies: [
        {
            required: true,
            trigger: ['input', 'blur'],
            validator: (rule:any, value:number[]) => {
                const techvals = technologiesOptions.value.map(el => el.value);
                if(!value || value.length == 0) return new Error('Les technologies sont requises')
                else if(
                    ! value.every(el => techvals.includes(el))
                ) return new Error('L\'entreprise est invalide')
                else return true
            }
        },
    ],
}

const createInternship = (e:any) => {
    e.preventDefault()
    formRef.value.validate(async (err:any) => {
        if(!err) {
            await internshipService.store(internship.value)
            message.success('Stage créé avec succès')
            router.push({name: 'auth.students.internship'})
        } else {
            message.error('Il y a un problème avec votre formulaire, veuillez réessayer')
        }
    })
}
</script>