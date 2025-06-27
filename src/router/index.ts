import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () => import(/* webpackChunkName: "Home" */"@/views/Home/index.vue"),
  },
  {
    path: "/box",
    name: "Box",
    component: () =>
      import(/* webpackChunkName: "Box" */ "@/views/Box/index.vue"),
  },
  {
    path: "/orbit-controls", // 控制器
    name: "OrbitControls",
    component: () =>
      import(/* webpackChunkName: "controls" */ "@/views/OrbitControls/index.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
