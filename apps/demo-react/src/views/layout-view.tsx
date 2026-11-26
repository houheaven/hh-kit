
import React from "react";
import { Layout } from "@houheaven/kit-react";
import "./layout-view.css";

const navEntries = [
  { path: "/", label: "首页" },
  { path: "/hh-footer", label: "hhFooter" },
  { path: "/hh-image-dialog", label: "hhImageDialog" },
  { path: "/layout", label: "Layout" },
];

const LayoutView = (): React.JSX.Element => (
  <div className="layout-view">
    <Layout>
      <Layout.Header />
      <section className="layout-demo-content">
        <p className="layout-demo-eyebrow">组件示例</p>
        <h1>Layout</h1>
        <p className="layout-demo-description">
          使用顶栏、侧边导航与主内容区组合成响应式应用框架。
        </p>
        <div style={{ height: "1500px" }} />
        <div className="layout-demo-cards">
          <article>
            <h2>顶栏</h2>
            <p>放置品牌标识和全局操作。</p>
          </article>
          <article>
            <h2>侧边导航</h2>
            <p>集中展示站点或应用的主要页面入口。</p>
          </article>
          <article>
            <h2>主内容区</h2>
            <p>承载当前页面内容，并在窄屏下自然排到导航之后。</p>
          </article>
        </div>
      </section>
    </Layout>
  </div>
);

export default LayoutView;
