<template>
	<NMessageProvider>
		<n-dialog-provider>
			<router-view></router-view>
		</n-dialog-provider>
	</NMessageProvider>
</template>

<script setup lang="ts">
import { NMessageProvider, NDialogProvider } from 'naive-ui'
</script>