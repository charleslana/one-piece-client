<script setup lang="ts">
import TitleComponent from '@/components/TitleComponent.vue';
import type ResultPaginated from '@/interfaces/result-paginated';
import type { User } from '@/interfaces/user';
import UserService from '@/services/user-service';
import PageTemplate from '@/templates/PageTemplate.vue';
import { getAvatarMini } from '@/utils/avatar-utils';
import { getBreed } from '@/utils/user-character-utils';
import { formatNumber } from '@/utils/utils';
import { computed, onMounted, ref } from 'vue';

onMounted(async () => {
  await asyncFilterUsers();
});

const rankingList = ref<ResultPaginated<User>>({
  results: [],
  pagination: {
    currentPage: 0,
    hasNextPage: false,
    totalCount: 0,
    totalPages: 0
  }
});
const page = ref(1);
const isLoading = ref(false);

const getNextButtonAttributes = computed(() => {
  if (!rankingList.value.pagination.hasNextPage || isLoading.value) {
    return {
      disabled: true
    };
  }
  return {
    disabled: undefined
  };
});

const getPreviousButtonAttributes = computed(() => {
  if (rankingList.value.pagination.currentPage === 1 || isLoading.value) {
    return {
      disabled: true
    };
  }
  return {
    disabled: undefined
  };
});

const displayedPages = computed(() => {
  const startPage = Math.max(rankingList.value.pagination.currentPage - 3, 1);
  const endPage = Math.min(
    rankingList.value.pagination.currentPage + 3,
    rankingList.value.pagination.totalPages
  );
  return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
});

async function asyncFilterUsers(): Promise<void> {
  isLoading.value = true;
  try {
    const response = await UserService.filterPaginated({ page: page.value });
    rankingList.value = response;
  } catch (e) {
    // console.log(e);
  } finally {
    isLoading.value = false;
  }
}

async function previousPage(): Promise<void> {
  if (rankingList.value.pagination.currentPage > 1) {
    rankingList.value.pagination.currentPage--;
    page.value = rankingList.value.pagination.currentPage;
    await asyncFilterUsers();
  }
}

async function nextPage(): Promise<void> {
  if (rankingList.value.pagination.currentPage < rankingList.value.pagination.totalPages) {
    rankingList.value.pagination.currentPage++;
    page.value = rankingList.value.pagination.currentPage;
    await asyncFilterUsers();
  }
}

async function gotoPage(pg: number): Promise<void> {
  if (pg != rankingList.value.pagination.currentPage) {
    rankingList.value.pagination.currentPage = pg;
    page.value = rankingList.value.pagination.currentPage;
    await asyncFilterUsers();
  }
}
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
              v-for="(ranking, index) in rankingList.results"
              :key="index"
            >
              <td class="middle">{{ index + 1 }}</td>
              <td class="middle">
                {{ ranking.guildTag ? `[${ranking.guildTag}]` : '' }} {{ ranking.name }}
              </td>
              <td class="middle">{{ getBreed(ranking.breed) }}</td>
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
        <button
          class="pagination-previous button btn btn-warning"
          :class="{ 'is-loading': isLoading }"
          @click="previousPage"
          v-bind="getPreviousButtonAttributes"
        >
          Anterior
        </button>
        <button
          class="pagination-next button btn btn-warning"
          @click="nextPage"
          :class="{ 'is-loading': isLoading }"
          v-bind="getNextButtonAttributes"
        >
          Próximo
        </button>
        <ul class="pagination-list">
          <li v-for="displayedPage in displayedPages" :key="displayedPage">
            <button
              class="pagination-link button btn btn-warning"
              :class="[{ 'is-loading': isLoading }, { 'is-current': displayedPage === page }]"
              @click="gotoPage(displayedPage)"
            >
              {{ displayedPage }}
            </button>
          </li>
        </ul>
      </nav>
    </template>
  </PageTemplate>
</template>

<style scoped></style>
