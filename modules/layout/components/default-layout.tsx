import { mergeClassAndStyleProps } from "@lib/utils";
import { IComponentBaseProps } from "@types";
import React from "react";
import { LeftSidebar } from "./left-sidebar";
import { Navbar } from "./navbar";
import { RightSidebar } from "./right-sidebar";

export interface IDefaultLayoutProps extends IComponentBaseProps {
  children?: React.ReactNode;
}

export const DefaultLayout: React.FC<IDefaultLayoutProps> = (props) => {
  return mergeClassAndStyleProps(
    props,
    <div className="background-light850_dark100 relative">
      <Navbar className="fixed z-50" />
      <div className="flex">
        <LeftSidebar className="max-sm:hidden pt-36" />
        <div className="flex-1 pt-36">{props.children}</div>
        <RightSidebar className="max-xl:hidden pt-36" />
      </div>
      {/* Toaster */}
    </div>
  );
};
