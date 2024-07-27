<script setup lang="ts">
import CardComponent from '@/components/CardComponent.vue';
import NewsComponent from '@/components/NewsComponent.vue';
import TitleComponent from '@/components/TitleComponent.vue';
import type { User } from '@/interfaces/user';
import UserService from '@/services/user-service';
import PageTemplate from '@/templates/PageTemplate.vue';
import { getAvatar, getAvatarMini } from '@/utils/avatar-utils';
import { getBreed, getCharacterClass, getFaction, getSea } from '@/utils/user-character-utils';
import { formatNumber } from '@/utils/utils';
import { onMounted, ref } from 'vue';

interface StatusItem {
  name: string;
  icon: [string, string];
  value: string | number;
}

onMounted(async () => {
  await asyncGetMe();
  await asyncGetTopByFaction();
});

const statusList = ref<StatusItem[]>([
  { name: 'Raça', icon: ['fas', 'user'], value: 'Humano' },
  { name: 'Facção', icon: ['fas', 'sitemap'], value: 'Pirata' },
  { name: 'Classe', icon: ['fas', 'user-tie'], value: 'Espadachim' },
  { name: 'Mar', icon: ['fas', 'water'], value: 'North Blue' },
  { name: 'Poder de Luta (PL)', icon: ['fas', 'universal-access'], value: formatNumber(130500) },
  { name: 'Força', icon: ['fas', 'hand-fist'], value: 25 },
  { name: 'Defesa', icon: ['fas', 'shield'], value: 25 },
  { name: 'Agilidade', icon: ['fas', 'person-running'], value: 25 },
  { name: 'Vitalidade', icon: ['fas', 'heart'], value: 25 },
  { name: 'Energia', icon: ['fas', 'bolt'], value: 25 },
  { name: 'Stamina', icon: ['fas', 'battery-full'], value: '100%' }
]);

const topGeneral = [
  { name: 'Nome', avatar: '1', battlePower: 8845215, guildTag: 'TAG' },
  { name: 'Nome2', avatar: '2', battlePower: 8845215, guildTag: '' }
];

const user = ref<User>();
const pirateUsers = ref<User[]>([]);
const marineUsers = ref<User[]>([]);
const revolutionaryUsers = ref<User[]>([]);

async function asyncGetMe(): Promise<void> {
  try {
    const response = await UserService.getMe();
    user.value = response;
    updateStatusList();
  } catch (e) {
    // console.log(e);
  }
}

function updateStatusList() {
  if (user.value) {
    statusList.value = [
      { name: 'Raça', icon: ['fas', 'user'], value: getBreed(user.value.breed) },
      { name: 'Facção', icon: ['fas', 'sitemap'], value: getFaction(user.value.faction) },
      {
        name: 'Classe',
        icon: ['fas', 'user-tie'],
        value: getCharacterClass(user.value.characterClass)
      },
      { name: 'Mar', icon: ['fas', 'water'], value: getSea(user.value.sea) },
      {
        name: 'Poder de Luta (PL)',
        icon: ['fas', 'universal-access'],
        value: formatNumber(user.value.battlePower)
      },
      { name: 'Força', icon: ['fas', 'hand-fist'], value: user.value.attribute.strength },
      { name: 'Defesa', icon: ['fas', 'shield'], value: user.value.attribute.defense },
      { name: 'Agilidade', icon: ['fas', 'person-running'], value: user.value.attribute.agility },
      { name: 'Vitalidade', icon: ['fas', 'heart'], value: user.value.attribute.vitality },
      { name: 'Energia', icon: ['fas', 'bolt'], value: user.value.attribute.energy },
      { name: 'Stamina', icon: ['fas', 'battery-full'], value: `${user.value.stamina}%` }
    ];
  }
}

async function asyncGetTopByFaction(): Promise<void> {
  try {
    const response = await UserService.getTopByFaction();
    pirateUsers.value = response.pirate;
    marineUsers.value = response.marine;
    revolutionaryUsers.value = response.revolutionary;
  } catch (e) {
    // console.log(e);
  }
}
</script>

