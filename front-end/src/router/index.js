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
    path: "/equipments",
    name: "equipments",
    props : true,
    component: () => import("../components/company/equipments/viewEquipments.vue")
  },
  {
    path: "/addEquipments",
    name: "addEquipments",
    props : true,
    component: () => import("../components/company/equipments/addEquipments.vue")
  },
  {
    path: "/projectView",
    name: "projectView",
    props: true,
    component: () => import("../components/company/projectDetails.vue"),
  },
  {
    path: "/editProject/:id",
    name: "editProject",
    props: true,
    component: () => import("../components/company/editProject.vue"),
  },
  {
    path: "/projectFiles/:id",
    name: "projectFiles",
    props: true,
    component: () => import("../components/company/projectsFile.vue"),
  },
  {
    path: "/taskView/:id",
    name: "taskView",
    props: true,
    component: () => import("../components/company/task/taskView.vue"),
  },
  {
    path: "/taskFiles/:id",
    name: "taskFiles",
    props: true,
    component: () => import("../components/company/task/taskFiles.vue"),
  },
  {
    path: "/subTaskFiles/:id",
    name: "subTaskFiles",
    props: true,
    component: () => import("../components/company/subTask/subTaskFiles.vue"),
  },
  {
    path: "/addTask/:id",
    name: "addTask",
    props: true,
    component: () => import("../components/company/task/addTask.vue"),
  },
  {
    path: "/addSubTask/:id",
    name: "addSubTask",
    props: true,
    component: () => import("../components/company/subTask/addSubTask.vue"),
  },
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
export default router