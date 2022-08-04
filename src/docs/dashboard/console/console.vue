<template>
  <div>
    <HButton :icon="Accessibility" type="primary" :iconType="{ depth: '4' }" @click="testClick">
      测试
    </HButton>
  </div>
</template>

<script setup lang="ts">
  import { Accessibility } from '@vicons/ionicons5';

  function testClick() {
    console.log(123);
  }
</script>

<style scoped></style>
