<script setup lang="ts">
import TitleComponent from '@/components/TitleComponent.vue';
import PageTemplate from '@/templates/PageTemplate.vue';
</script>

<template>
  <PageTemplate type="on" bg="04">
    <template #wrapper-container>
      <TitleComponent title="Nome do jogador (Pirata)" />
      <p>
        Você é um humano que desde pequeno quer se tornar o rei dos piratas. Com o passar dos anos
        se destacou entre as pessoas comuns e começou a perceber que era diferente, reconhecendo que
        possuía uma força interna elevada. Após pesquisar muito descobriu que essa força se chama
        'Haki', e está presente em todos seres vivos, e com treinamento pode aprender a usar esse
        haki para várias funções. Com isso em mente você parte em uma jornada pelo mundo, para
        evoluir seu poder e conhecimentos.
      </p>
      <p class="font-luck mt-5 is-size-4">Primeiros passos:</p>
      <p>Ler o Tutorial para aprender as funções do jogo.</p>
      <RouterLink to="/tutorial" class="button btn btn-warning">Ler tutorial</RouterLink>
      <p class="mt-5">Ou você pode ir até o navio do Gol D. Roger para começar sua aventura.</p>
      <RouterLink to="/gol-d-roger" class="button btn btn-warning">Vistar Gol D. Roger</RouterLink>
    </template>
  </PageTemplate>
</template>

<style scoped></style>
