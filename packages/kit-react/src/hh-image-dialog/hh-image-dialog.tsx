
import React, { useCallback, useEffect, useRef, useState } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import { createPortal } from "react-dom";
import "@houheaven/kit-styles/animation.css";
import "./hh-image-dialog.css";

interface HhImageDialogProps {
  // 弹窗显隐(受控)
  isOpen: boolean;
  // 显隐状态变更回调,遮罩点击、ESC 会调用 onOpenChange(false)
  onOpenChange: (next: boolean) => void;
  // 图片地址
  image: string;
  // 图片下方说明文字
  text?: string;
}

interface TransitionState {
  isMounted: boolean;
  className: string;
}

const NOOP_CLEANUP = (): void => { /* noop */ };

// 复刻 Vue transition 的 3 阶段类名机制:enter-from + enter-active -> enter-active -> ""
// 卸载时:leave-active + leave-to,等 duration 后卸载
function useVueTransition(isOpen: boolean, name: string, enterMs: number, leaveMs: number): TransitionState {
  const [isMounted, setIsMounted] = useState<boolean>(isOpen);
  const [className, setClassName] = useState<string>("");
  const timerRef = useRef<number | null>(null);
  const raf1Ref = useRef<number | null>(null);
  const raf2Ref = useRef<number | null>(null);
  // 未开启过就不跑离开动画,避免初始渲染的多余状态切换
  const hasOpenedRef = useRef<boolean>(isOpen);

  useEffect(() => {
    // 清理上次残留的定时器/帧回调,避免快速切换时状态错乱
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (raf1Ref.current !== null) {
      window.cancelAnimationFrame(raf1Ref.current);
      raf1Ref.current = null;
    }
    if (raf2Ref.current !== null) {
      window.cancelAnimationFrame(raf2Ref.current);
      raf2Ref.current = null;
    }

    if (isOpen) {
      hasOpenedRef.current = true;
      setIsMounted(true);
      setClassName(`${name}-enter-from ${name}-enter-active`);
      raf1Ref.current = window.requestAnimationFrame(() => {
        raf2Ref.current = window.requestAnimationFrame(() => {
          setClassName(`${name}-enter-active`);
        });
      });
      // 过渡完成后清空动画类,避免持续占用 transition 属性
      timerRef.current = window.setTimeout(() => {
        setClassName("");
      }, enterMs + 50);
    }
    else if (hasOpenedRef.current) {
      setClassName(`${name}-leave-active ${name}-leave-to`);
      timerRef.current = window.setTimeout(() => {
        setIsMounted(false);
        setClassName("");
      }, leaveMs);
    }
  }, [isOpen, name, enterMs, leaveMs]);

  return { isMounted, className };
}

// React Hook 规则要求组件函数名首字母大写;JSX 组件必须 PascalCase,
// 这里不可避免与仓库 naming-convention 中"变量必须 strictCamelCase"冲突,禁用此规则
// eslint-disable-next-line @typescript-eslint/naming-convention
const HhImageDialog = (props: HhImageDialogProps): React.JSX.Element | null => {
  const { isOpen, onOpenChange, image, text = "" } = props;
  const mask = useVueTransition(isOpen, "fade", 300, 200);
  const wrap = useVueTransition(isOpen, "slideDown", 300, 200);

  const handleWrapClick = useCallback(
    (evt: ReactMouseEvent<HTMLDivElement>): void => {
      // 只响应遮罩本身的点击,忽略卡片内部冒泡
      if (evt.target === evt.currentTarget) onOpenChange(false);
    },
    [onOpenChange]
  );

  useEffect(() => {
    if (!isOpen) return NOOP_CLEANUP;
    function handleKeydown(evt: KeyboardEvent): void {
      if (evt.key === "Escape") onOpenChange(false);
    }
    window.addEventListener("keydown", handleKeydown);
    document.documentElement.style.overflowY = "hidden";
    return function cleanup(): void {
      window.removeEventListener("keydown", handleKeydown);
      document.documentElement.style.overflowY = "auto";
    };
  }, [isOpen, onOpenChange]);

  if (typeof document === "undefined") return null;
  if (!mask.isMounted && !wrap.isMounted) return null;

  return createPortal(
    <>
      {mask.isMounted ? (
        <div className={`hh-image-dialog__mask ${mask.className}`.trim()} />
      ) : null}
      {wrap.isMounted ? (
        <div className={`hh-image-dialog__wrap ${wrap.className}`.trim()} onClick={handleWrapClick}>
          <div className="hh-image-dialog__card">
            <img alt={text || ""} className="hh-image-dialog__image" src={image} />
            {text ? <p className="hh-image-dialog__text">{text}</p> : null}
          </div>
        </div>
      ) : null}
    </>,
    document.body
  );
};

HhImageDialog.defaultProps = {
  text: "",
};

export default HhImageDialog;
export type {
  HhImageDialogProps,
};
