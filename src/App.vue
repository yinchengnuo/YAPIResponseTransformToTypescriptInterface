<template>
  <a-config-provider :locale="locale">
    <router-view />
  </a-config-provider>
  <Updata />
</template>

<script setup lang="ts">
import Updata from '@/components/Bottom.vue'
import locale from 'ant-design-vue/es/locale/zh_CN'
</script>

<style>
@import "@/styles/index.scss";
</style>
