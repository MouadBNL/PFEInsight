<template>
    <n-card
        title="Inviter un collègue"
        class="w-1/2"
    >
        <div class="flex gap-4">
            <n-select 
                v-model:value="student"
                :options="students"
                filterable
                :render-label="renderLabel"
                :render-tag="renderTag"
            />
            <n-button @click="sendInvite">Envoyer</n-button>
        </div>
    </n-card>
</template>

<script setup lang="ts">
import { useStudentService } from '@/services/StudentApiService'
import { useAuthStore } from '@/store/useAuthStore';
import { NCard, NSelect, NFormItem, NInput, NButton, useMessage } from 'naive-ui'
import { h, onMounted, ref } from 'vue';
import StudentSmallCard from './StudentSmallCard.vue';
const studentService = useStudentService()
const message = useMessage()
const authStore = useAuthStore()

const emit = defineEmits(['sent'])

const students = ref<any[]>()
const student = ref<any>()

onMounted(async () => {
    const res = await studentService.getAllStudents()
    res.data = res.data.filter((st:any) => {
        return st.id != authStore.id
    })
    students.value = res.data.map((st:any) => {
        return {
            label: st.apogee + ' ' + st.first_name + ' ' + st._last_name,
            value: st.id,
            id: st.id,
            first_name: st.first_name,
            last_name: st.last_name,
            profile_picture: st.profile_picture,
            apogee: st.apogee,
        }
    })

})

const renderLabel = (option:any) => {
    return h(
        'div',
        {
        },
        [
            h(
                'div', 
                {
                    class: 'm-2 p2 flex items-center gap-4'
                },
                [
                    h(
                        'img',
                        {
                            src: option.profile_picture,
                            class: 'h-10 w-10 rounded-full'
                        }
                    ),
                    h(
                        'div',
                        {},
                        [
                            option.first_name,
                            ' ',
                            option.last_name,
                            h(
                                'span',
                                {
                                    class: 'block text-gray-400'
                                },
                                [option.apogee]
                            )
                        ]
                    )
                ]
            ),
        ]
    )
}
const renderTag = ({option}: any) => {
    return h(
        'div',
        {
            
        },
        [option.first_name + ' ' + option.last_name + ' ' + option.apogee]
    );
}

const sendInvite = async () => {
    try{
        await studentService.invite(student.value)
        message.success('Invitation envoyée')
        emit('sent')
    } catch (err) {
        message.error('une erreur s\'est produite, réessayez plus tard')
    }
}
</script>