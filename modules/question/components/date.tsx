import { IComponentBaseProps, IQuestion, formatDate, mp } from "@/shared";
import { ImageClock } from "@/shared/assets/icons/clock";
import React from "react";

export interface IQuestionDateProps extends IComponentBaseProps {
  variation?: "default" | "simple" | "with-icon";
  question: IQuestion;
}

export const QuestionDate: React.FC<IQuestionDateProps> = (props) => {
  const { question, variation = "default" } = props;
  return mp(
    props,
    <span className="small-regular text-dark400_light700 flex flex-wrap gap-1">
      {variation === "with-icon" && (
        <ImageClock
          className="invert-colors object-contain"
          width={16}
          height={16}
          alt="clock"
        />
      )}

      <span>
        {variation !== "simple" && "• asked"} {formatDate(question.createdAt)}
      </span>
    </span>
  );
};
