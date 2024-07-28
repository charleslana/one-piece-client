<script setup lang="ts">
import CardComponent from '@/components/CardComponent.vue';
import ModalComponent from '@/components/ModalComponent.vue';
import TitleComponent from '@/components/TitleComponent.vue';
import type { Newspaper } from '@/interfaces/newspaper';
import type { CreateUserNewspaper, UserNewspaper } from '@/interfaces/user-newspaper';
import NewspaperService from '@/services/newspaper-service';
import { formatBreakLines, formatCompactNumber, formatFullDate, showError } from '@/utils/utils';
import { onMounted, ref } from 'vue';
import { useUserStore } from '@/stores/user-store';
import UserNewspaperService from '@/services/user-newspaper-service';
import { ErrorCode } from '@/enums/error-code';

onMounted(() => {
  asyncGetAllNewspaper();
});

const isModal = ref(false);
const newsTitle = ref();
const newsMessage = ref();
const newsDate = ref();
const newsList = ref<Newspaper[]>([]);
const userStore = useUserStore();
const isLoading = ref(false);

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
    showError(ErrorCode.getAllNewspaper, e);
  }
}

function getLikes(allUserNewspapers: UserNewspaper[]): number {
  const count = allUserNewspapers.filter((userNewspaper) => userNewspaper.like).length;
  return count;
}

function getDislikes(allUserNewspapers: UserNewspaper[]): number {
  const count = allUserNewspapers.filter((userNewspaper) => !userNewspaper.like).length;
  return count;
}

function hasUserLiked(allUserNewspapers: UserNewspaper[]): boolean {
  return allUserNewspapers.some(
    (userNewspaper) => userNewspaper.userId === userStore.userId && userNewspaper.like
  );
}

function hasUserDisliked(allUserNewspapers: UserNewspaper[]): boolean {
  return allUserNewspapers.some(
    (userNewspaper) => userNewspaper.userId === userStore.userId && !userNewspaper.like
  );
}

function getUserNewspaper(
  allUserNewspapers: UserNewspaper[],
  newspaperId: number
): UserNewspaper | undefined {
  return allUserNewspapers.find(
    (userNewspaper) =>
      userNewspaper.newspaperId === newspaperId && userNewspaper.userId === userStore.userId
  );
}

async function handleCreateUserNewspaper(
  create: CreateUserNewspaper,
  allUserNewspapers: UserNewspaper[]
): Promise<void> {
  if (create.like) {
    await asyncHandleUserLiked(create, allUserNewspapers);
    return;
  }
  await asyncHandleUserDisliked(create, allUserNewspapers);
}

async function asyncHandleUserLiked(
  create: CreateUserNewspaper,
  allUserNewspapers: UserNewspaper[]
): Promise<void> {
  if (hasUserLiked(allUserNewspapers)) {
    await asyncDeleteUserNewspaper(create, allUserNewspapers);
    return;
  }
  await asyncCreateUserNewspaper(create);
}

async function asyncHandleUserDisliked(
  create: CreateUserNewspaper,
  allUserNewspapers: UserNewspaper[]
): Promise<void> {
  if (hasUserDisliked(allUserNewspapers)) {
    await asyncDeleteUserNewspaper(create, allUserNewspapers);
    return;
  }
  await asyncCreateUserNewspaper(create);
}

async function asyncDeleteUserNewspaper(
  create: CreateUserNewspaper,
  allUserNewspapers: UserNewspaper[]
): Promise<void> {
  const userNewspaper = getUserNewspaper(allUserNewspapers, create.newspaperId);
  if (userNewspaper) {
    isLoading.value = true;
    try {
      await UserNewspaperService.exclude(userNewspaper.id);
      await asyncGetAllNewspaper();
    } catch (e) {
      showError(ErrorCode.excludeUserNewspaper, e);
    } finally {
      isLoading.value = false;
    }
  }
}

async function asyncCreateUserNewspaper(create: CreateUserNewspaper): Promise<void> {
  isLoading.value = true;
  try {
    await UserNewspaperService.create(create);
    await asyncGetAllNewspaper();
  } catch (e) {
    showError(ErrorCode.createUserNewspaper, e);
  } finally {
    isLoading.value = false;
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
                <div
                  class="has-text-weight-bold"
                  :class="[
                    { green: hasUserLiked(news.usersNewspaper) },
                    { 'is-not-clickable': isLoading, 'is-clickable': !isLoading }
                  ]"
                  @click="
                    handleCreateUserNewspaper(
                      { like: true, newspaperId: news.id },
                      news.usersNewspaper
                    )
                  "
                >
                  <font-awesome-icon :icon="['fas', 'thumbs-up']" />
                  {{ formatCompactNumber(getLikes(news.usersNewspaper)) }}
                </div>
                <div
                  class="ml-2 has-text-weight-bold"
                  :class="[
                    { green: hasUserDisliked(news.usersNewspaper) },
                    { 'is-not-clickable': isLoading, 'is-clickable': !isLoading }
                  ]"
                  @click="
                    handleCreateUserNewspaper(
                      { like: false, newspaperId: news.id },
                      news.usersNewspaper
                    )
                  "
                >
                  <font-awesome-icon :icon="['fas', 'thumbs-down']" />
                  {{ formatCompactNumber(getDislikes(news.usersNewspaper)) }}
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
