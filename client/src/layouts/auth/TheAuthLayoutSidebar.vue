<template>
    <div>
        <n-menu
            :options="menuOptions"
        />
    </div>
</template>

<script setup lang="ts">
import { NMenu } from 'naive-ui'
import { h, resolveComponent } from 'vue';

const menuOptions = [
    {
        label: () => h(
            resolveComponent('router-link'),
            {
                to: {
                    name: 'auth.users'
                }
            },
            { default: () => 'Utilisateurs'}
        ),
        key: 'users'
    },
    {
        label: () => h(
            resolveComponent('router-link'),
            {
                to: {
                    name: 'auth.about'
                }
            },
            { default: () => 'À propos'}
        ),
        key: 'about'
    }
]
</script>