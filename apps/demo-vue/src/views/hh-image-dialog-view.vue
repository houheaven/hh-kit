
<template>
  <div class="hh-image-dialog-view">
    <header class="page-header">
      <router-link to="/" class="back-link">← 返回首页</router-link>
      <h1>HhImageDialog</h1>
      <p class="description">简易图片弹窗组件,用于展示二维码等图片。通过 <code>:show</code> 控制显示,点击遮罩或按 ESC 触发 <code>@close</code>。</p>
    </header>

    <section class="demo-section">
      <h2>基础用法</h2>
      <p class="section-desc">
        通过 <code>:show</code> 控制显示状态;<code>src</code> 指定图片地址,<code>caption</code> 指定图片下方说明文字;<code>@close</code> 在点击遮罩或 ESC 时触发。
      </p>
      <div class="preview">
        <v-button type="primary" @click="visible = true">显示图片</v-button>
      </div>
      <hh-image-dialog v-model="visible" :image="qrcode" text="扫码关注 houheaven" />
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
            <td>show</td>
            <td>是否显示弹窗</td>
            <td>boolean / —</td>
          </tr>
          <tr>
            <td>Props</td>
            <td>src</td>
            <td>图片地址</td>
            <td>string / —</td>
          </tr>
          <tr>
            <td>Props</td>
            <td>alt</td>
            <td>图片替代文本</td>
            <td>string / ""</td>
          </tr>
          <tr>
            <td>Props</td>
            <td>caption</td>
            <td>图片下方说明文字</td>
            <td>string / ""</td>
          </tr>
          <tr>
            <td>Events</td>
            <td>close</td>
            <td>点击遮罩或按 ESC 时触发</td>
            <td>—</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script setup lang="ts">
  import { ref } from "vue";
  import { HhImageDialog } from "@houheaven/kit-vue";
  import qrcode from "@houheaven/kit-assets/assets/wx-mp-houheaven.jpg";
  import VButton from "../components/v-button.vue";

  const visible = ref(false);
</script>

<style scoped>
  .hh-image-dialog-view {
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
    padding: 24px;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
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
