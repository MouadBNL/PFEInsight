<template>
	<n-loading-bar-provider>
		<NMessageProvider>
			<n-dialog-provider>
				<router-view></router-view>
			</n-dialog-provider>
		</NMessageProvider>
	</n-loading-bar-provider>
</template>

<script setup lang="ts">
import { NMessageProvider, NDialogProvider, NLoadingBarProvider, useLoadingBar } from 'naive-ui'


</script>