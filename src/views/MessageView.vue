<script setup lang="ts">
import AlertComponent from '@/components/AlertComponent.vue';
import NotificationComponent from '@/components/NotificationComponent.vue';
import PageTemplate from '@/templates/PageTemplate.vue';
import { ref } from 'vue';

const isInbox = ref(true);
const messages = ref([]);
const name = ref('');
const subject = ref('');
const description = ref('');
const error = ref('');
const isLoading = ref(false);
const updateMessage = ref('Atualizar');
const isAlert = ref(false);
const alertMessage = ref('');

function sendMessage(): void {
  error.value = '';
  if (!name.value || !subject.value || !description.value) {
    error.value = 'Preencha os campos.';
    return;
  }
  isLoading.value = true;
  setTimeout(() => {
    const e = false;
    if (e) {
      error.value = 'Nome de usuário não encontrado.';
      isLoading.value = false;
      return;
    }
    clearSendMessage();
    alertMessage.value = 'Sua mensagem foi enviada com sucesso para o remetente.';
    isAlert.value = true;
    isLoading.value = false;
  }, 1000);
}

function clearSendMessage(): void {
  name.value = '';
  subject.value = '';
  description.value = '';
}

function reloadMessage(): void {
  isLoading.value = true;
  updateMessage.value = 'Atualizando';
  setTimeout(() => {
    updateMessage.value = 'Atualizar';
    isLoading.value = false;
  }, 1000);
}
</script>

<template>
  <PageTemplate type="on" bg="03">
    <template #wrapper-container>
      <div class="buttons">
        <button class="button btn btn-warning" @click="isInbox = true" :disabled="isLoading">
          Mensagens
        </button>
        <button class="button btn btn-warning" @click="isInbox = false" :disabled="isLoading">
          Enviar
        </button>
      </div>
      <div v-if="isInbox">
        <button
          class="button btn btn-warning mb-4"
          :class="{ 'is-loading': isLoading }"
          :disabled="isLoading"
          @click="reloadMessage"
        >
          {{ updateMessage }}
        </button>
        <NotificationComponent message="Sem mensagens." v-if="messages.length === 0" />
      </div>
      <div class="box" v-else>
        <form @submit.prevent="sendMessage">
          <div class="field">
            <label class="label">Para</label>
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
          <div class="field">
            <label class="label">Assunto</label>
            <div class="control">
              <input
                class="input is-shadowless is-borderless"
                type="text"
                placeholder=""
                minlength="1"
                maxlength="100"
                required
                v-model.trim="subject"
              />
            </div>
          </div>
          <div class="field">
            <label class="label">Mensagem</label>
            <div class="control">
              <textarea
                class="textarea"
                placeholder=""
                minlength="1"
                maxlength="100"
                required
                v-model.trim="description"
              ></textarea>
            </div>
          </div>
          <div class="field is-grouped">
            <div class="control">
              <button
                class="button btn btn-warning"
                :class="{ 'is-loading': isLoading }"
                :disabled="isLoading"
              >
                Enviar
              </button>
            </div>
          </div>
        </form>
      </div>
    </template>
  </PageTemplate>
  <AlertComponent :messages="[alertMessage]" v-if="isAlert" @close="isAlert = false" />
</template>

<style scoped></style>
