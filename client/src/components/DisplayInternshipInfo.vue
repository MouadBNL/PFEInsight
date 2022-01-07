<template>
    <div v-if="internship">
        <n-card title="Stage">
            <div class="flex gap-4">
                <div class="w-2/3">
                    <n-space :vertical="true">
                        <n-card title="Etudiant">
                            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <StudentSmallCard
                                     v-for="(student, index) in internship.students" :key="index" 
                                    :student="student"
                                />
                            </div>
                        </n-card>

                        <n-card>
                            <n-h1>{{ internship.title }}</n-h1>
                            <n-p>{{ internship.description }}</n-p>
                        </n-card>

                        <n-card title="Technologies">
                                <n-space>
                                    <n-tag v-for="(tech, index) in internship.technologies" :key="index">
                                        {{ tech.name }}
                                    </n-tag>
                                </n-space>
                        </n-card>

                        <n-card title="Fichier">
                            <n-space>
                                <n-button>Presentation</n-button>
                                <n-button>Rapport non corrigée</n-button>
                                <n-button>Rapport corrigée</n-button>
                            </n-space>
                        </n-card>
                    </n-space>
                </div>
                <div class="w-1/3">
                    <n-space :vertical="true">
                        <n-card v-if="authStore.role == 'professor' && authStore.id == internship.supervisor_id" title="Action professeur">
                            <div class="">
                                <n-button v-if="internship.valid_soutenance" class="w-full" type="error" @click="invalidSoutenance">Dévalider pour la soutenance</n-button>
                                <n-button v-else class="w-full" type="success" @click="validSoutenance">Valider pour la soutenance</n-button>
                            </div>
                            <n-hr />
                            <div class="flex gap-4 flex-wrap xl:flex-nowrap">
                                <n-input-number class="w-full" v-model:value="score" :min="0" :max="20">
                                    <template #suffix > <span class="text-gray-500">/20</span></template>
                                </n-input-number>

                                <n-button class="w-full xl:w-1/2" type="success"  @click="setScore">Sauvegarder</n-button>
                            </div>
                        </n-card>
                        <n-card title="État actuel">
                            <span class="block text-base">Valider pour la soutenance: {{internship.valid_soutenance ? 'Oui' : 'Pas encore'}}</span>
                            <span class="block text-base">Note: {{internship.score ? internship.score + '/20' : 'Pas de note'}}</span>
                        </n-card>
                        <n-card title="Encadrant académique">
                            <div v-if="internship.supervisor">
                                <span class="block">{{internship.supervisor.first_name}} {{internship.supervisor.last_name}}</span>
                                <span class="block text-gray-400">{{internship.supervisor.email}}</span>
                            </div>
                            <div v-else>
                                <span class="block">Sans encadrant</span>
                            </div>
                        </n-card>
                        <n-card title="Entreprise">
                            <p class="text-base m-0 p-0">{{ internship.company.name}}</p>
                            <p class="text-gray-400">{{ internship.company.city}}, {{ internship.company.phone}}</p>
                        </n-card>
                        <n-card title="Encadrant">
                            <span class="block">{{internship.supervisor_name}}</span>
                            <span class="block text-gray-400">{{internship.supervisor_phone}}</span>
                        </n-card>
                    </n-space>
                </div>
            </div>
        </n-card>
    </div>
</template>

<script setup lang="ts">
import { useInternshipService } from '@/services/InternshipApiService'
import { useAuthStore } from '@/store/useAuthStore'
import { NH1, NCard, NP, NSpace, NButton, NHr, NInputNumber, NTag } from 'naive-ui'
import StudentSmallCard from '@/components/StudentSmallCard.vue'
import { onMounted, ref } from 'vue'

const authStore = useAuthStore()
const internshipService = useInternshipService()
const props = defineProps<{id: number}>()
const internship = ref<any>(null)
const score = ref(0)

onMounted(async () => {
    await refreshData()
})

const refreshData = async () => {
    let id:any = props.id
    internship.value = (await internshipService.get(id)).data
    score.value = internship.value.score ?? 0
}

const validSoutenance = async () => {
    await internshipService.valid(internship.value.id)
    await refreshData()
}
const invalidSoutenance = async () => {
    await internshipService.invalid(internship.value.id)
    await refreshData()
}
const setScore = async () => {
    await internshipService.score(internship.value.id, score.value)
    await refreshData()
}
</script>