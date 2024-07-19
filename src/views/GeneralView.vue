<script setup lang="ts">
import CardComponent from '@/components/CardComponent.vue';
import TitleComponent from '@/components/TitleComponent.vue';
import PageTemplate from '@/templates/PageTemplate.vue';
import { getAvatar } from '@/utils/avatar-utils';

const statusList = [
  { name: 'Raça', icon: ['fas', 'user'], value: 'Humano' },
  { name: 'Facção', icon: ['fas', 'sitemap'], value: 'Pirata' },
  { name: 'Classe', icon: ['fas', 'user-tie'], value: 'Espadachim' },
  { name: 'Mar', icon: ['fas', 'water'], value: 'North Blue' },
  { name: 'Power de Luta (PL)', icon: ['fas', 'universal-access'], value: '130' },
  { name: 'Força', icon: ['fas', 'hand-fist'], value: '25' },
  { name: 'Defesa', icon: ['fas', 'shield'], value: '25' },
  { name: 'Agilidade', icon: ['fas', 'person-running'], value: '25' },
  { name: 'Vitalidade', icon: ['fas', 'heart'], value: '25' },
  { name: 'Energia', icon: ['fas', 'bolt'], value: '25' },
  { name: 'Stamina', icon: ['fas', 'battery-full'], value: '100%' }
];
</script>

<template>
  <PageTemplate type="on" bg="02">
    <template #wrapper-container>
      <div class="level">
        <div class="level-left">
          <TitleComponent title="Bem vindo!" />
        </div>
        <div class="level-right">
          <a href="https://discord.com" target="_blank" class="button btn btn-warning"
            >Discord Oficial</a
          >
        </div>
      </div>
      <div class="columns">
        <div class="column is-4">
          <CardComponent title="Nome">
            <template #content>
              <img :src="getAvatar(1)" alt="Avatar icon" />
            </template>
          </CardComponent>
        </div>
        <div class="column is-4">
          <CardComponent title="Dados" footer-name="Ver status" footer-link="/status">
            <template #content>
              <div v-for="(item, index) in statusList" :key="index" class="list-group-item">
                <div><font-awesome-icon :icon="item.icon" class="mr-2 blue" />{{ item.name }}</div>
                <div>
                  <span class="tag is-medium is-link">{{ item.value }}</span>
                </div>
              </div>
            </template>
          </CardComponent>
        </div>
        <div class="column is-4"></div>
      </div>
    </template>
  </PageTemplate>
</template>

<style scoped>
.list-group-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 10px 15px;
  margin-bottom: -1px;
}

.list-group-item:first-child {
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

.list-group-item:last-child {
  margin-bottom: 0;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
}

.is-link {
  background-color: #337ab7;
}
</style>
