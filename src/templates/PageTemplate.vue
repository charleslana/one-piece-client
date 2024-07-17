<script setup lang="ts">
import FooterComponent from '@/components/FooterComponent.vue';
import NavBarComponent from '@/components/NavBarComponent.vue';

defineProps<{
  type: 'on' | 'off' | 'none';
}>();
</script>

<template>
  <div class="theme-light bg">
    <NavBarComponent :type="type" />
    <div class="wrapper">
      <div class="columns is-gapless">
        <div class="column is-one-fifth custom-menu is-hidden-mobile"></div>
        <div class="column">
          <div class="container wrapper-container">
            <slot name="wrapper-container"></slot>
          </div>
        </div>
      </div>
    </div>
    <FooterComponent />
  </div>
</template>

<style scoped></style>
