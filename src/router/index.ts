import CreateCharacterView from '@/views/CreateCharacterView.vue';
import GeneralView from '@/views/GeneralView.vue';
import HistoryView from '@/views/HistoryView.vue';
import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';
import MessageView from '@/views/MessageView.vue';
import RankingView from '@/views/RankingView.vue';
import RecoveryPasswordView from '@/views/RecoveryPasswordView.vue';
import RegisterView from '@/views/RegisterView.vue';
import { createRouter, createWebHistory } from 'vue-router';
import { isAuthenticated, removeAccessToken } from '@/utils/local-storage-utils';

const BlankComponent = {
  template: '<div></div>'
};

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
      meta: { title: getTitle('Criar personagem'), requiresAuth: true }
    },
    {
      path: '/general',
      name: 'general',
      component: GeneralView,
      meta: { title: getTitle('Geral'), requiresAuth: true }
    },
    {
      path: '/message',
      name: 'message',
      component: MessageView,
      meta: { title: getTitle('Correio'), requiresAuth: true }
    },
    {
      path: '/history',
      name: 'history',
      component: HistoryView,
      meta: { title: getTitle('História'), requiresAuth: true }
    },
    {
      path: '/ranking',
      name: 'ranking',
      component: RankingView,
      meta: { title: getTitle('Classificação'), requiresAuth: true }
    },
    {
      path: '/logout',
      name: 'logout',
      component: BlankComponent,
      beforeEnter: (_to, _from, next) => {
        removeAccessToken();
        next({ name: 'login' });
      }
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
  requiresAuth?: boolean;
}

router.beforeEach((to, _from, next) => {
  const meta = to.meta as RouteMeta;
  if (meta && meta.title) {
    document.title = meta.title;
  } else {
    document.title = getTitle();
  }
  const requiresAuth = meta.requiresAuth;
  const publicPages = ['login', 'register', 'home', 'recovery-password'];
  const isPublicPage = publicPages.includes(to.name as string);
  if (!isAuthenticated() && requiresAuth) {
    next({ name: 'login' });
  } else if (isAuthenticated() && isPublicPage) {
    next({ name: 'general' });
  } else {
    next();
  }
});

function getTitle(title?: string): string {
  return `One Piece Life - ${title}`;
}
