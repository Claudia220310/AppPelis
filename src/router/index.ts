import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import MoviesList from '@/views/MoviesList.vue';
import MovieDetail from '@/views/MovieDetail.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/movies',
    name: 'MoviesList',
    component: MoviesList,
    props: route => ({
      filter: route.query.filter,
      id: route.query.id
    })
  },
  {
    path: '/movie/:id',
    name: 'MovieDetail',
    component: MovieDetail,
    props: route => ({
      filter: route.query.filter,
      id: route.query.id
    })
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
