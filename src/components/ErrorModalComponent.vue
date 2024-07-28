<script setup lang="ts">
import ModalComponent from './ModalComponent.vue';
import { ref, watch } from 'vue';
import { useErrorStore } from '@/stores/error-store';

const isModal = ref(false);
const modalMessage = ref('');
const code = ref('');
const errorStore = useErrorStore();

watch(
  () => errorStore.errorApi,
  (newValue) => {
    if (newValue) {
      modalMessage.value = newValue.message;
      code.value = newValue.code;
      isModal.value = true;
    }
  },
  { deep: true }
);
</script>

<template>
  <ModalComponent v-if="isModal" @close="isModal = false">
    <template #content>
      <img src="../assets/images/layout/error.jpg" alt="Error image" />
      <p class="has-text-centered my-2">
        Sentomaru: Os Pacifistas encontram um erro, código: {{ code }}
      </p>
      <p class="has-text-centered my-2">{{ modalMessage }}</p>
    </template>
  </ModalComponent>
</template>

<style scoped></style>
