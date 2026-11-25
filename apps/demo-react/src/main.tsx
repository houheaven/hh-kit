
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "@/router.tsx";
import Loading from "@/components/loading/loading.tsx";
import "./main.css";

// 顶层入口:由 RouterProvider 承载路由,主题样式由 main.css 提供
const rootNode = document.getElementById("root");
if (rootNode) {
  ReactDOM.createRoot(rootNode).render(
    <React.StrictMode>
      <Suspense fallback={<Loading />}>
        <RouterProvider router={router} />
      </Suspense>
    </React.StrictMode>
  );
}
