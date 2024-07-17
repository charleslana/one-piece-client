<script setup lang="ts">
import TitleComponent from '@/components/TitleComponent.vue';
import PageTemplate from '@/templates/PageTemplate.vue';
import { ref } from 'vue';

const email = ref('');
const error = ref('');
const isLoading = ref(false);
const isSuccess = ref(false);

function recoveryPassword(): void {
  error.value = '';
  if (!email.value) {
    error.value = 'Preencha o campo.';
    return;
  }
  isLoading.value = true;
  setTimeout(() => {
    const e = true;
    if (e) {
      error.value = 'E-mail inválido.';
      isLoading.value = false;
      return;
    }
    isSuccess.value = true;
  }, 1000);
}
</script>

<template>
  <PageTemplate type="off">
    <template #wrapper-container>
      <TitleComponent title="Recuperar Senha!" />
      <p class="is-size-4" v-if="isSuccess">Um email foi enviado para o endereço!</p>
      <div class="columns" v-else>
        <div class="column is-6">
          <form @submit.prevent="recoveryPassword">
            <div class="field">
              <label class="label">Informe seu Email</label>
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
            <div class="field is-grouped">
              <div class="control">
                <button
                  class="button btn btn-warning"
                  :class="{ 'is-loading': isLoading }"
                  :disabled="isLoading"
                >
                  Enviar nova senha
                </button>
              </div>
            </div>
          </form>
        </div>
        <div class="column is-6 is-hidden-mobile"></div>
      </div>
    </template>
  </PageTemplate>
</template>

<style scoped></style>
