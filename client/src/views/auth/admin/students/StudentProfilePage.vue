<template>

    <n-card v-if="student" :title="'Profil de ' + student.last_name + ' ' + student.first_name">
        <div class="flex">
            <div class="w-1/3 h-full flex flex-col justify-center">
                <div class="mx-auto h-64 w-64 max-h-64 rounded-full overflow-hidden relative">
                    <img :src="student.profile_picture" alt="" class="absolute top-0 left-0 h-full w-full object-cover">
                </div>
            </div>
            <div class="w-2/3">
                <div class="flex mb-4">
                    <div class="w-1/2">
                        <span>Prénom:</span>
                        <p class="text-xl mt-2">{{student.first_name}}</p>
                    </div>
                    <div class="w-1/2">
                        <span>Nom:</span>
                        <p class="text-xl mt-2">{{student.last_name}}</p>
                    </div>
                </div>
                <div class="flex mb-4">
                    <div>
                        <span>Email:</span>
                        <p class="text-xl mt-2">{{student.email}}</p>
                    </div>
                </div>
                <div class="flex mb-4">
                    <div class="w-1/2">
                        <span>Apogee:</span>
                        <p class="text-xl mt-2">{{student.apogee}}</p>
                    </div>
                    <div class="w-1/2">
                        <span>Filière:</span>
                        <p class="text-xl mt-2">{{student.field}}</p>
                    </div>
                </div>
                <div class="flex mb-4">
                    <div class="w-1/2">
                        <span>Sexe:</span>
                        <p class="text-xl mt-2">{{typeof student.sexe == 'string' ? (student.sexe == 'male' ? 'Homme' : 'Femme') : 'non défini'}}</p>
                    </div>
                    <div class="w-1/2">
                        <span>Date de naissance:</span>
                        <p class="text-xl mt-2">{{student.birthday}}</p>
                    </div>
                </div>
            </div>
        </div>
    </n-card>

    <div v-if="student && student.internship && student.internship.id" class="mt-8">
        <display-internship-info :id="student.internship.id" />
    </div>

</template>

<script setup lang="ts">
import { NCard, useMessage } from 'naive-ui';
import { useStudentService } from '@/services/StudentApiService';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import DisplayInternshipInfo from '@/components/DisplayInternshipInfo.vue';

const route = useRoute()
const message = useMessage()
const studentService = useStudentService()

const student = ref<any>(undefined)

onMounted(async () => {
    try {
        let id = route.params.id as any
        const res = await studentService.getStudent(id)
        student.value = res.data
        console.log({t: student.value})
    } catch(err) {
        message.error('erreur lors de l\'accès aux données')
    }
})
</script>