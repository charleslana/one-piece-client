<script setup lang="ts">
const emit = defineEmits(['close']);

function closeModal(): void {
  emit('close');
}
</script>

<template>
  <div class="modal is-active is-justify-content-start pt-5">
    <div class="modal-background"></div>
    <div class="modal-card animate__animated animate__slideInDown">
      <section class="modal-card-body">
        <slot name="content"></slot>
      </section>
      <footer class="modal-card-foot is-justify-content-end">
        <div class="buttons">
          <button class="button btn btn-warning" @click="closeModal">OK</button>
        </div>
      </footer>
    </div>
  </div>
</template>

<style scoped></style>
