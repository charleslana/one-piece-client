<script setup lang="ts">
import AlertComponent from '@/components/AlertComponent.vue';
import ModalComponent from '@/components/ModalComponent.vue';
import NotificationComponent from '@/components/NotificationComponent.vue';
import { ErrorCode } from '@/enums/error-code';
import type { User } from '@/interfaces/user';
import type { UserMessage } from '@/interfaces/user-message';
import UserMessageService from '@/services/user-message-service';
import PageTemplate from '@/templates/PageTemplate.vue';
import { formatFullDate, showError } from '@/utils/utils';
import { onMounted, ref } from 'vue';

onMounted(() => {
  asyncGetUserMessages();
});

const isInbox = ref(true);
const messages = ref<UserMessage[]>([]);
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

async function reloadMessage(): Promise<void> {
  updateMessage.value = 'Atualizando';
  await asyncGetUserMessages();
  updateMessage.value = 'Atualizar';
}

async function readAllMessage(): Promise<void> {
  await asyncReadAllMessage();
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

async function showMessage(message: UserMessage): Promise<void> {
  await asyncReadMessage(message.id);
  toName.value = getName(message.sender);
  toSubject.value = message.title;
  toDate.value = formatFullDate(new Date(message.createdAt));
  toMessage.value = message.description;
  isModal.value = true;
}

function getName(user: User | null): string {
  if (user && user.name) {
    return user.name;
  } else {
    return 'Sistema';
  }
}

async function asyncGetUserMessages(): Promise<void> {
  isLoading.value = true;
  try {
    const response = await UserMessageService.getAll();
    messages.value = response;
  } catch (e) {
    showError(ErrorCode.getUserMessages, e);
  } finally {
    isLoading.value = false;
  }
}

async function asyncReadMessage(id: number): Promise<void> {
  isLoading.value = true;
  try {
    await UserMessageService.read(id);
  } catch (e) {
    showError(ErrorCode.readMessage, e);
  } finally {
    await asyncGetUserMessages();
  }
}

async function asyncReadAllMessage(): Promise<void> {
  isLoading.value = true;
  try {
    await UserMessageService.readAll();
  } catch (e) {
    showError(ErrorCode.readAllMessage, e);
  } finally {
    await asyncGetUserMessages();
  }
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
                  :class="{ 'has-text-weight-bold': !message.isRead }"
                  v-for="(message, index) in messages"
                  :key="index"
                >
                  <td>{{ getName(message.sender) }}</td>
                  <td>{{ message.title }}</td>
                  <td>{{ formatFullDate(new Date(message.createdAt)) }}</td>
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
