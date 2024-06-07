"use client";
import {
  IUIFormItems,
  IUIFormLayoutPropsOnSubmit,
  UIFormLayout,
  useForm,
} from "@/form";
import { IComponentBaseProps, Input, mergeClassAndStyleProps } from "@/shared";
import { UITagsEditor } from "@/tag";
import React from "react";
import { QUESTION_SCHEMA } from "../constants";
import { IQuestionPostValue } from "../types";
import { UIExplanationEditor } from "./explanation-editor";

export interface IUIQuestionFormProps extends IComponentBaseProps {
  onSubmit: IUIFormLayoutPropsOnSubmit<IQuestionPostValue>;
}

const items: IUIFormItems<IQuestionPostValue> = [
  {
    label: "Title",
    name: "title",
    description:
      "Be specific and imagine you're asking a question to another person.",
    renderControl: (field) => <Input {...field} />,
    required: true,
  },
  {
    label: "Explanation",
    name: "explanation",
    description:
      " Introduces the problem and expand on what you put in the title. Minimum 20 characters.",
    renderControl: (field) => <UIExplanationEditor {...field} />,
    required: true,
  },
  {
    label: "Tags",
    name: "tags",
    description:
      "Add up to 3 tags to describe what your question is about. You need to press enter to add a tag.",
    renderControl: (field) => <UITagsEditor {...field} />,
    required: true,
  },
];

export const UIQuestionForm: React.FC<IUIQuestionFormProps> = (props) => {
  const form = useForm({
    schema: QUESTION_SCHEMA,
    defaultValues: {
      explanation: "",
      tags: [] as string[],
      title: "",
    },
  });

  return mergeClassAndStyleProps(
    props,
    <UIFormLayout<IQuestionPostValue>
      items={items}
      form={form}
      onSubmit={props.onSubmit}
      getSubmitText={(loading) => (loading ? "Posting..." : "Ask a Question")}
    />
  );
};
