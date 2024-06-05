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
      <Navbar className="absolute left-0 top-0 z-50" />
      <div className="flex size-full">
        <LeftSidebar className="pt-36 max-sm:hidden" />
        <div className="h-full flex-1 overflow-auto break-all px-6 pb-6 pt-36">
          {props.children}
        </div>
        <RightSidebar className="pt-36 max-xl:hidden" />
      </div>
      {/* Toaster */}
    </div>
  );
};
