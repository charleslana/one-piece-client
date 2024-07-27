<script setup lang="ts">
import TitleComponent from '@/components/TitleComponent.vue';
import { Breed } from '@/enums/breed';
import { CharacterClass } from '@/enums/character-class';
import { Faction } from '@/enums/faction';
import { Sea } from '@/enums/sea';
import type { Avatar } from '@/interfaces/avatar';
import router from '@/router';
import AvatarService from '@/services/avatar-service';
import UserService from '@/services/user-service';
import PageTemplate from '@/templates/PageTemplate.vue';
import { getAvatar, getAvatarMini } from '@/utils/avatar-utils';
import { isCharacterCompleted, saveCharacterCompleted } from '@/utils/local-storage-utils';
import { getBreed, getFaction } from '@/utils/user-character-utils';
import { getError, isValidName } from '@/utils/utils';
import { onMounted, ref } from 'vue';

const name = ref('');
const faction = ref<Faction>(Faction.Pirate);
const sea = ref<Sea>(Sea.NorthBlue);
const breed = ref<Breed>(Breed.Human);
const characterClass = ref<CharacterClass>(CharacterClass.Swordsman);
const selectedAvatar = ref<Avatar>({ id: 0, image: '0', selected: false });
const avatars = ref<Avatar[]>([]);
const error = ref('');
const isLoading = ref(false);
const isSuccess = ref(false);
const type = ref<'none' | 'on' | 'off'>('none');

onMounted(async () => {
  await checkCharacterCompleted();
});

async function createCharacter(): Promise<void> {
  error.value = '';
  if (!name.value || !isValidName(name.value)) {
    error.value = 'Nome de personagem inválido';
    return;
  }
  if (name.value.length < 3 || name.value.length > 20) {
    error.value = 'O nome deve conter no mínimo 3 caracteres e no máximo 20 caracteres.';
    return;
  }
  await asyncCreateCharacter();
}

function logout(): void {
  router.push('/logout');
}

async function asyncCreateCharacter(): Promise<void> {
  isLoading.value = true;
  try {
    await UserService.updateUser({
      name: name.value,
      faction: faction.value,
      sea: sea.value,
      breed: breed.value,
      characterClass: characterClass.value,
      avatarId: selectedAvatar.value.id
    });
    isSuccess.value = true;
    type.value = 'on';
    saveCharacterCompleted();
  } catch (e) {
    error.value = getError(e);
  } finally {
    isLoading.value = false;
  }
}

async function asyncGetAvatars(): Promise<void> {
  isLoading.value = true;
  try {
    const response = await AvatarService.getAll();
    avatars.value = response;
  } catch (e) {
    error.value = getError(e);
  } finally {
    isLoading.value = false;
  }
}

async function checkCharacterCompleted(): Promise<void> {
  if (isCharacterCompleted()) {
    router.push('/general');
    return;
  }
  await asyncGetAvatars();
}
</script>

