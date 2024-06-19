import { ESearchParamKey } from "@/search-params";
import { IComponentBaseProps, SearchInput, mp } from "@/shared";
import React from "react";

export interface IUIGlobalSearchProps extends IComponentBaseProps {}

export const GlobalSearch: React.FC<IUIGlobalSearchProps> = (props) => {
  return mp(
    props,
    <SearchInput
      placeholder="Search globally"
      searchParamKey={ESearchParamKey.GQ}
    />
  );
};
