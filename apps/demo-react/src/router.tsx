
/* eslint-disable @typescript-eslint/naming-convention */
// React 懒加载视图必须 PascalCase 以满足 JSX 标签要求,与仓库 camelCase 冲突

import React, { lazy, Suspense } from "react";
import { createHashRouter } from "react-router-dom";

// 与 demo-vue 一致,使用 hash 路由避免 dev/preview 服务器 404;懒加载视图组件
const HomeView = lazy(async () => import("./views/home-view.tsx"));
const HhFooterView = lazy(async () => import("./views/hh-footer-view.tsx"));
const HhImageDialogView = lazy(async () => import("./views/hh-image-dialog-view.tsx"));

// 空态容器,避免 Suspense fallback 出现闪屏文字
const routerFallback: React.JSX.Element = <div />;

const router: ReturnType<typeof createHashRouter> = createHashRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={routerFallback}>
        <HomeView />
      </Suspense>
    ),
  },
  {
    path: "/hh-footer",
    element: (
      <Suspense fallback={routerFallback}>
        <HhFooterView />
      </Suspense>
    ),
  },
  {
    path: "/hh-image-dialog",
    element: (
      <Suspense fallback={routerFallback}>
        <HhImageDialogView />
      </Suspense>
    ),
  },
]);

export default router;
