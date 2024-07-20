<script setup lang="ts">
defineProps<{
  message: string;
}>();
</script>

<template>
  <div class="is-notification">{{ message }}</div>
</template>

<style scoped>
.is-notification {
  background-color: white;
  padding: 5px;
  color: black;
  font-weight: bold;
}
</style>
