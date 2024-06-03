"use client";

import { useMediaQuery } from "@hooks/media-query";
import { mergeClassAndStyleProps } from "@lib/utils";
import { IComponentBaseProps } from "@types";
import React from "react";
import { NavButtons } from "./nav-buttons";
import { NavLinks } from "./nav-links";

export interface ILeftSidebarProps extends IComponentBaseProps {}

export const LeftSidebar: React.FC<ILeftSidebarProps> = (props) => {
  const mediaQuery = useMediaQuery();

  return mergeClassAndStyleProps(
    props,
    <section className="w-fit background-light900_dark200 light-border sticky left-0 top-0 flex h-screen flex-col justify-between overflow-y-auto border-r p-6 shadow-light-300 dark:shadow-none lg:w-[266px] custom-scrollbar">
      <NavLinks simple={mediaQuery.isLessThanLG} />
      <NavButtons simple={mediaQuery.isLessThanLG} />
    </section>
  );
};
