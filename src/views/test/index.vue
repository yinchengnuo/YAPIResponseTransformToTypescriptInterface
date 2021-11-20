<template>
  <div class="NewCom">
    <div class="self">1231</div>
    <Test />
  </div>
</template>

<script setup lang="ts">
import Test from '@/components/Test.vue'
</script>

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
