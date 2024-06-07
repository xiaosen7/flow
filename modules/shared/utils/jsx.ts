import { ISafeAny } from "@/shared";
import React from "react";
import { cn } from "./clsx";

export function mp(
  props: ISafeAny,
  jsx: React.ReactElement
) {
  return React.cloneElement(jsx, {
    ...jsx.props,
    className: cn(jsx.props.className, props.className),
    style: { ...jsx.props.style, ...props.style },
  });
}
