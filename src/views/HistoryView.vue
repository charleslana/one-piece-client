<script setup lang="ts">
import NotificationComponent from '@/components/NotificationComponent.vue';
import TitleComponent from '@/components/TitleComponent.vue';
import PageTemplate from '@/templates/PageTemplate.vue';
import { getHistory } from '@/utils/image-utils';
import { formatNumber } from '@/utils/utils';

interface HistoryItem {
  id: number;
  image: string;
  title: string;
  description: string;
  recommendedPowerBattle: number;
}

const historyList: HistoryItem[] = [
  {
    id: 1,
    image: getHistory(1),
    title: 'O início de uma jornada (Alvida)',
    description: 'Ajude Luffy a libertar seu amigo Koby',
    recommendedPowerBattle: 2000
  }
];

const duplicatedArray = Array.from({ length: 10 }, () => [...historyList]);
</script>

<template>
  <PageTemplate type="on" bg="08">
    <template #wrapper-container>
      <div class="level">
        <div class="level-left">
          <TitleComponent title="História!" />
        </div>
      </div>
      <NotificationComponent
        message="Descubra os cenários (história) dos Mares de One Piece e teste seu poder nesses habitats de criaturas desafiadoras. Cada cenário possui criaturas com forças diferentes, tenha cuidado. Vencendo ou perdendo, o bom aventureiro sempre evolui. Boa sorte!"
      />
      <div class="columns mt-5 is-multiline">
        <div class="column is-6" v-for="(history, index) in duplicatedArray.flat()" :key="index">
          <div class="card">
            <div class="card-image">
              <figure class="image is-4by3">
                <img :src="history.image" alt="History image" />
              </figure>
            </div>
            <div class="custom-panel">{{ history.title }}</div>
            <div class="card-content">
              <div class="content">
                <p>{{ history.description }}</p>
                <p class="has-text-weight-bold">Recomendado:</p>
                <div class="list-group-item">
                  <div>
                    <font-awesome-icon :icon="['fas', 'universal-access']" class="mr-2 blue" />Poder
                    de Luta (PL)
                  </div>
                  <div>
                    <span class="tag is-medium is-link">{{
                      formatNumber(history.recommendedPowerBattle)
                    }}</span>
                  </div>
                </div>
              </div>
            </div>
            <footer class="card-footer">
              <button class="card-footer-item button btn btn-warning">Entrar</button>
            </footer>
          </div>
        </div>
      </div>
    </template>
  </PageTemplate>
</template>

<style scoped>
.custom-panel {
  color: #a94442;
  background-color: #f2dede;
  padding: 10px 15px;
  letter-spacing: 2px;
  color: #d9534f;
  font-size: 18px;
  text-shadow:
    -1px 0 black,
    0 1px black,
    1px 0 black,
    0 -1px black;
  text-align: center;
}

.card {
  height: 100%;
}
</style>
