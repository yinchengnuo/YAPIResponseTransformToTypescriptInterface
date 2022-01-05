<template>
  <a-config-provider :locale="locale">
    <router-view />
  </a-config-provider>
  <Updata v-if="electron" />
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue'
import Updata from '@/components/Bottom.vue'
import locale from 'ant-design-vue/es/locale/zh_CN'
const electron: Ref<boolean> = ref(Boolean(window.require))
</script>

<style>
@import "@/styles/index.scss";
</style>
