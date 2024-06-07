import { IComponentBaseProps, SearchInput, mp } from "@/shared";
import React from "react";

export interface IGlobalSearchProps extends IComponentBaseProps {}

export const GlobalSearch: React.FC<IGlobalSearchProps> = (props) => {
  return mp(props, <SearchInput placeholder="Search globally" />);
};
