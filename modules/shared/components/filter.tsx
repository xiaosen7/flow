import React from "react";
import { IComponentBaseProps } from "../types";
import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui";
import { cn, mp } from "../utils";

export interface IFilterProps extends IComponentBaseProps {
  options: IFilterOption[];
  /**
   * @default "Select a filter"
   */
  placeholder?: React.ReactNode;
  variation?: "tags" | "default";
}

export interface IFilterOption {
  value: string;
  label: string;
}

export const Filter: React.FC<IFilterProps> = (props) => {
  const { variation = "default" } = props;
  return mp(
    props,
    <div>
      <div
        className={cn(
          "min-h-[56px] min-w-[170px]",
          variation === "tags" && "hidden"
        )}
      >
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

      <div
        className={cn(
          "w-full flex-wrap gap-3 flex",
          variation === "default" && "hidden"
        )}
      >
        {props.options.map(({ label, value }) => (
          <Button
            key={value}
            className={`body-medium rounded-lg px-6 py-3 capitalize shadow-none ${
              "" === value
                ? "bg-primary-100 text-primary-500 dark:bg-dark-400 dark:hover:bg-dark-400"
                : "bg-light-800 text-light-500 hover:bg-light-800 dark:bg-dark-300 dark:text-light-500 dark:hover:bg-dark-300"
            }`}
          >
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
};
