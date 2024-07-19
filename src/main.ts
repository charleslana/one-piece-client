import App from './App.vue';
import router from './router';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import {
  faBatteryFull,
  faBolt,
  faCircleArrowRight,
  faHandFist,
  faHeart,
  faKey,
  faPersonRunning,
  faShield,
  faSitemap,
  faUniversalAccess,
  faUser,
  faUserTie,
  faWater
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import './assets/main.css';
import 'bulma/css/bulma.css';
import 'animate.css';
import 'vue3-carousel/dist/carousel.css';

library.add(
  faKey,
  faCircleArrowRight,
  faUser,
  faSitemap,
  faUserTie,
  faWater,
  faBatteryFull,
  faBolt,
  faHeart,
  faPersonRunning,
  faShield,
  faHandFist,
  faUniversalAccess
);

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app');
