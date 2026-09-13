
/* eslint-disable @typescript-eslint/no-type-alias */

// 设计变量:颜色
export const color = {
  primary: "#3b82f6",
  success: "#22c55e",
  warning: "#f59e0b",
  danger: "#ef4444",
  text: "#111827",
  textSecondary: "#6b7280",
  border: "#e5e7eb",
  background: "#ffffff",
} as const;

export type ColorToken = keyof typeof color
