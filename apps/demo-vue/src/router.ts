
import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: async () => import("./views/home-view.vue"),
    meta: {
      title: "hh-kit Vue Demo",
    },
  },
  {
    path: "/hh-footer",
    name: "hh-footer",
    component: async () => import("./views/hh-footer-view.vue"),
    meta: {
      title: "hhFooter 组件",
    },
  },
  {
    path: "/hh-image-dialog",
    name: "hh-image-dialog",
    component: async () => import("./views/hh-image-dialog-view.vue"),
    meta: {
      title: "hhImageDialog 组件",
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
