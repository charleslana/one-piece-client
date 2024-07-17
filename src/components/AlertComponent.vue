<script setup lang="ts">
defineProps<{
  messages: string[];
}>();

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
        <ul class="has-text-centered mt-1">
          <li v-for="(message, index) in messages" :key="index">{{ message }}</li>
        </ul>
      </section>
      <footer class="modal-card-foot is-justify-content-end">
        <div class="buttons">
          <button class="button btn btn-warning" @click="closeModal">OK</button>
        </div>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.modal-card {
  background-image: url('../assets/images/layout/top.png'),
    url('../assets/images/layout/bottom.png'), url('../assets/images/layout/middle.jpg');
  background-position:
    center top,
    center bottom,
    center top;
  background-repeat: no-repeat, no-repeat, repeat-y;
  background-size: 100%, 100%, 100%;
  border: 3px solid #c07617;
  border-radius: 5px;
}

.modal-card-body {
  background: transparent;
  color: #222;
}

.modal-card-foot {
  background: transparent;
  border-top: 1px solid #c07617;
}
</style>