<template>
  <PageTemplate :type="type">
    <template #wrapper-container>
      <section v-if="!isSuccess">
        <TitleComponent title="Crie seu personagem" />
        <form @submit.prevent="createCharacter">
          <div class="columns">
            <div class="column is-6">
              <div class="field">
                <label class="label">Nome do seu personagem</label>
                <div class="control">
                  <input
                    :class="['input is-shadowless is-borderless', { 'is-danger': error }]"
                    type="text"
                    placeholder=""
                    minlength="3"
                    maxlength="20"
                    required
                    v-model.trim="name"
                  />
                </div>
                <p class="help is-danger" v-if="error">{{ error }}</p>
              </div>
            </div>
            <div class="column is-6">
              <div class="field">
                <label class="label">Escolha uma facção</label>
                <div class="control">
                  <div class="select is-fullwidth">
                    <select v-model="faction" class="is-shadowless is-borderless">
                      <option :value="Faction.Pirate">Pirata</option>
                      <option :value="Faction.Marine">Marinha</option>
                      <option :value="Faction.Revolutionary">Revolucionário</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="columns">
            <div class="column is-4">
              <div class="field">
                <label class="label">Escolha um mar</label>
                <div class="control">
                  <div class="select is-fullwidth">
                    <select v-model="sea" class="is-shadowless is-borderless">
                      <option :value="Sea.NorthBlue">North Blue</option>
                      <option :value="Sea.EastBlue">East Blue</option>
                      <option :value="Sea.SouthBlue">South Blue</option>
                      <option :value="Sea.WestBlue">West Blue</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div class="column is-4">
              <div class="field">
                <label class="label">Escolha sua raça</label>
                <div class="control">
                  <div class="select is-fullwidth">
                    <select v-model="breed" class="is-shadowless is-borderless">
                      <option :value="Breed.Human">Humano</option>
                      <option :value="Breed.Dwarf">Anão</option>
                      <option :value="Breed.Giant">Gigante</option>
                      <option :value="Breed.Merman">Tritão</option>
                      <option :value="Breed.Cyborg">Ciborgue</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div class="column is-4">
              <div class="field">
                <label class="label">Escolha sua classe</label>
                <div class="control">
                  <div class="select is-fullwidth">
                    <select v-model="characterClass" class="is-shadowless is-borderless">
                      <option :value="CharacterClass.Swordsman">Espadachim</option>
                      <option :value="CharacterClass.Shooter">Atirador</option>
                      <option :value="CharacterClass.Fighter">Lutador</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="columns">
            <div class="column is-6">
              <div class="field">
                <label class="label">Escolha um avatar</label>
                <small>Você poderá obter novos avatares futuramente</small>
                <div class="columns is-multiline is-mobile is-gapless mt-5">
                  <div
                    class="column is-1 is-flex is-align-items-center is-justify-content-center is-51"
                    v-for="(avatar, index) in avatars"
                    :key="index"
                  >
                    <img
                      :src="getAvatarMini(avatar.image)"
                      class="image-size"
                      alt="Avatar icon"
                      :class="{ 'avatar-selected': selectedAvatar.id === avatar.id }"
                      @click="selectedAvatar = avatar"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="column is-6">
              <img
                :src="getAvatar(selectedAvatar.image)"
                alt="Avatar image"
                class="avatar-selected-image"
                v-if="selectedAvatar.id"
              />
            </div>
          </div>
          <div class="field is-grouped">
            <div class="control">
              <button
                type="submit"
                class="button btn btn-warning"
                :class="{ 'is-loading': isLoading }"
                :disabled="isLoading || !selectedAvatar.id"
              >
                Confirmar
              </button>
            </div>
            <div class="control">
              <button
                type="button"
                class="button btn btn-warning"
                :class="{ 'is-loading': isLoading }"
                :disabled="isLoading"
                @click="logout"
              >
                Sair
              </button>
            </div>
          </div>
        </form>
      </section>
      <section v-else>
        <TitleComponent :title="`${name} (${getFaction(faction)})`" />
        <p>
          Você é um {{ getBreed(breed) }} que desde pequeno quer se tornar o mais forte entre todos.
          Com o passar dos anos se destacou entre os aventureiros comuns e começou a perceber que
          era diferente, reconhecendo que possuía uma força interna elevada. Após pesquisar muito
          descobriu que essa força se chama 'Haki', e está presente em todos seres vivos, e com
          treinamento pode aprender a usar esse haki para várias funções. Com isso em mente você
          parte em uma jornada pelo mundo, para evoluir seu poder e conhecimentos.
        </p>
        <p class="font-luck mt-5 is-size-4">Primeiros passos:</p>
        <p>Ler o Tutorial para aprender as funções do jogo.</p>
        <RouterLink to="/tutorial" class="button btn btn-warning">Ler tutorial</RouterLink>
        <p class="mt-5">Ou você pode ir até o navio do Gol D. Roger para começar sua aventura.</p>
        <RouterLink to="/gol-d-roger" class="button btn btn-warning"
          >Vistar Gol D. Roger</RouterLink
        >
      </section>
    </template>
  </PageTemplate>
</template>

<style scoped>
.image-size {
  width: 51px;
  height: 51px;
  border: solid 1px #eea236;
}

.avatar-selected {
  border: 4px solid rgb(135, 0, 0);
}

.avatar-selected-image {
  width: 300px;
  height: 300px;
  object-fit: contain;
}

.is-51 {
  width: 51px !important;
}
</style>
