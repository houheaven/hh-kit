
import type { CSSProperties, FC, MouseEventHandler, ReactNode } from "react";
import { color } from "@houheaven/kit-tokens";

interface ButtonProps {
  type?: "primary" | "default";
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children?: ReactNode;
}

export const Button: FC<ButtonProps> = ({ type = "default", disabled = false, onClick, children }) => {
  const style: CSSProperties = {
    padding: "8px 16px",
    border: "1px solid #e5e7eb",
    borderRadius: 4,
    cursor: disabled ? "not-allowed" : "pointer",
    fontSize: 14,
    opacity: disabled ? 0.5 : 1,
    backgroundColor: type === "primary" ? color.primary : color.background,
    color: type === "primary" ? "#fff" : color.text,
  };
  return (
    <button disabled={disabled} style={style} onClick={onClick}>
      {children}
    </button>
  );
};
