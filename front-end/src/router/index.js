import { createRouter, createWebHistory } from 'vue-router'
import MyHome from '../views/MyHome.vue'

const routes = [
  {
    path: "/",
    name: "dashboard",
    props: true,
    component: () => import("../components/customer/dashboard.vue"),
  },
  {
    path: "/about",
    name: "about",
    props: true,
    component: () => import("../components/customer/about.vue"),
  },
  {
    path: "/contact",
    name: "contact",
    props: true,
    component: () => import("../components/customer/contact.vue")
  },
  {
    path: "/services",
    name: "services",
    props: true,
    component: () => import("../components/customer/services.vue")
  },
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
  {
    path: "/signUp",
    name: "signup",
    component: () => import("../components/signUp.vue"),
  },
  {
    path: "/projects",
    name: "projects",
    props : true,
    component: () => import("../components/company/projects.vue")
  },
  {
    path: "/projectView",
    name: "projectView",
    props: true,
    component: () => import("../components/company/projectDetails.vue"),
  },
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
export default router