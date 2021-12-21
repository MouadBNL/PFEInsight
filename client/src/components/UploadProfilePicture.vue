<template>
    <div>
        <div class="h-64 w-64 bg-gray-50 relative rounded-full overflow-hidden">
            <img :src="authStore.profile_picture" alt="" class="absolute h-full w-full object-cover">     
        </div>
        
        <div>
            <input type="file" ref="fileRef" />
            <n-button @click="uploadn">Upload</n-button>
        </div>
        <div>
            <n-upload
                action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
                :multiple="false"
                :customRequest="upload"
            >
                <n-button>Upload</n-button>
            </n-upload>
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

const upload = ({
    file,
}: any) => {
    const formData = new FormData()
    console.log(file.file)
    formData.append('profile_picture', file.file);
    console.log(formData);
    userService.uploadProfilePicture(formData)
    .then((res) => {
        authStore.profile_picture = res.data.data.profile_picture
        message.success('Upladed')
    })
    .catch(err => {
        //  
    })
}
const fileRef = ref<any>(null)
const uploadn = () => {
    const formData = new FormData()
    console.log(fileRef.value.files[0])
    console.log(typeof fileRef.value.files[0])
    formData.append('profile_picture', fileRef.value.files[0])
    userService.uploadProfilePicture(formData)
    .then((res) => {
        authStore.profile_picture = res.data.data.profile_picture
        message.success('Upladed')
    })
    .catch(err => {
         
    })
}
</script>