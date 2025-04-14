import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/components/LoginPage.vue';
import AboutPage from '@/views/AboutPage.vue';
import { IsUserLogged } from '@/api-helpers/AuthHelper';
import WorklogsPage from '@/views/WorklogsPage.vue';
import WorklogsReport from '@/views/WorklogsReport.vue';


const Home = () => import('@/views/HomePage.vue');

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/about',
    name: 'About',
    component: AboutPage,
    meta: { requiresAuth: false }
  },
  {
    path: '/worklogs',
    name: 'WorklogsPage',
    component: WorklogsPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/worklogsReport',
    name: 'WorklogsReport',
    component: WorklogsReport,
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});


router.beforeEach((to, from, next) => {
  const isAuthenticated = IsUserLogged();  
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/');
  } else {
    next();
  }
});

export default router;