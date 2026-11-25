
import React, { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

const HomeView = lazy(async () => import("@/views/home-view.tsx"));
const HhFooterView = lazy(async () => import("@/views/hh-footer-view.tsx"));
const HhImageDialogView = lazy(async () => import("@/views/hh-image-dialog-view.tsx"));
const LayoutView = lazy(async () => import("@/views/layout-view.tsx"));

const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter([
  { path: "/", element: <HomeView /> },
  { path: "/hh-footer", element: <HhFooterView /> },
  { path: "/hh-image-dialog", element: <HhImageDialogView /> },
  { path: "/layout", element: <LayoutView /> },
  { path: "*", element: <Navigate to="/404" /> },
]);

export default router;
