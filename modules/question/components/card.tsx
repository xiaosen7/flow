import { formatDate } from "@/formatter";
import { IComponentBaseProps, mergeClassAndStyleProps } from "@/shared";
import { Tag } from "@/tag";
import Link from "next/link";
import React from "react";
import { IQuestion } from "../types";
import { QuestionAuthor } from "./author";
import { QuestionMetrics } from "./metrics";

export interface IQuestionCardProps extends IComponentBaseProps {
  question: IQuestion;
}

export const QuestionCard: React.FC<IQuestionCardProps> = (props) => {
  const { question } = props;

  return mergeClassAndStyleProps(
    props,
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
      <span className="small-regular line-clamp-1 sm:hidden">
        {formatDate(question.createAt)}
      </span>

      <Link href={`/question/${question.id}`}>
        <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1">
          {question.title}
        </h3>
      </Link>

      <div className="mt-3.5 flex flex-wrap gap-2">
        {question.tags.map((tag) => (
          <Tag key={tag.id} {...tag} />
        ))}
      </div>

      <div className="flex-between mt-6 w-full flex-wrap items-center gap-3 ">
        <QuestionAuthor
          {...question.author}
          extra={
            <span className="small-regular line-clamp-1 max-sm:hidden">
              • asked {formatDate(question.createAt)}
            </span>
          }
        />

        <QuestionMetrics {...question.metrics} />
      </div>
    </div>
  );
};
