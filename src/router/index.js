import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/time',
    name: 'time',
    component: () => import('../views/TimeAttack.vue')
  },
  {
    path: '/result',
    name: 'result',
    component: () => import('../views/ResultView.vue')
  },
  {
    path: '/rank',
    name: 'rank',
    component: () => import('../views/RankView.vue')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('../views/UserView.vue')
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('../views/TestView.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
