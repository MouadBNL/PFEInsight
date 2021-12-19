<template>
    <div class="flex items-center justify-between">
        <n-h1>Tous les utilisateur</n-h1>
        <router-link :to="{name: 'auth.users.create'}">
            <n-button type="success">Ajouter un utilisateur</n-button>
        </router-link>
    </div>

    <n-card>
        <n-table :columns="{}" />
    </n-card>
</template>
<script setup lang="ts">
import { NH1, NButton,NCard, NTable } from 'naive-ui'

const colomuns = [
    {
        title: 'Prénom',
        key: 'first_name'
    },
    {
        title: 'Nom',
        key: 'last_name'
    },
    {
        title: 'Email',
        key: 'email'
    },
    {
        role: 'Role',
        key: 'Role'
    }
]

const data = [
    {
        first_name: 'Mouad',
        last_name: 'Benali',
    }
]
</script>