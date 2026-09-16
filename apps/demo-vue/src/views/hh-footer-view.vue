
<template>
  <div class="hh-footer-view">
    <header class="page-header">
      <router-link to="/" class="back-link">← 返回首页</router-link>
      <h1>HhFooter</h1>
      <p class="description">页脚组件,通过 props 传入分组导航、版权,链接支持 <code>href</code> 与 <code>image-dialog</code> 两种类型。</p>
    </header>

    <section class="demo-section">
      <h2>houheaven 默认数据</h2>
      <p class="section-desc">
        开启 <code>use-houheaven-data</code>,组件直接使用 <code>@houheaven/kit-assets</code> 内置品牌数据(含微信二维码弹窗)。
      </p>
      <div class="preview">
        <hh-footer use-houheaven-data />
      </div>
    </section>

    <section class="demo-section">
      <h2>他人接入示例</h2>
      <p class="section-desc">
        传入自定义 <code>groups</code> 与 <code>copyright</code>;链接支持普通 <code>href</code> 或 <code>image-dialog</code> 类型。
      </p>
      <div class="preview">
        <hh-footer :groups="customGroups" copyright="Copyright © 2026 Your Company" />
      </div>
    </section>

    <section class="demo-section">
      <h2>API</h2>
      <table class="api-table">
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
            <td>string / ""</td>
          </tr>
          <tr>
            <td>Props</td>
            <td>useHouheavenData</td>
            <td>开启后直接使用 houheaven 内置默认数据,优先级最高</td>
            <td>boolean / false</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="demo-section">
      <h2>FooterLink 类型</h2>
      <p class="section-desc">链接是判别联合,通过 <code>type</code> 区分两种形态:</p>
      <table class="api-table">
        <thead>
          <tr>
            <th>type</th>
            <th>字段</th>
            <th>说明</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>"href"(默认)</td>
            <td>label, href, external?</td>
            <td>普通链接,external!=false 时新窗口打开</td>
          </tr>
          <tr>
            <td>"image-dialog"</td>
            <td>label, image, text?</td>
            <td>点击弹出图片弹窗(如二维码)</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script setup lang="ts">
  import { HhFooter } from "@houheaven/kit-vue";
  import type { FooterGroup } from "@houheaven/kit-assets/data/hh-footer-types";
  import demoQrcode from "@houheaven/kit-assets/assets/wx-mp-houheaven.jpg";

  const customGroups: FooterGroup[] = [
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
  ];
</script>

<style scoped>
  .hh-footer-view {
    min-height: 100vh;
    background: #f7f8fa;
  }

  .page-header {
    max-width: 960px;
    margin: 0 auto;
    padding: 40px 24px 24px;
  }

  .back-link {
    display: inline-block;
    color: #667eea;
    text-decoration: none;
    font-size: 14px;
    margin-bottom: 16px;
  }

  .back-link:hover {
    text-decoration: underline;
  }

  .page-header h1 {
    margin: 0 0 8px;
    font-size: 32px;
    font-weight: 600;
    color: #2a2d33;
  }

  .description {
    margin: 0;
    font-size: 14px;
    color: #6b7280;
    line-height: 1.6;
  }

  .description code {
    background: #f3f4f6;
    padding: 2px 6px;
    border-radius: 3px;
    font-size: 12px;
    font-family: "SFMono-Regular", Consolas, monospace;
  }

  .demo-section {
    max-width: 960px;
    margin: 24px auto;
    padding: 24px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  }

  .demo-section h2 {
    margin: 0 0 8px;
    font-size: 18px;
    font-weight: 600;
    color: #2a2d33;
  }

  .section-desc {
    margin: 0 0 16px;
    font-size: 13px;
    color: #6b7280;
    line-height: 1.6;
  }

  .section-desc code {
    background: #f3f4f6;
    padding: 2px 6px;
    border-radius: 3px;
    font-size: 12px;
    font-family: "SFMono-Regular", Consolas, monospace;
  }

  .preview {
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    overflow: hidden;
  }

  .api-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
  }

  .api-table th,
  .api-table td {
    padding: 10px 12px;
    text-align: left;
    border-bottom: 1px solid #e5e7eb;
  }

  .api-table th {
    background: #f9fafb;
    color: #4b5563;
    font-weight: 600;
  }

  .api-table td {
    color: #374151;
  }
</style>
