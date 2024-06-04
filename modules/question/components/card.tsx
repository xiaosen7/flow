import { mergeClassAndStyleProps } from "@/lib/utils";
import { IComponentBaseProps } from "@/types";
import React from "react";

export interface IQuestionCardProps extends IComponentBaseProps {}

export const QuestionCard: React.FC<IQuestionCardProps> = (props) => {
  return mergeClassAndStyleProps(props, <div>QuestionCard</div>);
};
