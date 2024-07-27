<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import MenuComponent from './MenuComponent.vue';
import router from '@/router';
import { isCharacterCompleted } from '@/utils/local-storage-utils';

const props = defineProps<{
  type: 'on' | 'off' | 'none';
}>();

interface Navbar {
  name: string;
  route: string;
}

interface Menu {
  name: string;
  icon: 'menu-main' | 'menu-register' | 'menu-login';
  route: string;
}

const navbarOpen = ref(false);

const menuOff = ref<Menu[]>([
  { name: 'Home', icon: 'menu-main', route: '/' },
  { name: 'Cadastro', icon: 'menu-register', route: '/register' },
  { name: 'Login', icon: 'menu-login', route: '/login' }
]);
const menuOn = ref<Menu[]>([]);
const menuList = ref<Menu[]>([]);
const buttons = ref<Navbar[]>([]);
const buttonOff = ref<Navbar[]>([
  { name: 'Cadastro', route: '/register' },
  { name: 'Login', route: '/login' }
]);
const buttonOn = ref<Navbar[]>([{ name: 'Sair', route: '/logout' }]);

onMounted(() => {
  changeType(props.type);
});

watch(
  () => props.type,
  (newType) => {
    changeType(newType);
  }
);

function toggleNavbar(): void {
  navbarOpen.value = !navbarOpen.value;
}

async function changeType(type: 'on' | 'off' | 'none'): Promise<void> {
  if (type === 'none') {
    return;
  }
  if (type === 'on') {
    buttons.value = buttonOn.value;
    menuList.value = menuOn.value;
    checkCharacterCompleted();
    return;
  }
  buttons.value = buttonOff.value;
  menuList.value = menuOff.value;
}

function checkCharacterCompleted(): void {
  if (!isCharacterCompleted()) {
    router.push({ name: 'create-character', query: { access: 'true' } });
    return;
  }
}
</script>

<template>
  <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <div class="navbar-item">
        <div class="navbar-bg"></div>
        <div class="logo"></div>
      </div>
      <a
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        @click="toggleNavbar"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div :class="{ 'navbar-menu': true, 'is-active': navbarOpen }">
      <div class="navbar-start">
        <MenuComponent :type="props.type" />
      </div>
      <div class="navbar-end is-hidden-mobile">
        <div class="navbar-item">
          <div class="buttons">
            <RouterLink
              :to="button.route"
              class="button is-primary btn btn-warning"
              v-for="(button, index) in buttons"
              :key="index"
              >{{ button.name }}</RouterLink
            >
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  background: url('../assets/images/layout/sea-pattern.png') #1eb5f0;
  background-repeat: repeat;
  background-position: top left;
  background-size: contain;
  height: 80px;
  width: 100%;
}

.navbar .logo {
  background-image: url('../assets/images/layout/logo.png');
  background-repeat: no-repeat;
  background-position: top left;
  background-size: contain;
  top: 0;
  left: 0;
  position: fixed;
  height: 80px;
  width: 100%;
}

@media (max-width: 768px) {
  .navbar .logo,
  .navbar,
  .navbar-bg {
    height: 52px !important;
  }
}

.navbar-bg {
  background-image: url('../assets/images/layout/sea-pattern.png');
  background-repeat: repeat;
  background-position: top left;
  background-size: contain;
  top: 0;
  left: 0;
  position: fixed;
  height: 80px;
  width: 100%;
  filter: brightness(3);
  animation: flash-nav ease-out 7s infinite;
}

.navbar-burger {
  border-color: #f0ad4e !important;
  background-color: #f0ad4e !important;
}

.navbar-burger span {
  color: white !important;
}

@keyframes flash-nav {
  from {
    opacity: 0;
  }
  92% {
    opacity: 0;
  }
  93% {
    opacity: 0.6;
  }
  94% {
    opacity: 0.2;
  }
  96% {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

@media (max-width: 768px) {
  .navbar-menu {
    padding: 0;
  }
}
</style>
