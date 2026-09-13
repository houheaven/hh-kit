
/* eslint-disable @typescript-eslint/no-type-alias */

// 设计变量:间距
export const spacing = {
  xs: "4px",
  sm: "8px",
  md: "16px",
  lg: "24px",
  xl: "32px",
} as const;

export type SpacingToken = keyof typeof spacing
