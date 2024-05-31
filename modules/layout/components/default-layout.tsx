import { mergeClassAndStyleProps } from "@/lib/utils";
import { IComponentBaseProps } from "@/types";
import React from "react";
import { LeftSidebar } from "./left-sidebar";
import { Navbar } from "./navbar";

export interface IDefaultLayoutProps extends IComponentBaseProps {
  children?: React.ReactNode;
}

export const DefaultLayout: React.FC<IDefaultLayoutProps> = (props) => {
  return mergeClassAndStyleProps(
    props,
    <div>
      <Navbar />
      <div className="flex">
        <LeftSidebar className="max-sm:hidden" />
        {props.children}
        RightSidebar
      </div>
      Toaster
    </div>
  );
};
