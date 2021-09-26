import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'myAppliances',
    component: () => import ('../components/my-appliances')
  },
  {
    path: '/newAppliance',
    name: 'newAppliance',
    component: () => import ('../components/new-appliance')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
