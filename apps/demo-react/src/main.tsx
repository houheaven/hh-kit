
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router.tsx";
import "./main.css";

// 顶层入口:由 RouterProvider 承载路由,主题样式由 main.css 提供
const rootNode = document.getElementById("root");
if (rootNode) {
  ReactDOM.createRoot(rootNode).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}
