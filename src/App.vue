<script setup lang="ts">
import { RouterView } from 'vue-router';
import ErrorModalComponent from './components/ErrorModalComponent.vue';
</script>

<template>
  <RouterView />
  <ErrorModalComponent />
  <!-- <VTooltip>
    <button>TEST</button>
    <template #popper> TEST TOOLTIP </template>
  </VTooltip> -->
</template>

<style scoped></style>
