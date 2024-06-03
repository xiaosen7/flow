import { Filter } from "@components/shared";
import { Button } from "@components/ui";
import { mergeClassAndStyleProps } from "@lib/utils";
import { HOME_PAGE_FILTERS } from "@modules/flow-home/constants";
import { IComponentBaseProps } from "@types";
import React from "react";

export interface IResponsiveFilterProps extends IComponentBaseProps {}

export const HomeFilter: React.FC<IResponsiveFilterProps> = (props) => {
  return mergeClassAndStyleProps(
    props,
    <>
      <Filter
        options={HOME_PAGE_FILTERS}
        className="min-h-[56px] min-w-[170px] md:hidden"
      />

      <div className="mt-10 flex-wrap gap-3 hidden md:flex w-full">
        {HOME_PAGE_FILTERS.map(({ label, value }) => (
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
    </>
  );
};
