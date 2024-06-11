import {
  Filter,
  IComponentBaseProps,
  IFilterProps,
  ISearchInputProps,
  SearchInput,
  mp,
} from "@/shared";
import React from "react";

export interface IListPageLayoutProps extends IComponentBaseProps {
  title: React.ReactNode;
  titleExtra?: React.ReactNode;
  search?: ISearchInputProps;
  filter?: IFilterProps;
  children?: React.ReactNode;
}

export const ListPageLayout: React.FC<IListPageLayoutProps> = (props) => {
  const { titleExtra, search, filter, children, title } = props;
  return mp(
    props,
    <div>
      <div className="flex w-full flex-col-reverse items-center justify-between gap-4 sm:flex-row">
        <h1 className="h1-bold text-dark100_light900">{title}</h1>

        {titleExtra}
      </div>

      <div className="mt-11 flex flex-wrap justify-between gap-5 max-sm:flex-col sm:items-center md:flex-col">
        {search &&
          mp(search, <SearchInput {...search} className="flex-1 md:w-full" />)}

        {filter && mp(filter, <Filter {...filter} className="md:w-full" />)}

        <div className="w-full">{children}</div>
      </div>
    </div>
  );
};
