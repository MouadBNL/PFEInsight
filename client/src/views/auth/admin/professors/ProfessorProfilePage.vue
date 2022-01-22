<template>

    <n-card v-if="professor" :title="'Profil de ' + professor.last_name + ' ' + professor.first_name" class="mb-4">
        <div class="flex">
            <div class="w-1/3 h-full flex flex-col justify-center">
                <div class="mx-auto h-64 w-64 max-h-64 rounded-full overflow-hidden relative">
                    <img :src="professor.profile_picture" alt="" class="absolute top-0 left-0 h-full w-full object-cover">
                </div>
            </div>
            <div class="w-2/3">
                <div class="flex mb-4">
                    <div class="w-1/2">
                        <span>Prénom:</span>
                        <p class="text-xl mt-2">{{professor.first_name}}</p>
                    </div>
                    <div class="w-1/2">
                        <span>Nom:</span>
                        <p class="text-xl mt-2">{{professor.last_name}}</p>
                    </div>
                </div>
                <div class="flex mb-4">
                    <div>
                        <span>Email:</span>
                        <p class="text-xl mt-2">{{professor.email}}</p>
                    </div>
                </div>
            </div>
        </div>
    </n-card>

    <n-card title="Les stages encadrer"  v-if="professor && professor.internships" >
        <div class="grid grid-cols-4 gap-4">
            <router-link :to="{name: 'auth.internship.show', params:{id: itrn.id}}" class="block p-2 rounded hover:bg-gray-50" v-for="itrn in professor.internships" :key="itrn.id">
                
                    <span class="block text-lg font bold">{{ itrn.title }}</span>
                    <span class="text-gray-500">{{ itrn.company.name }}</span>
                    <span class="text-gray-500 ml-2">{{ itrn.company.city }}</span>
                
            </router-link>
        </div>
    </n-card>

</template>

<script setup lang="ts">
import { NCard, useMessage } from 'naive-ui';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useProfessorService } from '@/services/ProferssorApiService';

const route = useRoute()
const message = useMessage()
const professorService = useProfessorService()

const professor = ref<any>(undefined)

onMounted(async () => {
    try {

        let id = route.params.id as any
        const res = await professorService.getProfessor(id)
        professor.value = res.data
    } catch(err) {
        message.error('erreur lors de l\'accès aux données')
    }
})
</script>