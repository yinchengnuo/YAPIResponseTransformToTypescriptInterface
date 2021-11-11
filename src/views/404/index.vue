<template>
  <div class="PageNotFound h100 flexc">
    <img src="@/assets/404.png" />
    <h2 class="text">哎呀！页面找不到了</h2>
    <a-button type="primary" @click="$router.replace('/')">返回首页</a-button>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.PageNotFound {
  background: #f8fafa;
  .text {
    transform: translateY(-100px);
  }
}
</style>
