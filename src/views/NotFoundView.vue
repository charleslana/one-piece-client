<script setup lang="ts">
import TitleComponent from '@/components/TitleComponent.vue';
import PageTemplate from '@/templates/PageTemplate.vue';
</script>

<template>
  <PageTemplate type="none">
    <template #wrapper-container>
      <TitleComponent title="Pacifistas encontraram um erro!" />
      <img src="../assets/images/layout/error.jpg" alt="Error image" class="is-flex mx-auto" />
      <p class="has-text-centered my-2">Bancando o espertinho? Estamos de olho em você!</p>
      <div class="has-text-centered">
        <RouterLink to="/" class="button btn btn-warning">Voltar em segurança</RouterLink>
      </div>
    </template>
  </PageTemplate>
</template>

<style scoped></style>
