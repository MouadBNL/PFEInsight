<template>
    <div class="m-2 p2 flex items-center gap-4">
            <img :src="props.student.profile_picture" class="h-10 w-10 rounded-full" />
        <div>
            {{ props.student.first_name }} {{ props.student.last_name }}
            <span class="block text-gray-400">{{ props.student.apogee }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    student: {
        first_name:string,
        last_name:string,
        profile_picture: string,
        apogee: any,
        [attr:string]: any
    }
}>()
</script>