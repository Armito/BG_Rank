import Vue from 'vue'
import VueRouter from 'vue-router'

import Index from '../pages/Index.vue'

import Home from '../pages/Home.vue'
import Rank from '../pages/Rank.vue'
import Search from '../pages/Search.vue'
import My from '../pages/My.vue'
import Detail from '../pages/Detail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Index,
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: Home
      },
      {
        path: '/rank',
        component: Rank,
        meta: {
          keeplive: true
        }
      },
      {
        path: '/detail/:rank',
        component: Detail
      },
      {
        path: '/search',
        component: Search
      },
      {
        path: '/my',
        component: My
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
