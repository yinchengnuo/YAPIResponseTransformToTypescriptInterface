<template>
  <div class="print flexc">
    <h1>print</h1>
    <webview ref="webview" src="print.html" nodeintegration></webview>
    <br />
    <a-button type="primary" @click="print">打印</a-button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const webview = ref()

onMounted(() => {
  // webview.value
})

const print = () => {
  // console.log(webview.value.get)
  console.log(webview.value.getPrinters())
}
</script>

<style lang="scss" scoped>
h1 {
  text-align: center;
}
</style>
