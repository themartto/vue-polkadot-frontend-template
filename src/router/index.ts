import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/not-found',
    name: '404 NotFound',
    component: () => import('../views/NotFound.vue')
  },
  {
    path: '*',
    name: 'All',
    redirect: '/not-found'
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
