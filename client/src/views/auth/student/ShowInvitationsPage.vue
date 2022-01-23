<template>
    <div>
        <n-h1>Invitations reçues</n-h1>
        <n-card v-if="invitations.length == 0">
            <p class="text-center">Pas encore d'invitations, revenez plus tard</p>
        </n-card>
        <n-card 
            v-for="invitation in invitations" :key="invitation.id"
            class="mb-4"
        >
            <div class="flex items-center justify-between">
                <p>
                    {{ invitation.sender.first_name }} {{ invitation.sender.last_name }} vous a invité à le rejoindre dans son stage : {{ invitation.internship.title}}
                </p>
                <n-space>
                    <n-button type="success" @click="() => accept(invitation.id)">
                        J'accepte
                    </n-button>
                    <n-button type="error" @click="() => refuse(invitation.id)">
                        Je refuse
                    </n-button>
                </n-space>
            </div>
        </n-card>
    </div>
</template>

<script setup lang="ts">
import { useInvitationService } from '@/services/InvitationApiService'
import { NH1, NCard, useMessage, NSpace, NButton  } from 'naive-ui'
import { onMounted, ref } from 'vue'

const invitationService = useInvitationService()
const message = useMessage()

const invitations = ref<any[]>([])
onMounted(async () => {
    await refreshInvitations()
})

const refreshInvitations = async () => {
    try {
        const res = await invitationService.getAllInvitations()
        invitations.value = res.data.data
    } catch (err:any) {
        message.error('Un erreur est survenue, veuillez réessayer plus tard')
    }
}

const accept = async (id:any) => {
    try {
        await invitationService.accept(id)
        message.success('Invitation acceptée')
    } catch (err:any) {
        message.error('Un erreur est survenue, veuillez réessayer plus tard')
    } finally {
        await refreshInvitations()
    }
}
const refuse = async (id:any) => {
    try {
        await invitationService.refuse(id)
        message.success('Invitation refusée')
    } catch (err:any) {
        message.error('Un erreur est survenue, veuillez réessayer plus tard')
    } finally {
        await refreshInvitations()
    }
}
</script>