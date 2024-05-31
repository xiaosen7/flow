import { clsx, type ClassValue } from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function mergeClassAndStyleProps(props: any, jsx: React.ReactElement) {
  return React.cloneElement(jsx, {
    ...jsx.props,
    className: clsx(jsx.props.className, props.className),
    style: { ...jsx.props.style, ...props.style },
  });
}
