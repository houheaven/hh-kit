
import type { CSSProperties, FC } from "react";
import { icons } from "../index";
import type { IconName } from "../index";

interface IconProps {
  name: IconName;
  size?: number | string;
  style?: CSSProperties;
}

export const Icon: FC<IconProps> = ({ name, size = 24, style }) => {
  const mergedStyle: CSSProperties = {
    width: typeof size === "number" ? `${size}px` : size,
    height: typeof size === "number" ? `${size}px` : size,
    display: "inline-flex",
    ...style,
  };
  return <span dangerouslySetInnerHTML={{ __html: icons[name] }} style={mergedStyle} />;
};
