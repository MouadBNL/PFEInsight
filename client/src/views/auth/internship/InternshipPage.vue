<template>
    <template v-if="id">
        <display-internship-info :id="id" />
    </template>
</template>

<script setup lang="ts">
import DisplayInternshipInfo from '@/components/DisplayInternshipInfo.vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router';
const id = ref<any>(null)
const route = useRoute()
id.value = route.params.id
</script>