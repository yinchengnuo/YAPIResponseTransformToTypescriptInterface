<template>
  <a-config-provider :locale="locale">
    <router-view />
  </a-config-provider>
</template>

<script setup lang="ts">
import locale from 'ant-design-vue/es/locale/zh_CN'
</script>

<style>
@import "@/styles/index.scss";
</style>
