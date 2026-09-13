
// 设计变量:字体
export const typography = {
  fontFamily: "system-ui, -apple-system, sans-serif",
  fontSize: {
    xs: "12px",
    sm: "14px",
    md: "16px",
    lg: "18px",
    xl: "24px",
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    bold: 700,
  },
} as const;

export default typography;
