import { ISearchParams } from "@/search-params";
import React from "react";
import { FieldValues } from "react-hook-form";
import { IFormBuilderProps } from "../components";

export interface IComponentBaseProps {
  className?: string;
  style?: React.CSSProperties;
}

export interface IControllableComponentProps<TValue> {
  value?: TValue;
  defaultValue?: TValue;
  onChange?: (value: TValue) => void;
  disabled?: boolean;
}

export interface IPageProps<TParams = {}, TSearchParams = {}> {
  params: TParams;
  searchParams: ISearchParams & TSearchParams;
}

export interface IFormComponentProps<TValues extends FieldValues>
  extends Omit<IFormBuilderProps<TValues>, "items" | "form"> {}
