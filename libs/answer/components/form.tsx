"use client";

import { MarkdownEditor } from "@/markdown";
import {
  FormBuilder,
  IComponentBaseProps,
  IFormBuilderItem,
  IFormBuilderPropsOnSubmit,
  mp,
  useForm,
} from "@/shared";
import React from "react";
import { z } from "zod";
import { ANSWER_SCHEMA } from "../constants";

export interface IAnswerFormProps extends IComponentBaseProps {
  onSubmit?: IFormBuilderPropsOnSubmit<z.infer<typeof ANSWER_SCHEMA>>;
  defaultValues?: z.infer<typeof ANSWER_SCHEMA>;
  getSubmitText?: (loading: boolean) => React.ReactNode;
  extra?: React.ReactNode;
}

const items: IFormBuilderItem<z.infer<typeof ANSWER_SCHEMA>>[] = [
  {
    name: "content",
    renderControl(field) {
      return <MarkdownEditor {...field} />;
    },
  },
];

export const AnswerForm: React.FC<IAnswerFormProps> = (props) => {
  const {
    defaultValues,
    onSubmit,
    getSubmitText = (loading) => (loading ? "Posting..." : "Post Answer"),
    extra,
  } = props;
  const form = useForm({
    schema: ANSWER_SCHEMA,
    defaultValues,
  });
  return mp(
    props,
    <FormBuilder
      extra={extra}
      form={form}
      getSubmitText={getSubmitText}
      items={items}
      submitAlign="right"
      onSubmit={onSubmit}
    />
  );
};
