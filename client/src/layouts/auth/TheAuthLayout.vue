<template>
    <NLayout style="height: 100vh">
    <n-layout-header style="height: 64px;" bordered>
		<div class="flex justify-between items-center px-6 h-full">
			<div>
        <router-link :to="{name: 'auth.dashboard'}">
				  <h2 class="text-xl font-black m-0 text-black no-underline">PFE Insight</h2>
        </router-link>
			</div>
			<div class="flex items-center gap-5">
        <div class="h-8 w-8 bg-gray-50 relative rounded-full overflow-hidden">
          <img :src="authStore.profile_picture" class="absolute top-0 left-0 h-full w-full object-cover" >
        </div>
				<span class=" inline-block">
					{{ authStore.first_name }} {{ authStore.last_name }}
				</span>
				<NButton type="error" :loading="authService.isLoading.value" @click="handleLogout">
					Se déconnecter
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
        <TheAuthLayoutSidebar />
      </n-layout-sider>
      <n-layout content-style="padding: 24px;" :native-scrollbar="false" class="bg-gray-50">

        <main class="container mx-auto">
          <router-view></router-view>
        </main>

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
import TheAuthLayoutSidebar from './TheAuthLayoutSidebar.vue'
import { NLayout, NLayoutHeader, NLayoutSider, NButton, NLayoutFooter, useMessage, useLoadingBar } from "naive-ui"
import { useAuthStore } from "@/store/useAuthStore"
import { onMounted } from "vue"
import { useRouter } from 'vue-router'
import { useAuthService } from "@/services/AuthApiService"
const authStore = useAuthStore()
const authService = useAuthService()
const message = useMessage()
const loadingBar = useLoadingBar()

import router from '@/router'

onMounted(() => {
	if(! authStore.first_name){
		const router = useRouter()
		router.push({name: 'login'})
	}
  router.beforeEach((to, from, next) => {
      // If this isn't an initial page load.
      if (from.name) {
        // Start the route progress bar.
        loadingBar.start()
        console.log('stat loading bar')
      }
      next()
	  })
	  
	  router.afterEach((to, from) => {
      // Complete the animation of the route progress bar.
      loadingBar.finish()
	  })
})

const handleLogout = () => {
	authService.logout().then((res) => {
		message.success('logged out')
	})
}
</script>