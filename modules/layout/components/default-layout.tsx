import { GitLog, IComponentBaseProps, mp } from "@/shared";
import React from "react";

import { LeftSidebar } from "./left-sidebar";
import { Navbar } from "./navbar";
import { IRightSidebarProps, RightSidebar } from "./right-sidebar";

export interface IDefaultLayoutProps
  extends IComponentBaseProps,
    IRightSidebarProps {
  children?: React.ReactNode;
}

export const DefaultLayout: React.FC<IDefaultLayoutProps> = (props) => {
  const { getTagQuestionCount, hotQuestions, popularTags } = props;
  return mp(
    props,
    <div className="background-light850_dark100 relative">
      <Navbar className="absolute left-0 top-0 z-50" />
      <div className="flex size-full">
        <LeftSidebar className="pt-36 max-sm:hidden" />
        <section className="mx-auto flex size-full flex-1 flex-col overflow-auto break-all px-6 pb-6 pt-36 max-md:pb-14 sm:px-14">
          {props.children}

          <GitLog className="mt-6" />
        </section>
        <RightSidebar
          className="pt-36 max-xl:hidden"
          getTagQuestionCount={getTagQuestionCount}
          hotQuestions={hotQuestions}
          popularTags={popularTags}
        />
      </div>
      {/* Toaster */}
    </div>
  );
};
