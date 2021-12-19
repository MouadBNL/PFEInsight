<template>
    <NLayout style="height: 100vh">
    <n-layout-header style="height: 64px; padding: 24px;" bordered>
		<div class="flex justify-between items-center">
			<div>
				<h2 class="text-xl font-black m-0">PFE Insight</h2>
			</div>
			<div>
				<span class="mr-5 inline-block">
					{{ authStore.first_name }} {{ authStore.last_name }}
				</span>
				<NButton type="primary" @click="handleLogout">
					Logout
				</NButton>
			</div>
		</div>
	</n-layout-header>
    <n-layout position="absolute" style="top: 64px; bottom: 64px;" has-sider>
      <n-layout-sider
        content-style="padding: 24px;"
        collapse-mode="transform"
        :collapsed-width="20"
        show-trigger="arrow-circle"
        :native-scrollbar="false"
        bordered
      >
	  	Menu
      </n-layout-sider>
      <n-layout content-style="padding: 24px;" :native-scrollbar="false">
        <router-view></router-view>
      </n-layout>
    </n-layout>
    <n-layout-footer
      position="absolute"
      style="height: 64px; padding: 24px;"
      bordered
    >
      Powered by NaiveUI
    </n-layout-footer>
  </NLayout>
</template>

<script setup lang="ts">
import { NLayout, NLayoutHeader, NLayoutSider, NButton, NLayoutFooter, useMessage } from "naive-ui"
import { useAuthStore } from "@/store/useAuthStore"
import { onMounted } from "vue"
import { useRouter } from 'vue-router'
import { useAuthService } from "@/services/AuthApiService"
const authStore = useAuthStore()
const authService = useAuthService()
const message = useMessage()
onMounted(() => {
	if(! authStore.first_name || ! authStore.token){
		const router = useRouter()
		router.push({name: 'login'})
	}

})
const handleLogout = () => {
	authService.logout().then((res) => {
		message.success('logged out')
	})
}
</script>