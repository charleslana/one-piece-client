<script setup lang="ts">
import BoxComponent from '@/components/BoxComponent.vue';
import TitleComponent from '@/components/TitleComponent.vue';
import router from '@/router';
import PageTemplate from '@/templates/PageTemplate.vue';
import { ref } from 'vue';

const email = ref('');
const password = ref('');
const error = ref('');
const isLoading = ref(false);

function login(): void {
  error.value = '';
  if (!email.value || !password.value) {
    error.value = 'Preencha o campo.';
    return;
  }
  isLoading.value = true;
  setTimeout(() => {
    const e = false;
    if (e) {
      error.value = 'E-mail ou senha inválida.';
      isLoading.value = false;
      return;
    }
    router.push('/create-character');
  }, 1000);
}
</script>

<template>
  <PageTemplate type="off">
    <template #wrapper-container>
      <TitleComponent title="Bem vindo!" />
      <div class="columns">
        <div class="column is-4">
          <figure class="image is-16by9">
            <img src="../assets/images/login/luffy.jpg" alt="Luffy image" class="is-rounded" />
          </figure>
          <BoxComponent message="Eu vou ser o Rei dos Piratas!" :is-center="true" />
        </div>
        <div class="column is-4">
          <form @submit.prevent="login">
            <div class="field">
              <label class="label">E-mail</label>
              <div class="control">
                <input
                  :class="['input is-shadowless is-borderless', { 'is-danger': error }]"
                  type="email"
                  placeholder=""
                  minlength="5"
                  maxlength="50"
                  required
                  v-model.trim="email"
                />
              </div>
              <p class="help is-danger" v-if="error">{{ error }}</p>
            </div>
            <div class="field">
              <label class="label">Senha</label>
              <div class="control">
                <input
                  :class="['input is-shadowless is-borderless', { 'is-danger': error }]"
                  type="password"
                  placeholder=""
                  minlength="1"
                  maxlength="100"
                  required
                  v-model.trim="password"
                />
              </div>
              <p class="help is-danger" v-if="error">{{ error }}</p>
            </div>
            <div class="field is-grouped">
              <div class="control">
                <button
                  class="button btn btn-warning"
                  :class="{ 'is-loading': isLoading }"
                  :disabled="isLoading"
                >
                  Entrar
                </button>
              </div>
            </div>
          </form>
          <RouterLink to="/recovery-password" class="link">
            <font-awesome-icon :icon="['fas', 'key']" class="mr-1 mt-5" />Esqueceu a senha?
          </RouterLink>
        </div>
        <div class="column is-4"></div>
      </div>
    </template>
  </PageTemplate>
</template>

<style scoped></style>
