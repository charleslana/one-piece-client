import App from './App.vue';
import router from './router';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './assets/main.css';
import 'bulma/css/bulma.css';
import 'animate.css';
import 'vue3-carousel/dist/carousel.css';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
