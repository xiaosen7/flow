import {
  IComponentBaseProps,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  mergeClassAndStyleProps,
} from "@/shared";
import React from "react";

export interface IFilterProps extends IComponentBaseProps {
  options: IFilterOption[];
  /**
   * @default "Select a filter"
   */
  placeholder?: React.ReactNode;
}

export interface IFilterOption {
  value: string;
  label: string;
}

export const Filter: React.FC<IFilterProps> = (props) => {
  return mergeClassAndStyleProps(
    props,
    <div>
      <Select>
        <SelectTrigger
          className={
            "no-focus body-regular light-border background-light800_dark300 text-dark500_light700 min-h-[56px] rounded-md border-0 px-5 py-2.5"
          }
        >
          <SelectValue placeholder={props.placeholder ?? "Select a filter"} />
        </SelectTrigger>
        <SelectContent className="text-dark500_light700 small-regular border-none bg-light-900 dark:bg-dark-300">
          {props.options.map((option) => (
            <SelectItem
              className="cursor-pointer focus:bg-light-800 dark:focus:bg-dark-400"
              key={option.value}
              value={option.value}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
