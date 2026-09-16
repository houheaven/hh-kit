
/* eslint-disable @typescript-eslint/naming-convention, react/forbid-component-props */
// - naming-convention:PascalCase 组件必须与仓库变量 camelCase 规则冲突
// - forbid-component-props:react-router-dom 的 Link 使用 className 是官方规范

import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import HhFooter from "@houheaven/kit-react/hh-footer";
import type { FooterGroup } from "@houheaven/kit-assets/data/hh-footer-types";
import demoQrcode from "@houheaven/kit-assets/assets/wx-mp-houheaven.jpg";
import "./hh-footer-view.css";

const HhFooterView = (): React.JSX.Element => {
  // 保留静态数据结构与 demo-vue 一致;useMemo 避免每次渲染重建数组
  const customGroups = useMemo<FooterGroup[]>(() => [
    {
      title: "产品",
      links: [
        { label: "特性", href: "#features" },
        { label: "价格", href: "#pricing" },
      ],
    },
    {
      title: "支持",
      links: [
        { label: "文档", href: "#docs" },
        { label: "GitHub", href: "https://github.com" },
      ],
    },
    {
      title: "联系",
      links: [
        {
          label: "扫码加我",
          type: "image-dialog",
          image: demoQrcode,
          text: "示例二维码",
        },
        { label: "邮箱", href: "mailto:hello@example.com" },
      ],
    },
  ], []);

  return (
    <div className="hh-footer-view">
      <header className="page-header">
        <Link className="back-link" to="/">← 返回首页</Link>
        <h1>hhFooter</h1>
        <p className="description">
          页脚组件,通过 props 传入分组导航、版权,链接支持
          {" "}
          <code>href</code>
          {" "}
          与
          {" "}
          <code>image-dialog</code>
          {" "}
          两种类型。
        </p>
      </header>

      <section className="demo-section">
        <h2>houheaven 默认数据</h2>
        <p className="section-desc">
          开启
          {" "}
          <code>useHouheavenData</code>
          ,组件直接使用
          {" "}
          <code>@houheaven/kit-assets</code>
          {" "}
          内置品牌数据(含微信二维码弹窗)。
        </p>
        <div className="preview">
          <HhFooter useHouheavenData />
        </div>
      </section>

      <section className="demo-section">
        <h2>他人接入示例</h2>
        <p className="section-desc">
          传入自定义
          {" "}
          <code>groups</code>
          {" "}
          与
          {" "}
          <code>copyright</code>
          ;链接支持普通
          {" "}
          <code>href</code>
          {" "}
          或
          {" "}
          <code>image-dialog</code>
          {" "}
          类型。
        </p>
        <div className="preview">
          <HhFooter copyright="Copyright © 2026 Your Company" groups={customGroups} />
        </div>
      </section>

      <section className="demo-section">
        <h2>API</h2>
        <table className="api-table">
          <thead>
            <tr>
              <th>类别</th>
              <th>名称</th>
              <th>说明</th>
              <th>类型 / 默认值</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Props</td>
              <td>groups</td>
              <td>分组导航数据</td>
              <td>FooterGroup[] / []</td>
            </tr>
            <tr>
              <td>Props</td>
              <td>copyright</td>
              <td>底部版权文字</td>
              <td>string / &quot;&quot;</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="demo-section">
        <h2>FooterLink 类型</h2>
        <p className="section-desc">
          链接是判别联合,通过
          <code>type</code>
          {" "}
          区分两种形态:
        </p>
        <table className="api-table">
          <thead>
            <tr>
              <th>type</th>
              <th>字段</th>
              <th>说明</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>&quot;href&quot;(默认)</td>
              <td>label, href, external?</td>
              <td>普通链接,external!=false 时新窗口打开</td>
            </tr>
            <tr>
              <td>&quot;image-dialog&quot;</td>
              <td>label, image, text?</td>
              <td>点击弹出图片弹窗(如二维码)</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default HhFooterView;
