<script setup lang="ts">
import TitleComponent from '@/components/TitleComponent.vue';
import { Breed } from '@/enums/breed';
import { Classe } from '@/enums/classe';
import { Faction } from '@/enums/faction';
import { Sea } from '@/enums/sea';
import PageTemplate from '@/templates/PageTemplate.vue';
import { getAvatar, getAvatarMini } from '@/utils/avatar-utils';
import { isValidName, logout } from '@/utils/utils';
import { ref } from 'vue';

const name = ref('');
const faction = ref<Faction>(Faction.Pirate);
const sea = ref<Sea>(Sea.NorthBlue);
const breed = ref<Breed>(Breed.Human);
const classe = ref<Classe>(Classe.Swordsman);
const avatarId = ref<number>();
const avatars = ref<number[]>([1, 2, 3, 4, 5]);
const error = ref('');
const isLoading = ref(false);
const isSuccess = ref(false);
const type = ref<'none' | 'on' | 'off'>('none');

function createCharacter(): void {
  error.value = '';
  if (!name.value || !isValidName(name.value)) {
    error.value = 'Nome de personagem inválido';
    return;
  }
  if (name.value.length < 3 || name.value.length > 20) {
    error.value = 'O nome deve conter no mínimo 3 caracteres e no máximo 20 caracteres.';
    return;
  }
  isLoading.value = true;
  setTimeout(() => {
    const e = false;
    if (e) {
      error.value = 'Nome do personagem já existe.';
      isLoading.value = false;
      return;
    }
    isSuccess.value = true;
    type.value = 'on';
  }, 1000);
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
                    <select v-model="classe" class="is-shadowless is-borderless">
                      <option :value="Classe.Swordsman">Espadachim</option>
                      <option :value="Classe.Shooter">Atirador</option>
                      <option :value="Classe.Fighter">Lutador</option>
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
                      :src="getAvatarMini(avatar)"
                      class="image-size"
                      alt="Avatar icon"
                      :class="{ 'avatar-selected': avatarId === avatar }"
                      @click="avatarId = avatar"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="column is-6">
              <img
                :src="getAvatar(avatarId)"
                alt="Avatar image"
                class="avatar-selected-image"
                v-if="avatarId"
              />
            </div>
          </div>
          <div class="field is-grouped">
            <div class="control">
              <button
                type="submit"
                class="button btn btn-warning"
                :class="{ 'is-loading': isLoading }"
                :disabled="isLoading || !avatarId"
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
        <TitleComponent :title="`${name} (${faction})`" />
        <p>
          Você é um {{ breed }} que desde pequeno quer se tornar o rei dos piratas. Com o passar dos
          anos se destacou entre as pessoas comuns e começou a perceber que era diferente,
          reconhecendo que possuía uma força interna elevada. Após pesquisar muito descobriu que
          essa força se chama 'Haki', e está presente em todos seres vivos, e com treinamento pode
          aprender a usar esse haki para várias funções. Com isso em mente você parte em uma jornada
          pelo mundo, para evoluir seu poder e conhecimentos.
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
