<script setup lang="ts">
import AlertComponent from '@/components/AlertComponent.vue';
import ModalComponent from '@/components/ModalComponent.vue';
import NotificationComponent from '@/components/NotificationComponent.vue';
import PageTemplate from '@/templates/PageTemplate.vue';
import { formatFullDate } from '@/utils/utils';
import { ref } from 'vue';

interface Message {
  id: number;
  toName: string;
  subject: string;
  description: string;
  date: string;
  read: boolean;
}

const isInbox = ref(true);
const messages = ref<Message[]>([
  {
    id: 1,
    toName: 'Nome',
    subject: 'Assunto da mensagem nao detalhada.',
    description: 'Descrição da mensagem bem detalha com vários textos.',
    date: '2024-07-20 15:30:01',
    read: false
  },
  {
    id: 2,
    toName: 'Nome',
    subject: 'Assunto da mensagem nao detalhada 2.',
    description: 'Descrição da mensagem bem detalha com vários textos 2.',
    date: '2024-07-20 15:30:02',
    read: true
  }
]);
const name = ref('');
const subject = ref('');
const description = ref('');
const error = ref('');
const isLoading = ref(false);
const updateMessage = ref('Atualizar');
const isAlert = ref(false);
const alertMessage = ref('');
const isModal = ref(false);
const toName = ref('');
const toSubject = ref('');
const toDate = ref('');
const toMessage = ref('');

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

function readAllMessage(): void {
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
  }, 1000);
}

function deleteAllMessage(): void {
  const isConfirm = confirm(
    'Você tem certeza que deseja excluir todas mensagens?\nO processo é irreversível!'
  );
  if (isConfirm) {
    isLoading.value = true;
    setTimeout(() => {
      isLoading.value = false;
    }, 1000);
  }
}

function deleteMessage(id: number): void {
  const isConfirm = confirm(
    `Você tem certeza que deseja excluir a mensagem ${id}\nO processo é irreversível!`
  );
  if (isConfirm) {
    isLoading.value = true;
    setTimeout(() => {
      isLoading.value = false;
    }, 1000);
  }
}

function showMessage(message: Message): void {
  toName.value = message.toName;
  toSubject.value = message.subject;
  toDate.value = message.date;
  toMessage.value = message.description;
  isModal.value = true;
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
        <section v-else>
          <div class="level">
            <div class="level-left"></div>
            <div class="level-right">
              <div class="buttons">
                <button
                  class="button btn btn-warning"
                  :disabled="isLoading"
                  :class="{ 'is-loading': isLoading }"
                  @click="readAllMessage"
                >
                  Ler todos
                </button>
                <button
                  class="button btn btn-warning"
                  :disabled="isLoading"
                  :class="{ 'is-loading': isLoading }"
                  @click="deleteAllMessage"
                >
                  Excluir tudo
                </button>
              </div>
            </div>
          </div>
          <div class="table-container">
            <table class="table mx-auto is-striped is-fullwidth is-hoverable">
              <thead>
                <tr class="has-text-centered">
                  <th>De</th>
                  <th>Assunto</th>
                  <th>Data</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tfoot>
                <tr class="has-text-centered">
                  <th>De</th>
                  <th>Assunto</th>
                  <th>Data</th>
                  <th>Ações</th>
                </tr>
              </tfoot>
              <tbody>
                <tr
                  :class="{ 'has-text-weight-bold': !message.read }"
                  v-for="(message, index) in messages"
                  :key="index"
                >
                  <td>{{ message.toName }}</td>
                  <td>{{ message.subject }}</td>
                  <td>{{ formatFullDate(new Date(message.date)) }}</td>
                  <td>
                    <div class="buttons">
                      <button
                        class="button btn btn-warning"
                        :disabled="isLoading"
                        :class="{ 'is-loading': isLoading }"
                        @click="showMessage(message)"
                      >
                        Ler
                      </button>
                      <button
                        class="button btn btn-warning"
                        :disabled="isLoading"
                        :class="{ 'is-loading': isLoading }"
                        @click="deleteMessage(message.id)"
                      >
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>Legenda: Negrito (Não Lidas).</p>
        </section>
      </div>
      <div class="box" v-else>
        <form @submit.prevent="sendMessage">
          <div class="field">
            <label class="label">Para:</label>
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
            <label class="label">Assunto:</label>
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
            <label class="label">Mensagem:</label>
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
  <ModalComponent v-if="isModal" @close="isModal = false">
    <template #content>
      <div class="theme-light">
        <div class="field">
          <label class="label">De:</label>
          <div class="control">
            <input
              class="input is-shadowless is-borderless"
              type="text"
              disabled
              v-model.trim="toName"
            />
          </div>
          <p class="help is-danger" v-if="error">{{ error }}</p>
        </div>
        <div class="field">
          <label class="label">Assunto:</label>
          <div class="control">
            <input
              class="input is-shadowless is-borderless"
              type="text"
              disabled
              v-model.trim="toSubject"
            />
          </div>
        </div>
        <div class="field">
          <label class="label">Data:</label>
          <div class="control">
            <input
              class="input is-shadowless is-borderless"
              type="text"
              disabled
              v-model.trim="toDate"
            />
          </div>
        </div>
        <div class="field">
          <label class="label">Mensagem</label>
          <div class="control">
            <textarea class="textarea" placeholder="" disabled v-model.trim="toMessage"></textarea>
          </div>
        </div>
      </div>
    </template>
  </ModalComponent>
</template>

<style scoped></style>
