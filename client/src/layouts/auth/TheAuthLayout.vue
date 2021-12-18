<template>
    <NLayout style="height: 100vh">
    <n-layout-header style="height: 64px; padding: 24px;" bordered
      >Auth name soon</n-layout-header
    >
    <n-layout position="absolute" style="top: 64px; bottom: 64px;" has-sider>
      <n-layout-sider
        content-style="padding: 24px;"
        collapse-mode="transform"
        :collapsed-width="20"
        show-trigger="arrow-circle"
        :native-scrollbar="false"
        bordered
      >
        <n-h2>Handian Bridge</n-h2>
        <n-h2>Handian Bridge</n-h2>
        <n-h2>Handian Bridge</n-h2>
        <n-h2>Handian Bridge</n-h2>
        <n-h2>Handian Bridge</n-h2>
        <n-h2>Handian Bridge</n-h2>
        <n-h2>Handian Bridge</n-h2>
        <n-h2>Handian Bridge</n-h2>
        <n-h2>Handian Bridge</n-h2>
        <n-h2>Handian Bridge</n-h2>
        <n-h2>Handian Bridge</n-h2>
        <n-h2>Handian Bridge</n-h2>
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
import { NLayout, NLayoutHeader, NLayoutSider, NH2, NLayoutFooter } from "naive-ui"
</script>