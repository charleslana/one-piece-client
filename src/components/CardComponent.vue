<script setup lang="ts">
defineProps<{
  title: string;
  footerName?: string;
  footerLink?: string;
  maxHeight?: number;
}>();
</script>

<template>
  <div class="card">
    <header class="card-header is-align-items-center">
      <img src="../assets/images/icons/card-title.png" alt="Card title icon" class="icon-title" />
      <p class="card-header-title font-luck is-size-4">{{ title }}</p>
    </header>
    <div
      class="card-content"
      :style="{ maxHeight: maxHeight ? maxHeight + 'px' : 'none', overflow: 'auto' }"
    >
      <div class="content">
        <slot name="content"></slot>
      </div>
    </div>
    <footer class="card-footer" v-if="footerName">
      <RouterLink :to="footerLink || ''" class="card-footer-item is-justify-content-flex-end blue">
        {{ footerName }}
        <font-awesome-icon :icon="['fas', 'circle-arrow-right']" class="ml-1" />
      </RouterLink>
    </footer>
  </div>
</template>

<style scoped>
.card {
  border-radius: 3px;
}

.card-header {
  background: url('../assets/images/layout/back.jpg') top center repeat;
  background-color: rgb(220, 161, 94);
  border-top-left-radius: 3px !important;
  border-top-right-radius: 3px !important;
}

.card-footer {
  background-color: white;
  border-bottom-left-radius: 3px !important;
  border-bottom-right-radius: 3px !important;
  border: none;
}

.icon-title {
  height: 40px;
}
</style>
