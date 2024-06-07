import { IComponentBaseProps, mergeClassAndStyleProps } from "@/shared";
import React from "react";
import { createQuestion } from "../server-actions";
import { UIQuestionForm } from "../ui";

export interface ICQuestionFormProps extends IComponentBaseProps {}

export const CQuestionForm: React.FC<ICQuestionFormProps> = (props) => {
  return mergeClassAndStyleProps(
    props,
    <UIQuestionForm onSubmit={createQuestion} />
  );
};
