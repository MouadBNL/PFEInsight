<template>
    <div>
        <div class="flex items-center gap-8">
            <h1>Mon stage</h1>
            <n-button v-if="hasInternship" type="error" @click="quitInternship">
                Quiter ce stage
            </n-button>

            <n-button v-if="hasInternship && Array.isArray(internship.colleagues) && internship.colleagues.length < 2" type="success" @click="showInviteModal = true">
                Inviter un collègue
            </n-button>
        </div>
        <div v-if="studentService.isLoading.value" class="h-96 flex items-center justify-center">
            <n-spin size="large"/>
        </div>
        <div v-else>
            <n-result 
                status="warning"
                title="Vous n'avez pas encore de stage"
                description="créez votre stage maintenant"
                v-if="! hasInternship"
            >
                <template #footer>
                    <router-link :to="{name: 'auth.students.internship.create'}">
                        <n-button type="success">
                            Ajouter un stage
                        </n-button>
                    </router-link>
                </template>
            </n-result>
            <div v-else>

                <div class="my-4 grid grid-cols-2 gap-4">
                    <n-card v-for="student in internship.colleagues">
                        <div class="m-2 p2 flex items-center gap-4">
                                <img :src="student.profile_picture" class="h-10 w-10 rounded-full" />
                            <div>
                                {{ student.first_name }} {{ student.last_name }}
                                <span class="block text-gray-400">{{ student.apogee }}</span>
                            </div>
                        </div>
                    </n-card>
                </div>

                <n-card class="mb-4">
    
    
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

                        <n-space>
                            <n-button
                                @click="updateInternship"
                            >
                                Mettre à jour
                            </n-button>
                        </n-space>
                    </n-form>
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
    
    
    
                </n-card>
    
                <n-card title="Upload des fichier">
                    <div class="grid gap-4" :key="uploadKey">
                        
                        <n-card>
                            <n-h1>Brouillon du rapport</n-h1>
                            <p>Upload d'un fichier pdf, word ou powerpoint, avec un max de 40Mo</p>
                            <n-upload
                            style="display: inline-block;width: fit-content; height: fit-content;"
                                :multiple="false"
                                :customRequest="(data) => uploadFile('draft', data, 'Votre brouillon du rapport a été mise à jour')"
                                accept=".pdf,.doc,.docx,.ppt,.pptx"
                            >
                                <n-button :loading="internshipUploadService.isLoading.value">Upload du brouillon du rapport</n-button>
                            </n-upload>
                            <a v-if="internship.draft_report" :href="baseUrl + internship.draft_report" target="_blank">
                                <NButton class="ml-4" type="success">Telecharger</NButton>
                            </a>
                            <!-- <n-button type="error" @click="deleteImage" :loading="uploadDraftService.isLoading.value" class="mb-2">Supprimer mon image</n-button> -->
                        </n-card>
                        
                        <n-card>
                            <n-h1>Version final du rapport</n-h1>
                            <p>Upload d'un fichier pdf, word ou powerpoint, avec un max de 40Mo</p>
                            <n-upload
                            style="display: inline-block;width: fit-content; height: fit-content;"
                                :multiple="false"
                                :customRequest="(data) => uploadFile('final', data, 'Votre rapport a été mise à jour')"
                                accept=".pdf,.doc,.docx,.ppt,.pptx"
                            >
                                <n-button :loading="internshipUploadService.isLoading.value">Upload du version final du rapport</n-button>
                            </n-upload>
                            <a v-if="internship.final_report" :href="baseUrl + internship.final_report" target="_blank">
                                <NButton class="ml-4" type="success">Telecharger</NButton>
                            </a>
                            <!-- <n-button type="error" @click="deleteImage" :loading="uploadDraftService.isLoading.value" class="mb-2">Supprimer mon image</n-button> -->
                        </n-card>
                        
                        <n-card>
                            <n-h1>Présentation du rapport</n-h1>
                            <p>Upload d'un fichier pdf, word ou powerpoint, avec un max de 40Mo</p>
                            <n-upload
                            style="display: inline-block;width: fit-content; height: fit-content;"
                                :multiple="false"
                                :customRequest="(data) => uploadFile('presentation', data, 'Votre présentation a été mise à jour')"
                                accept=".pdf,.doc,.docx,.ppt,.pptx"
                            >
                                <n-button :loading="internshipUploadService.isLoading.value">Upload de la présentation du rapport</n-button>
                            </n-upload>
                            <a v-if="internship.presentation" :href="baseUrl + internship.presentation" target="_blank">
                                <NButton class="ml-4" type="success">Telecharger</NButton>
                            </a>
                            <!-- <n-button type="error" @click="deleteImage" :loading="uploadDraftService.isLoading.value" class="mb-2">Supprimer mon image</n-button> -->
                        </n-card>

                    </div>
                </n-card>
            </div>
        </div>
    </div>

    <n-modal v-model:show="showInviteModal">
        <InviteStudentModal @sent="showInviteModal = false"/>
    </n-modal>

    <pre>{{internship}}</pre>
