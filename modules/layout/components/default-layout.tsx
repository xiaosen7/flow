import { IComponentBaseProps, mergeClassAndStyleProps } from "@/shared";
import React from "react";

import { GitLog } from "@/shared";
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
        <section className="mx-auto flex size-full flex-1 flex-col overflow-auto break-all px-6 pb-6 pt-36 max-md:pb-14 sm:px-14">
          {props.children}

          <GitLog className="mt-6" />
        </section>
        <RightSidebar className="pt-36 max-xl:hidden" />
      </div>
      {/* Toaster */}
    </div>
  );
};
