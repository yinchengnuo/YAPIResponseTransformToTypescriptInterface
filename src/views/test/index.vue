<template>
  <div class="NewCom">
    <div class="self">1231</div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.NewCom {
  :deep(.self) {
    color: red;
  }
  background: orange;
  .a {
    color: pink;
  }
  .b {
    color: blue;
  }
}
</style>
