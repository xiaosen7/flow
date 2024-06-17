"use client";
import { MarkdownEditor } from "@/markdown";
import {
  FormBuilder,
  IComponentBaseProps,
  IFormBuilderItems,
  IFormBuilderPropsOnSubmit,
  Input,
  cn,
  mp,
  useForm,
} from "@/shared";
import { TagsEditor } from "@/tag";
import React from "react";
import { QUESTION_SCHEMA } from "../constants";
import { IQuestionPostValue } from "../types";

export interface ICQuestionFormProps extends IComponentBaseProps {
  onSubmit: IFormBuilderPropsOnSubmit<IQuestionPostValue>;
}

const items: IFormBuilderItems<IQuestionPostValue> = [
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
    renderControl: (field) => (
      <MarkdownEditor {...field} className={cn("h-[300px]")} />
    ),
    required: true,
  },
  {
    label: "Tags",
    name: "tags",
    description:
      "Add up to 3 tags to describe what your question is about. You need to press enter to add a tag.",
    renderControl: (field) => <TagsEditor {...field} />,
    required: true,
  },
];

export const QuestionForm: React.FC<ICQuestionFormProps> = (props) => {
  const form = useForm({
    schema: QUESTION_SCHEMA,
    defaultValues: {
      explanation: "",
      tags: [] as string[],
      title: "",
    },
  });

  return mp(
    props,
    <FormBuilder<IQuestionPostValue>
      form={form}
      getSubmitText={(loading) => (loading ? "Posting..." : "Ask a Question")}
      items={items}
      onSubmit={props.onSubmit}
    />
  );
};
