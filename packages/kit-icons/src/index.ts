
/* eslint-disable @typescript-eslint/no-type-alias */

// SVG 字符串资产入口:所有图标以原始 SVG 字符串形式导出
const iconArrowLeft = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>';

const iconCheck = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>';

const icons = {
  "arrowLeft": iconArrowLeft,
  "check": iconCheck,
} as const;

export type IconName = keyof typeof icons;

export {
  iconArrowLeft,
  iconCheck,
  icons,
};
