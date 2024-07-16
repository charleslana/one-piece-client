<script setup lang="ts">
defineProps<{
  message: string;
}>();
</script>

<template>
  <div class="box">{{ message }}</div>
</template>

<style scoped>
.box {
  border: 1px solid #f0ad4e;
  border-radius: 4px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
}
</style>
