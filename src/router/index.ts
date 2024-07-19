import CreateCharacterView from '@/views/CreateCharacterView.vue';
import GeneralView from '@/views/GeneralView.vue';
import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';
import RecoveryPasswordView from '@/views/RecoveryPasswordView.vue';
import RegisterView from '@/views/RegisterView.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: getTitle('Início') }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: { title: getTitle('Cadastro') }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { title: getTitle('Login') }
    },
    {
      path: '/recovery-password',
      name: 'recovery-password',
      component: RecoveryPasswordView,
      meta: { title: getTitle('Login') }
    },
    {
      path: '/create-character',
      name: 'create-character',
      component: CreateCharacterView,
      meta: { title: getTitle('Criar personagem') }
    },
    {
      path: '/general',
      name: 'general',
      component: GeneralView,
      meta: { title: getTitle('Geral') }
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue'),
      meta: { title: getTitle('Nada encontrado') }
    }
  ],
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
});

export default router;

interface RouteMeta {
  title?: string;
}

router.beforeEach((to, _from, next) => {
  const meta = to.meta as RouteMeta;
  if (meta && meta.title) {
    document.title = meta.title;
  } else {
    document.title = getTitle();
  }
  next();
});

function getTitle(title?: string): string {
  return `One Piece Life - ${title}`;
}
