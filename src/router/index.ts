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
    path: "/zbandgd",
    name: "ZbAndGd",
    component: () =>
      import(/* webpackChunkName: "Box" */ "@/views/ZbAndGd/index.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
