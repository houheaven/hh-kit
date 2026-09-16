
interface FooterLinkBase {
  label: string;
  // 外链默认新窗口打开;内部链接可以设为 false
  external?: boolean;
}

// 普通链接:type 可省略,默认视为 href
interface FooterLinkHref extends FooterLinkBase {
  type?: "href";
  href: string;
}

// 图片弹窗链接:点击后弹出一张图片(如二维码)
interface FooterLinkImageDialog extends FooterLinkBase {
  type: "image-dialog";
  image: string;
  text?: string;
}

type FooterLink = FooterLinkHref | FooterLinkImageDialog;

interface FooterGroup {
  title: string;
  links: FooterLink[];
}

interface FooterData {
  groups: FooterGroup[];
  copyright: string;
}

export type {
  FooterLinkBase,
  FooterLinkHref,
  FooterLinkImageDialog,
  FooterLink,
  FooterGroup,
  FooterData,
};
