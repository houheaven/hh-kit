
/* eslint-disable @typescript-eslint/naming-convention, react/forbid-component-props */
// - naming-convention:PascalCase 组件必须与仓库变量 camelCase 规则冲突
// - forbid-component-props:react-router-dom 的 Link 使用 className 是官方规范

import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import HhImageDialog from "@houheaven/kit-react/hh-image-dialog";
import qrcode from "@houheaven/kit-assets/assets/wx-mp-houheaven.jpg";
import VButton from "../components/v-button.tsx";
import "./hh-image-dialog-view.css";

const HhImageDialogView = (): React.JSX.Element => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const handleOpen = useCallback((): void => {
    setIsVisible(true);
  }, []);

  return (
    <div className="hh-image-dialog-view">
      <header className="page-header">
        <Link className="back-link" to="/">← 返回首页</Link>
        <h1>hhImageDialog</h1>
        <p className="description">
          简易图片弹窗组件,用于展示二维码等图片。通过
          {" "}
          <code>isOpen</code>
          {" "}
          控制显示,点击遮罩或按 ESC 触发
          {" "}
          <code>onOpenChange(false)</code>
          。
        </p>
      </header>

      <section className="demo-section">
        <h2>基础用法</h2>
        <p className="section-desc">
          通过
          {" "}
          <code>isOpen</code>
          {" "}
          +
          {" "}
          <code>onOpenChange</code>
          {" "}
          受控;
          <code>image</code>
          {" "}
          指定图片地址,
          <code>text</code>
          {" "}
          指定图片下方说明文字。
        </p>
        <div className="preview">
          <VButton type="primary" onClick={handleOpen}>显示图片</VButton>
        </div>
        <HhImageDialog
          image={qrcode}
          isOpen={isVisible}
          text="扫码关注 houheaven"
          onOpenChange={setIsVisible}
        />
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
              <td>isOpen</td>
              <td>是否显示弹窗</td>
              <td>boolean / —</td>
            </tr>
            <tr>
              <td>Props</td>
              <td>onOpenChange</td>
              <td>显隐变更回调(点击遮罩、按 ESC 会传 false)</td>
              <td>(next: boolean) =&gt; void / —</td>
            </tr>
            <tr>
              <td>Props</td>
              <td>image</td>
              <td>图片地址</td>
              <td>string / —</td>
            </tr>
            <tr>
              <td>Props</td>
              <td>text</td>
              <td>图片下方说明文字</td>
              <td>string / &quot;&quot;</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default HhImageDialogView;
