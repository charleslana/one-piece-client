import App from './App.vue';
import router from './router';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { Dropdown, Tooltip, vTooltip } from 'floating-vue';
import {
  faBatteryFull,
  faBolt,
  faCircleArrowRight,
  faCircleQuestion,
  faHandFist,
  faHeart,
  faKey,
  faPersonRunning,
  faShield,
  faSitemap,
  faThumbsDown,
  faThumbsUp,
  faUniversalAccess,
  faUser,
  faUserTie,
  faWater
} from '@fortawesome/free-solid-svg-icons';
import { faClock as farClockRegular } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import './assets/main.css';
import 'floating-vue/dist/style.css';
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
  faUniversalAccess,
  farClockRegular,
  faThumbsUp,
  faThumbsDown,
  faCircleQuestion
);

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.component('font-awesome-icon', FontAwesomeIcon);

app.directive('tooltip', vTooltip);
app.component('VTooltip', Tooltip);
app.component('VDropdown', Dropdown);

app.mount('#app');
