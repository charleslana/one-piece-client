<script setup lang="ts">
import FooterComponent from '@/components/FooterComponent.vue';
import NavBarComponent from '@/components/NavBarComponent.vue';

defineProps<{
  type: 'on' | 'off' | 'none';
  bg?: '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08';
}>();
</script>

<template>
  <div class="theme-light bg">
    <NavBarComponent :type="type" />
    <div class="wrapper" :class="`wrapper-${bg || '01'}`">
      <div class="columns is-gapless">
        <div class="column is-one-fifth is-hidden-mobile custom-size"></div>
        <div class="column">
          <div class="wrapper-container container">
            <slot name="wrapper-container"></slot>
          </div>
        </div>
      </div>
    </div>
    <FooterComponent />
  </div>
</template>

<style scoped>
.custom-size {
  width: 225px !important;
}
</style>
