<script setup lang="ts">
import CardComponent from '@/components/CardComponent.vue';
import ModalComponent from '@/components/ModalComponent.vue';
import TitleComponent from '@/components/TitleComponent.vue';
import { formatFullDate } from '@/utils/utils';
import { ref } from 'vue';

const isModal = ref(false);
const newsTitle = ref();
const newsMessage = ref();
const newsDate = ref();

const newsList = [
  {
    id: 1,
    title: 'Nova Atualização de Sistema',
    date: '2024-07-19 14:51',
    content: 'Boa tarde, estamos refazendo o projeto para melhor atender nossos usuários.',
    likes: 1,
    dislikes: 2
  },
  {
    id: 2,
    title: 'Anúncio Importante',
    date: '2024-07-19 09:30',
    content: 'Estamos lançando novas funcionalidades para melhorar a experiência do usuário.',
    likes: 5,
    dislikes: 0
  },
  {
    id: 3,
    title: 'Anúncio Importante',
    date: '2024-07-19 09:30',
    content: 'Estamos lançando novas funcionalidades para melhorar a experiência do usuário.',
    likes: 0,
    dislikes: 0
  },
  {
    id: 4,
    title: 'Anúncio Importante',
    date: '2024-07-19 09:30',
    content: 'Estamos lançando novas funcionalidades para melhorar a experiência do usuário.',
    likes: 0,
    dislikes: 0
  }
];

function findNewsById(id: number) {
  return newsList.find((news) => news.id === id);
}

function showNewsInModal(id: number): void {
  const news = findNewsById(id);
  if (news) {
    newsTitle.value = news.title;
    newsMessage.value = news.content;
    newsDate.value = formatFullDate(new Date(news.date));
    isModal.value = true;
  }
}
</script>

<template>
  <CardComponent title="Novidades" :max-height="435">
    <template #content>
      <section v-for="(news, index) in newsList" :key="index" class="mb-4">
        <div class="font-luck is-size-5">{{ news.title }}</div>
        <font-awesome-icon :icon="['far', 'clock']" class="mr-2" />
        <span class="font-press2p is-size-8">{{ formatFullDate(new Date(news.date)) }}</span>
        <div class="box news-box">
          <p class="font-press2p is-size-7 max-news-box">{{ news.content }}</p>
          <div class="level">
            <div class="level-left">
              <div class="is-flex">
                <div><font-awesome-icon :icon="['fas', 'thumbs-up']" /> {{ news.likes }}</div>
                <div class="ml-2">
                  <font-awesome-icon :icon="['fas', 'thumbs-down']" /> {{ news.dislikes }}
                </div>
              </div>
            </div>
            <div class="level-right">
              <button class="button btn btn-warning" @click="showNewsInModal(news.id)">Ler</button>
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
            <p>{{ newsMessage }}</p>
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
</style>
