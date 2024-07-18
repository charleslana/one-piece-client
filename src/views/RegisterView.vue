<script setup lang="ts">
import TitleComponent from '@/components/TitleComponent.vue';
import PageTemplate from '@/templates/PageTemplate.vue';
import { ref } from 'vue';
import AlertComponent from '@/components/AlertComponent.vue';
import { isValidEmail } from '@/utils/utils';

const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const messages = ref<string[]>([]);
const isAlert = ref(false);
const isSuccess = ref(false);
const isLoading = ref(false);

function register(): void {
  clearMessages();
  validate();
  if (messages.value.length !== 0) {
    showAlert();
    return;
  }
  isLoading.value = true;
  setTimeout(() => {
    isSuccess.value = true;
    isLoading.value = false;
  }, 1000);
}

function clearMessages(): void {
  messages.value.length = 0;
}

function addMessage(message: string): void {
  messages.value.push(message);
}

function showAlert(): void {
  isAlert.value = true;
}

function validate(): void {
  if (!email.value || !password.value || !confirmPassword.value) {
    addMessage('Preencha os campos.');
  }
  if (!isValidEmail(email.value)) {
    addMessage('E-mail inválido.');
  }
  if (password.value.length < 6) {
    addMessage('A senha deve conter no mínimo 6 caracteres.');
  }
  if (password.value !== confirmPassword.value) {
    addMessage('As senhas não estão iguais.');
  }
}
</script>

<template>
  <PageTemplate type="off">
    <template #wrapper-container>
      <TitleComponent title="Cadastre-se!" />
      <p class="is-size-4" v-if="isSuccess">
        Parabéns, Sua conta foi criada com sucesso! Boa sorte na sua aventura.
      </p>
      <section v-else>
        <p>Crie sua conta para enfrentar os desafios que o aguardam neste jogo!</p>
        <form @submit.prevent="register">
          <div class="columns">
            <div class="column is-6">
              <div class="field">
                <label class="label">E-mail:</label>
                <div class="control">
                  <input
                    class="input is-shadowless is-borderless"
                    type="email"
                    placeholder="Email..."
                    minlength="5"
                    maxlength="50"
                    required
                    v-model.trim="email"
                  />
                </div>
              </div>
            </div>
            <div class="column is-6 is-hidden-mobile"></div>
          </div>
          <div class="columns">
            <div class="column is-6">
              <div class="field">
                <label class="label">Senha:</label>
                <div class="control">
                  <input
                    class="input is-shadowless is-borderless"
                    type="password"
                    placeholder="Senha..."
                    minlength="1"
                    maxlength="100"
                    required
                    v-model.trim="password"
                  />
                </div>
              </div>
            </div>
            <div class="column is-6">
              <div class="field">
                <label class="label">Confirmar senha:</label>
                <div class="control">
                  <input
                    class="input is-shadowless is-borderless"
                    type="password"
                    placeholder="Repetir senha..."
                    minlength="1"
                    maxlength="100"
                    required
                    v-model.trim="confirmPassword"
                  />
                </div>
              </div>
            </div>
          </div>
          <p>
            OPLife é um jogo totalmente criado de fã para fã, visando a divulgação do anime One
            Piece e suas franquias. Todos os direitos do anime estão reservados ao criador Eiichiro
            Oda, e à TOEI e Bandai Namco, incluindo os nomes e imagens aqui utilizados.
          </p>
          <p class="mt-2">
            Nenhum membro da nossa equipe de administração possui acesso às senhas dos usuários e
            nunca irão pedir seus dados de acesso.
          </p>
          <p class="mt-2">TERMOS DE USO:</p>
          <ol class="p-4">
            <li>Fica proibido qualquer tipo de propaganda de ANIMES ou outros JOGOS.</li>
            <li>
              Fica proibido a venda ou troca de contas, tendo como punição o banimento permanente da
              conta.
            </li>
            <li>
              Fica proibido qualquer jogador se passar por um membro da administração do jogo, tendo
              como punição o banimento permanente da conta.
            </li>
            <li>
              Fica proibido utilizar nomes de usuário ilegais, ofensivos ou que contenham frases de
              insulto ou racismo de qualquer espécie, tendo como punição o banimento da conta.
            </li>
            <li>
              Máximo de 2 contas por usuário, o uso de mais contas tem o risco de banimento de todas
              as contas.
            </li>
            <li>
              Fica proibido qualquer jogador de se aproveitar de falhas do sistema e bugs,ao
              descobrir ou suspeitar de alguma irregularidade informar a administração, tendo como
              punição o banimento da conta caso for detectado o uso de tais falhas.
            </li>
            <li>
              Todo usuario que compartilha sua conta com outro usuário e for "roubado" a equipe não
              se responsabiliza em devolver items ou pertences do jogo que foram roubados.
            </li>
          </ol>
          <div class="field">
            <div class="control">
              <label class="checkbox">
                <input type="checkbox" class="mr-2" required />
                <strong class="black">Li e concordo com os Termos de uso.</strong>
              </label>
            </div>
          </div>
          <div class="field is-grouped">
            <div class="control">
              <button
                class="button btn btn-warning"
                :class="{ 'is-loading': isLoading }"
                :disabled="isLoading"
              >
                Cadastrar
              </button>
            </div>
          </div>
        </form>
      </section>
    </template>
  </PageTemplate>
  <AlertComponent :messages="messages" v-if="isAlert" @close="isAlert = false" />
</template>

<style scoped></style>
