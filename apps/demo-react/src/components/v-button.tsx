
/* eslint-disable @typescript-eslint/naming-convention, react/require-default-props, react/boolean-prop-naming */
// v- 前缀 demo 内部按钮:
// - naming-convention:PascalCase 组件必须与仓库变量 camelCase 规则冲突
// - require-default-props:改用参数默认值代替 defaultProps
// - boolean-prop-naming:disabled 保持原生 HTML 语义,不加 is/has 前缀

import React, { useMemo } from "react";
import type { CSSProperties, MouseEventHandler, ReactNode } from "react";
import { color } from "@houheaven/kit-tokens";
import "./v-button.css";

interface VButtonProps {
  type?: "primary" | "default";
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children?: ReactNode;
}

const VButton = (props: VButtonProps): React.JSX.Element => {
  const { type = "default", disabled = false, onClick, children } = props;
  const style: CSSProperties = useMemo(() => ({
    backgroundColor: type === "primary" ? color.primary : color.background,
    color: type === "primary" ? "#fff" : color.text,
  }), [type]);
  return (
    <button className="v-button" disabled={disabled} style={style} type="button" onClick={onClick}>
      {children}
    </button>
  );
};

export default VButton;
export type {
  VButtonProps,
};
