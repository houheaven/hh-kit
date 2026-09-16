
import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import HomeView from "./views/home-view.vue";
import hhFooterView from "./views/hh-footer-view.vue";
import hhImageDialogView from "./views/hh-image-dialog-view.vue";

const routes: RouteRecordRaw[] = [
  { path: "/", name: "home", component: HomeView, meta: { title: "hh-kit Vue Demo" } },
  { path: "/hh-footer", name: "hh-footer", component: hhFooterView, meta: { title: "hhFooter 组件" } },
  { path: "/hh-image-dialog", name: "hh-image-dialog", component: hhImageDialogView, meta: { title: "hhImageDialog 组件" } },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
