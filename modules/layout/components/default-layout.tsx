import { GitLog, IComponentBaseProps, mp } from "@/shared";
import React from "react";

import { IGlobalSearchProps } from "./global-search";
import { LeftSidebar } from "./left-sidebar";
import { Navbar } from "./navbar";
import { IRightSidebarProps, RightSidebar } from "./right-sidebar";

export interface IDefaultLayoutProps
  extends IComponentBaseProps,
    IRightSidebarProps {
  children?: React.ReactNode;
  globalSearch: IGlobalSearchProps;
}

export const DefaultLayout: React.FC<IDefaultLayoutProps> = (props) => {
  const { getTagQuestionCount, hotQuestions, popularTags, globalSearch } =
    props;
  return mp(
    props,
    <div className="background-light850_dark100 flex flex-col">
      <Navbar globalSearch={globalSearch} />
      <div className="flex flex-1 overflow-hidden">
        <LeftSidebar className="h-full overflow-auto max-sm:hidden" />

        <section className="mx-auto flex size-full flex-1 flex-col overflow-auto break-all p-6 max-md:pb-14 sm:px-14">
          {props.children}
          <GitLog className="mt-6" />
        </section>

        <RightSidebar
          className="h-full overflow-auto max-xl:hidden"
          getTagQuestionCount={getTagQuestionCount}
          hotQuestions={hotQuestions}
          popularTags={popularTags}
        />
      </div>
      {/* Toaster */}
    </div>
  );
};
