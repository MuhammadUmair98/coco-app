import { createRouter, createWebHistory } from 'vue-router'
import MyHome from '../views/MyHome.vue'

const routes = [
  {
    path: '/',
    name: 'MyHome',
    component: MyHome
  },
  {
    path: "/auth",
    name: "auth",
    component: () => import("../components/authComponent.vue"),
  },
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
export default router