import { ISearchParams } from "@/search-params";
import React from "react";

export interface IComponentBaseProps {
  className?: string;
  style?: React.CSSProperties;
}

export interface IControllableComponentProps<TValue> {
  value?: TValue;
  defaultValue?: TValue;
  onChange?: (value: TValue) => void;
}

export interface IPageProps<TParams = {}, TSearchParams = {}> {
  params: TParams;
  searchParams: ISearchParams & TSearchParams;
}
