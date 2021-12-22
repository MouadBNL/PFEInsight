<template>
    <div>
        <div class="flex items-center gap-8">
            <div>
                <n-h1 class="block">Mon profil</n-h1>
            </div>
        </div>
        
        <UserCredentials />

        <div v-if="authStore.role == 'student'">
            <StudentProfile />
        </div>

    </div>
</template>
<script setup lang="ts">
import { NH1 } from 'naive-ui'
import UserCredentials from '@/components/UserCredentials.vue'
import StudentProfile from '@/components/StudentProfile.vue'
import { useAuthStore } from '@/store/useAuthStore';

const authStore = useAuthStore()

</script>