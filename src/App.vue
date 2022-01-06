<template>
  <a-config-provider :locale="locale">
    <router-view />
  </a-config-provider>
  <Bottom v-if="require" />
</template>

<script setup lang="ts">
import Bottom from '@/components/Bottom.vue'
import locale from 'ant-design-vue/es/locale/zh_CN'
const require = Boolean(window.require)
</script>

<style>
@import "@/styles/index.scss";
</style>