</template>

<script setup lang="ts">
import { useStudentService } from '@/services/StudentApiService'
import { useCompanyService } from '@/services/CompanyApiService'
import { useTechnologyService } from '@/services/TechnologyApiService'
import CreateCompanyModal from '@/components/CreateCompanyModal.vue'
import CreateTechnologyModalVue from '@/components/CreateTechnologyModal.vue'
import InviteStudentModal from '@/components/InviteStudentModal.vue'
import { NH1, NCard, NSpin, NForm, NFormItem, NInput, NSelect, NButton, NModal, useMessage, NResult, NUpload, NSpace, useDialog } from 'naive-ui'
import { h, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useInternshipService } from '@/services/InternshipApiService'
import { baseUrl } from '@/services/dataService'
const studentService = useStudentService()
const internshipService = useInternshipService()
const internshipUploadService = useInternshipService()
const companyService = useCompanyService()
const technologyService = useTechnologyService()
const router = useRouter()
const dialog = useDialog()
const message = useMessage()
const hasInternship = ref<boolean>(false)
const showInviteModal = ref<boolean>(false)

const uploadKey = ref(0)
const formRef = ref<any>(null);
const internship = ref<any>({
    title: '',
    description: '',
    supervisor_name: '',
    supervisor_phone: '',
    company_id: 0,
    technologies: [],
})


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
        hasInternship.value = true
    }
    // internship.value = (await internshipService.get(profile.data.internship.id)).data
    internship.value = profile.data.internship
    if(Array.isArray(internship.value.technologies)){
        internship.value.technologies = internship.value.technologies.map((tec:any) => {
            return tec.id
        })
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

const updateInternship = (e:any) => {
    e.preventDefault()
    formRef.value.validate(async (err:any) => {
        if(!err) {
            await internshipService.update(internship.value)
            message.success('Stage modifié avec succès')
        } else {
            message.error('Il y a un problème avec votre formulaire, veuillez réessayer')
        }
    })
}


// Upload files

const uploadFile = async (key: string, {file}: any, msg:string = 'ok') => {
    message.info('Uploading...')
    const formData = new FormData()
    formData.append(key, file.file);
    internshipUploadService.uploadFile(key, formData)
    .then( async (res) => {
        message.success(msg)
        const profile = await studentService.getProfile()
        if (profile.data.internship != null) {
            hasInternship.value = true
        }
        // internship.value = (await internshipService.get(profile.data.internship.id)).data
        internship.value = profile.data.internship
        if(Array.isArray(internship.value.technologies)){
            internship.value.technologies = internship.value.technologies.map((tec:any) => {
                return tec.id
            })
        }
    }).finally(()=>{
        uploadKey.value ++;
    })
}

const quitInternship = async () => {
    dialog.warning({
        title: 'Quiter votre stage actuel stage',
        content: 'Êtes-vous sûr de vouloir quitter votre stage actuel ?',
        positiveText: 'Oui',
        negativeText: 'Non, anuller',
        onPositiveClick: async () => {
            await internshipService.quit()
            internship.value = null
            hasInternship.value = false
        }
    })
}
</script>

<style>
.n-upload-file-list {
    display: none !important;
}
</style>