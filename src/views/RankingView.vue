<script setup lang="ts">
import TitleComponent from '@/components/TitleComponent.vue';
import PageTemplate from '@/templates/PageTemplate.vue';
import { getAvatarMini } from '@/utils/avatar-utils';
import { formatNumber } from '@/utils/utils';

interface Ranking {
  id: number;
  name: string;
  breed: string;
  battlePoint: number;
  avatar: string;
  guildTag: string;
}

const rankingList: Ranking[] = [
  {
    id: 1,
    name: 'Nome personagem',
    breed: 'Humano',
    battlePoint: 8910065,
    avatar: '1',
    guildTag: 'TAG'
  }
];

const duplicatedArray = Array.from({ length: 20 }, () => [...rankingList]);
</script>

<template>
  <PageTemplate type="on" bg="06">
    <template #wrapper-container>
      <div class="level">
        <div class="level-left">
          <TitleComponent title="Ranking!" />
        </div>
      </div>
      <p>
        A lista com os mais fortes de One Piece deste Mundo, veja se seu nome está entre os
        melhores. Treine mais e vá em busca do seu poder!
      </p>
      <div class="table-container mt-5">
        <table class="table mx-auto is-striped is-fullwidth is-hoverable">
          <thead>
            <tr class="has-text-centered has-text-weight-bold">
              <th class="has-text-centered">Rank</th>
              <th class="has-text-centered">Nome</th>
              <th class="has-text-centered">Raça</th>
              <th class="has-text-centered">PL</th>
              <th class="has-text-centered">Avatar</th>
            </tr>
          </thead>
          <tfoot>
            <tr class="has-text-centered has-text-weight-bold">
              <th class="has-text-centered">Rank</th>
              <th class="has-text-centered">Nome</th>
              <th class="has-text-centered">Raça</th>
              <th class="has-text-centered">PL</th>
              <th class="has-text-centered">Avatar</th>
            </tr>
          </tfoot>
          <tbody>
            <tr
              class="has-text-centered has-text-weight-bold"
              v-for="(ranking, index) in duplicatedArray.flat()"
              :key="index"
            >
              <td class="middle">{{ index + 1 }}</td>
              <td class="middle">
                {{ ranking.guildTag ? `[${ranking.guildTag}]` : '' }} {{ ranking.name }}
              </td>
              <td class="middle">{{ ranking.breed }}</td>
              <td class="middle">{{ formatNumber(8910065) }}</td>
              <td class="middle">
                <figure class="image is-96x96 mx-auto">
                  <img :src="getAvatarMini(ranking.avatar)" alt="Avatar image" class="is-rounded" />
                </figure>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav class="pagination is-centered" role="navigation" aria-label="pagination">
        <button class="pagination-previous btn btn-warning">Anterior</button>
        <button class="pagination-next btn btn-warning">Próximo</button>
        <ul class="pagination-list">
          <li><button class="pagination-link btn btn-warning">1</button></li>
          <li><button class="pagination-link btn btn-warning">2</button></li>
          <li><button class="pagination-link btn btn-warning">3</button></li>
        </ul>
      </nav>
    </template>
  </PageTemplate>
</template>

<style scoped></style>
