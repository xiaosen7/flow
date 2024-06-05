"use client";

import { mergeClassAndStyleProps } from "@/lib/utils";
import { IComponentBaseProps } from "@/types";
import { useRequest } from "ahooks";
import React from "react";

export interface IGitLogProps extends IComponentBaseProps {}

export const GitLog: React.FC<IGitLogProps> = (props) => {
  const { data, loading } = useRequest(() =>
    fetch("/git.log").then((r) => r.text() as Promise<string>)
  );

  return mergeClassAndStyleProps(
    props,
    <div className="text-light400_light500 text-sm">
      {loading ? "loading..." : data}
    </div>
  );
};
