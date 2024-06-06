import {
  IComponentBaseProps,
  SearchInput,
  mergeClassAndStyleProps,
} from "@/shared";
import React from "react";

export interface IGlobalSearchProps extends IComponentBaseProps {}

export const GlobalSearch: React.FC<IGlobalSearchProps> = (props) => {
  return mergeClassAndStyleProps(
    props,
    <SearchInput placeholder="Search globally" />
  );
};
