
import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import HomeView from "./views/home-view.vue";
import HhFooterView from "./views/hh-footer-view.vue";
import HhImageDialogView from "./views/hh-image-dialog-view.vue";

const routes: RouteRecordRaw[] = [
  { path: "/", name: "home", component: HomeView, meta: { title: "hh-kit Vue Demo" } },
  { path: "/hh-footer", name: "hh-footer", component: HhFooterView, meta: { title: "HhFooter 组件" } },
  { path: "/hh-image-dialog", name: "hh-image-dialog", component: HhImageDialogView, meta: { title: "HhImageDialog 组件" } },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
