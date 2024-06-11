import { QUESTION_FILTER_OPTIONS } from "@/question/constants";
import { Button, Filter, IComponentBaseProps, mp } from "@/shared";
import React from "react";

export interface IUIQuestionFilterProps extends IComponentBaseProps {}

export const QuestionFilter: React.FC<IUIQuestionFilterProps> = (props) => {
  return mp(
    props,
    <>
      <Filter
        options={QUESTION_FILTER_OPTIONS}
        className="min-h-[56px] min-w-[170px] md:hidden"
      />

      <div className="mt-10 hidden w-full flex-wrap gap-3 md:flex">
        {QUESTION_FILTER_OPTIONS.map(({ label, value }) => (
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
