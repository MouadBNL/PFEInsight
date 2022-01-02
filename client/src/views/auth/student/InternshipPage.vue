<template>
    <div>
        <div class="">
            <h1>Mon stage</h1>

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
            <n-card v-else>
                Data loaded
            </n-card>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useStudentService } from '@/services/StudentApiService'
import { NSpin, NCard, NResult, NButton } from 'naive-ui'
const studentService = useStudentService()
const hasInternship = ref<boolean>(false)

onMounted(async () => {
    const profile = await studentService.getProfile()
    if(profile.data.internship != null){
        hasInternship.value = true
    }
})
</script>