import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Snapshot from '../views/Snapshot.vue'

Vue.use(VueRouter)

  const routes: Array<RouteConfig> = [
  {
    path: '/snapshot',
    alias: '/',
    name: 'Snapshot',
    component: Snapshot
  }
]

const router = new VueRouter({
  routes
})

export default router
