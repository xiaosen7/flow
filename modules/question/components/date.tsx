import { IComponentBaseProps, IQuestion, formatDate, mp } from "@/shared";
import React from "react";

export interface IQuestionDateProps extends IComponentBaseProps {
  variation?: "default" | "simple";
  question: IQuestion;
}

export const QuestionDate: React.FC<IQuestionDateProps> = (props) => {
  const { question, variation = "default" } = props;
  return mp(
    props,
    <span className="small-regular text-dark400_light700">
      {variation !== "simple" && "• asked"} {formatDate(question.createdAt)}
    </span>
  );
};