<template>
  <PageTemplate type="on" bg="02">
    <template #wrapper-container v-if="user && user.name">
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
          <CardComponent :title="user.name">
            <template #content>
              <img :src="getAvatar(user.avatar)" alt="Avatar icon" />
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
        <div class="column is-4">
          <NewsComponent />
        </div>
      </div>
      <div class="columns">
        <div class="column is-4">
          <CardComponent
            title="Top 10 Piratas"
            tooltip="Jogadores da facção Pirata. Todo dia 1 de cada mês o TOP desse rank vai ganhar 4 Gold."
            footer-name="Ver Ranking"
            footer-link="/ranking"
          >
            <template #content>
              <div class="table-container">
                <table class="table mx-auto is-striped is-fullwidth is-hoverable">
                  <tbody>
                    <tr class="has-text-centered" v-for="(top, index) in pirateUsers" :key="index">
                      <td class="middle">{{ index + 1 }}</td>
                      <td class="middle">
                        <figure class="image is-48x48">
                          <img
                            :src="getAvatarMini(top.avatar)"
                            alt="Avatar image"
                            class="is-rounded"
                          />
                        </figure>
                      </td>
                      <td class="middle">
                        {{ top.guildTag ? `[${top.guildTag}]` : '' }} {{ top.name }}
                      </td>
                      <td class="middle">PL: {{ formatNumber(top.battlePower) }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </template>
          </CardComponent>
        </div>
        <div class="column is-4">
          <CardComponent
            title="Top 10 Marinheiros"
            tooltip="Jogadores da facção Marinha. Todo dia 1 de cada mês o TOP desse rank vai ganhar 4 Gold."
            footer-name="Ver Ranking"
            footer-link="/ranking"
          >
            <template #content>
              <div class="table-container">
                <table class="table mx-auto is-striped is-fullwidth is-hoverable">
                  <tbody>
                    <tr class="has-text-centered" v-for="(top, index) in marineUsers" :key="index">
                      <td class="middle">{{ index + 1 }}</td>
                      <td class="middle">
                        <figure class="image is-48x48">
                          <img
                            :src="getAvatarMini(top.avatar)"
                            alt="Avatar image"
                            class="is-rounded"
                          />
                        </figure>
                      </td>
                      <td class="middle">
                        {{ top.guildTag ? `[${top.guildTag}]` : '' }} {{ top.name }}
                      </td>
                      <td class="middle">PL: {{ formatNumber(top.battlePower) }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </template>
          </CardComponent>
        </div>
        <div class="column is-4">
          <CardComponent
            title="Top 10 Revolucionários"
            tooltip="Jogadores da facção Revolucionário. Todo dia 1 de cada mês o TOP desse rank vai ganhar 4 Gold."
            footer-name="Ver Ranking"
            footer-link="/ranking"
          >
            <template #content>
              <div class="table-container">
                <table class="table mx-auto is-striped is-fullwidth is-hoverable">
                  <tbody>
                    <tr
                      class="has-text-centered"
                      v-for="(top, index) in revolutionaryUsers"
                      :key="index"
                    >
                      <td class="middle">{{ index + 1 }}</td>
                      <td class="middle">
                        <figure class="image is-48x48">
                          <img
                            :src="getAvatarMini(top.avatar)"
                            alt="Avatar image"
                            class="is-rounded"
                          />
                        </figure>
                      </td>
                      <td class="middle">
                        {{ top.guildTag ? `[${top.guildTag}]` : '' }} {{ top.name }}
                      </td>
                      <td class="middle">PL: {{ formatNumber(top.battlePower) }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </template>
          </CardComponent>
        </div>
      </div>
      <div class="columns">
        <div class="column is-4">
          <CardComponent title="O vitorioso">
            <template #content>
              <div class="table-container">
                <table class="table mx-auto is-striped is-fullwidth is-hoverable">
                  <tbody>
                    <tr class="has-text-centered">
                      <td class="middle">
                        <figure class="image is-48x48">
                          <img :src="getAvatarMini('1')" alt="Avatar image" class="is-rounded" />
                        </figure>
                      </td>
                      <td class="middle">[TAG] Nome</td>
                      <td class="middle">Vitórias Seguidas: 394</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </template>
          </CardComponent>
          <CardComponent title="Os 3 mais ricos">
            <template #content>
              <div class="table-container">
                <table class="table mx-auto is-striped is-fullwidth is-hoverable">
                  <tbody>
                    <tr class="has-text-centered" v-for="(top, index) in topGeneral" :key="index">
                      <td class="middle">{{ index + 1 }}</td>
                      <td class="middle">
                        <figure class="image is-48x48">
                          <img
                            :src="getAvatarMini(top.avatar)"
                            alt="Avatar image"
                            class="is-rounded"
                          />
                        </figure>
                      </td>
                      <td class="middle">
                        {{ top.guildTag ? `[${top.guildTag}]` : '' }} {{ top.name }}
                      </td>
                      <td class="middle">Berries: {{ formatNumber(top.battlePower) }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </template>
          </CardComponent>
        </div>
      </div>
    </template>
  </PageTemplate>
</template>

<style scoped></style>
