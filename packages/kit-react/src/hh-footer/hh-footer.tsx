
/* eslint-disable @typescript-eslint/naming-convention, react/require-default-props, no-script-url, react/jsx-no-script-url, react/no-array-index-key, no-undefined, react/boolean-prop-naming */
// 全文件禁用与仓库其它场景冲突的规则:
// - naming-convention:PascalCase 组件必须与仓库变量 camelCase 规则冲突
// - require-default-props:React 侧使用参数默认值代替 defaultProps
// - script-url:footer link 使用 href="javascript:;" 拦截默认跳转,行为同 kit-vue
// - no-array-index-key:groups/links 是纯静态数组,索引即稳定 key
// - no-undefined:target/rel 未启用时传 undefined 才能避免属性生成
// - boolean-prop-naming:useHouheavenData 保持与 kit-vue prop 命名对齐

import React, { useCallback, useState } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import hhFooterData from "@houheaven/kit-assets/data/hh-footer-data";
import type { FooterGroup, FooterLink, FooterLinkImageDialog } from "@houheaven/kit-assets/data/hh-footer-types";
import HhImageDialog from "../hh-image-dialog/hh-image-dialog.tsx";
import "./hh-footer.css";

interface HhFooterProps {
  // 分组导航数据
  groups?: FooterGroup[];
  // 底部版权文字
  copyright?: string;
  // 开启后直接使用 houheaven 默认数据,优先级高于其它 props
  useHouheavenData?: boolean;
}

// 类型守卫:让 TS 缩小到 image-dialog 分支
function isImageDialogLink(link: FooterLink): link is FooterLinkImageDialog {
  return link.type === "image-dialog";
}

interface FooterLinkItemProps {
  link: FooterLink;
  onImageDialog: (link: FooterLinkImageDialog) => void;
}

// 抽出子组件规避 react/jsx-no-bind,使 map 循环里没有内联箭头
const FooterLinkItem = (itemProps: FooterLinkItemProps): React.JSX.Element => {
  const { link, onImageDialog } = itemProps;
  const handleImageDialog = useCallback(
    (evt: ReactMouseEvent<HTMLAnchorElement>): void => {
      evt.preventDefault();
      if (isImageDialogLink(link)) onImageDialog(link);
    },
    [link, onImageDialog]
  );
  if (isImageDialogLink(link)) {
    return (
      <a href="javascript:;" onClick={handleImageDialog}>
        {link.label}
      </a>
    );
  }
  const isExternal = link.external !== false;
  return (
    <a
      href={link.href}
      rel={isExternal ? "noreferrer" : undefined}
      target={isExternal ? "_blank" : undefined}
    >
      {link.label}
    </a>
  );
};

const HhFooter = (props: HhFooterProps): React.JSX.Element => {
  const { groups = [], copyright = "", useHouheavenData = false } = props;
  const currentGroups: FooterGroup[] = useHouheavenData ? hhFooterData.groups : groups;
  const currentCopyright: string = useHouheavenData ? hhFooterData.copyright : copyright;

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [dialogImage, setDialogImage] = useState<string>("");
  const [dialogText, setDialogText] = useState<string>("");

  const openImageDialog = useCallback((link: FooterLinkImageDialog): void => {
    setDialogImage(link.image);
    setDialogText(link.text ?? "");
    setIsDialogOpen(true);
  }, []);

  return (
    <>
      <div className={`hh-footer hh-footer-grids-${currentGroups.length}`}>
        <div className="hh-footer-content">
          <div className="hh-footer-links-container">
            {currentGroups.map((group, gIdx) => (
              <div key={gIdx} className="hh-footer-links">
                <h3 className="hh-footer-links-title">{group.title}</h3>
                <ul className="hh-footer-links-list">
                  {group.links.map((link, lIdx) => (
                    <li key={lIdx} className="hh-footer-links-item">
                      <FooterLinkItem link={link} onImageDialog={openImageDialog} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="hh-footer-copyright">{currentCopyright}</p>
        </div>
      </div>
      <HhImageDialog
        image={dialogImage}
        isOpen={isDialogOpen}
        text={dialogText}
        onOpenChange={setIsDialogOpen}
      />
    </>
  );
};

export default HhFooter;
export type {
  HhFooterProps,
};
