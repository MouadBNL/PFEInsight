<template>
    <div class="w-full">
        <div class="h-64 w-64 bg-gray-50 relative rounded-full overflow-hidden mb-4 mx-auto">
            <img :src="authStore.profile_picture" alt="" class="absolute h-full w-full object-cover">     
        </div>
    
        <div class="flex items-center justify-center gap-4" :key="rerenderKey">
            <n-upload
            style="display: inline-block;width: fit-content; height: fit-content;"
                action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
                :multiple="false"
                :customRequest="upload"
                accept=".jpeg,.png,.jpg,.gif,.svg"
            >
                <n-button>Changer ma photo de profile</n-button>
            </n-upload>
            <n-button type="error" @click="deleteImage" class="mb-2">Supprimer mon image</n-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useUserService } from '@/services/UserApiService'
import { useAuthStore } from '@/store/useAuthStore'
import { NUpload,NButton, useMessage } from 'naive-ui'
import { ref } from 'vue'

const userService = useUserService()
const message = useMessage()
const authStore = useAuthStore()

const rerenderKey = ref(0)

const upload = ({
    file,
}: any) => {
    const formData = new FormData()
    formData.append('profile_picture', file.file);
    userService.uploadProfilePicture(formData)
    .then((res) => {
        authStore.profile_picture = res.data.data.profile_picture
        message.success('Votre photo de profil a été mise à jour')
    }).finally(()=>{
        rerenderKey.value ++;
    })
}

const deleteImage = () => {
    userService.uploadProfilePicture({"profile_picture": null})
    .then(res => {
        authStore.profile_picture = res.data.data.profile_picture
        message.success('Votre photo de profil a été mise à jour')
    })
}
</script>

<style scoped>
div.n-upload-file-list{
    display: none !important;
}
</style>