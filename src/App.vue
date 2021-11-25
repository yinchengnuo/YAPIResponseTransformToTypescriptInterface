<template>
  <a-config-provider :locale="locale">
    <router-view />
  </a-config-provider>
  <Updata />
</template>

<script setup lang="ts">
import locale from 'ant-design-vue/es/locale/zh_CN'
import Updata from '@/components/Updata.vue'
</script>

<style>
@import "@/styles/index.scss";
</style>
