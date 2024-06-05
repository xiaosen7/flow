"use client";
import { mergeClassAndStyleProps } from "@/lib/utils";
import { IComponentBaseProps } from "@/types";
import { Input } from "@components/ui";
import { FormLayout, IFormItems, useForm } from "@modules/form";
import { TagsEditor } from "@modules/tag";
import React from "react";
import { QUESTION_SCHEMA } from "../constants";
import { IQuestionPostValue } from "../types";
import { ExplanationEditor } from "./explanation-editor";

export interface IQuestionFormProps extends IComponentBaseProps {}

const items: IFormItems<IQuestionPostValue> = [
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
    renderControl: (field) => <ExplanationEditor {...field} />,
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

export const QuestionForm: React.FC<IQuestionFormProps> = (props) => {
  const form = useForm({
    schema: QUESTION_SCHEMA,
    defaultValues: {
      explanation: "",
      tags: [] as string[],
      title: "",
    },
  });

  const onSubmit = async (values: IQuestionPostValue) => {
    console.log(values);
  };

  return mergeClassAndStyleProps(
    props,
    <FormLayout<IQuestionPostValue>
      items={items}
      form={form}
      onSubmit={onSubmit}
      getSubmitText={(loading) => (loading ? "Posting..." : "Ask a Question")}
    />
  );
};
