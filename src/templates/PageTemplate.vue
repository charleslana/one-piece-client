<script setup lang="ts">
import FooterComponent from '@/components/FooterComponent.vue';
import NavBarComponent from '@/components/NavBarComponent.vue';

defineProps<{
  type: 'on' | 'off';
}>();
</script>

<template>
  <div class="theme-light bg">
    <NavBarComponent type="off" />
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
