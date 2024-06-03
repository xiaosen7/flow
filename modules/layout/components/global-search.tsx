import { SearchInput } from "@components/shared";
import { mergeClassAndStyleProps } from "@lib/utils";
import { IComponentBaseProps } from "@types";
import React from "react";

export interface IGlobalSearchProps extends IComponentBaseProps {}

export const GlobalSearch: React.FC<IGlobalSearchProps> = (props) => {
  return mergeClassAndStyleProps(
    props,
    <SearchInput placeholder="Search globally" />
  );
};
