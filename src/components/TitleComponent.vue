<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>

<template>
  <div class="notification notification-custom is-size-4">
    {{ title }}
  </div>
</template>

<style scoped>
.notification-custom {
  background: url('../assets/images/layout/back.jpg') top center repeat;
  background-color: rgb(220, 161, 94);
  color: #222 !important;
  position: relative;
  padding: 1rem;
  font-family: 'TradeWinds';
}

.notification-custom:before {
  content: '';
  display: inline-block;
  width: 50px;
  height: 50px;
  vertical-align: middle;
  background-image: url('../assets/images/icons/chopper.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin-right: 5px;
}
</style>
