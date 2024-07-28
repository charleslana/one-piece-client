<script setup lang="ts">
import CardComponent from '@/components/CardComponent.vue';
import ModalComponent from '@/components/ModalComponent.vue';
import TitleComponent from '@/components/TitleComponent.vue';
import type { Newspaper } from '@/interfaces/newspaper';
import NewspaperService from '@/services/newspaper-service';
import { formatBreakLines, formatCompactNumber, formatFullDate } from '@/utils/utils';
import { onMounted, ref } from 'vue';

onMounted(() => {
  asyncGetAllNewspaper();
});

const isModal = ref(false);
const newsTitle = ref();
const newsMessage = ref();
const newsDate = ref();

const newsList = ref<Newspaper[]>([]);

function showNewsInModal(news: Newspaper): void {
  newsTitle.value = news.title;
  newsMessage.value = news.description;
  newsDate.value = formatFullDate(new Date(news.createdAt));
  isModal.value = true;
}

async function asyncGetAllNewspaper(): Promise<void> {
  try {
    const response = await NewspaperService.getAll();
    newsList.value = response;
  } catch (e) {
    // console.log(e);
  }
}
</script>

<template>
  <CardComponent title="Novidades" :max-height="435">
    <template #content>
      <section v-for="(news, index) in newsList" :key="index" class="mb-4">
        <div class="font-luck is-size-5">{{ news.title }}</div>
        <font-awesome-icon :icon="['far', 'clock']" class="mr-2" />
        <span class="font-press2p is-size-8">{{ formatFullDate(new Date(news.createdAt)) }}</span>
        <div class="box news-box">
          <p class="font-press2p is-size-7 max-news-box">{{ news.description }}</p>
          <div class="level">
            <div class="level-left">
              <div class="is-flex">
                <div class="is-clickable has-text-weight-bold" :class="{ green: false }">
                  <font-awesome-icon :icon="['fas', 'thumbs-up']" />
                  {{ formatCompactNumber(1) }}
                </div>
                <div class="ml-2 is-clickable has-text-weight-bold">
                  <font-awesome-icon :icon="['fas', 'thumbs-down']" />
                  {{ formatCompactNumber(0) }}
                </div>
              </div>
            </div>
            <div class="level-right">
              <button class="button btn btn-warning" @click="showNewsInModal(news)">Ler</button>
            </div>
          </div>
        </div>
      </section>
    </template>
  </CardComponent>
  <ModalComponent v-if="isModal" @close="isModal = false">
    <template #content>
      <img src="../assets/images/layout/news.jpg" alt="News image" />
      <div class="card news-card">
        <header class="card-header">
          <TitleComponent :title="newsTitle" class="is-fullwidth" />
        </header>
        <div class="card-content">
          <div class="content">
            <p v-html="formatBreakLines(newsMessage)"></p>
            <small class="news-author">Anunciado pelo Governo Mundial em {{ newsDate }}.</small>
          </div>
        </div>
      </div>
    </template>
  </ModalComponent>
</template>

<style scoped>
.news-box {
  padding: 5px;
  border-radius: 5px;
  background-color: #fbda8f;
  overflow-x: hidden;
  color: #333;
}

.max-news-box {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 250px;
}

.news-card {
  border: 1px solid #f0ad4e;
  border-radius: 4px;
  background-color: #fbda8f;
}

.news-author:before {
  content: '';
  display: inline-block;
  width: 8px;
  height: 8px;
  margin-top: -4px;
  margin-right: 6px;
  background-image: url('../assets/images/icons/sword.png');
  background-size: cover;
  background-repeat: no-repeat;
  vertical-align: middle;
}

.green {
  color: green;
}
</style>
