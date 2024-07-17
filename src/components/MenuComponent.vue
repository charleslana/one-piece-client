<script setup lang="ts">
import { onMounted, ref } from 'vue';

const props = defineProps<{
  type: 'on' | 'off' | 'none';
}>();

interface Menu {
  name: string;
  icon: 'menu-main' | 'menu-register' | 'menu-login';
  route: string;
}

const menuOff = ref<Menu[]>([
  { name: 'Home', icon: 'menu-main', route: '/' },
  { name: 'Cadastro', icon: 'menu-register', route: '/register' },
  { name: 'Login', icon: 'menu-login', route: '/login' }
]);
const menuOn = ref<Menu[]>([]);
const menuList = ref<Menu[]>([]);

onMounted(() => {
  if (props.type === 'none') {
    return;
  }
  if (props.type === 'on') {
    menuList.value = menuOn.value;
    return;
  }
  menuList.value = menuOff.value;
});
</script>

<template>
  <aside class="menu side-nav">
    <ul class="menu-list">
      <li v-for="(menu, index) in menuList" :key="index">
        <RouterLink :to="menu.route" class="is-flex is-justify-content-start is-align-items-center">
          <div :class="menu.icon"></div>
          <p class="ml-5">{{ menu.name }}</p>
        </RouterLink>
      </li>
    </ul>
  </aside>
</template>

<style scoped>
@media (min-width: 768px) {
  .side-nav {
    position: fixed !important;
    top: 80px !important;
    left: 225px !important;
    width: 225px;
    margin-left: -225px;
    border: none;
    border-radius: 0;
    overflow-y: auto;
    background-color: #fbda8f;
    bottom: 0;
    overflow-x: hidden;
    padding-bottom: 40px;
  }
}

.menu-list {
  position: fixed;
  width: 225px;
  overflow-y: auto;
  height: calc(100vh - 80px);
}

.menu-list li a {
  margin-bottom: 2px;
  background: url('../assets/images/layout/back.jpg') top center repeat;
  background-color: rgb(220, 161, 94);
  text-shadow:
    -1px 0 black,
    0 1px black,
    1px 0 black,
    0 -1px black;
  padding: 0;
}

.menu-list li a p {
  font-family: 'LuckiestGuy', cursive;
  font-size: 24px;
  border-color: #eea236;
  color: #eaea00 !important;
}

.menu-main {
  background-image: url('../assets/images/menu/main.png');
  width: 37px;
  height: 45px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.menu-register {
  background-image: url('../assets/images/menu/register.png');
  width: 37px;
  height: 45px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.menu-login {
  background-image: url('../assets/images/menu/login.png');
  width: 37px;
  height: 45px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.custom-menu {
  width: 225px !important;
  height: calc(100vh - 80px);
}

@media (max-width: 768px) {
  .menu-list,
  .custom-menu {
    height: calc(100vh - 50px) !important;
  }
  .menu-list {
    width: 100%;
    border-top: 1px solid #101010;
    background-color: #fbda8f;
    height: auto !important;
  }
}
</style>
