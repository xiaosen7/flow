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
  onSubmit: IFormBuilderPropsOnSubmit<z.infer<typeof ANSWER_SCHEMA>>;
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
  const form = useForm({
    schema: ANSWER_SCHEMA,
    defaultValues: {
      content: "",
    },
  });
  return mp(
    props,
    <FormBuilder
      form={form}
      items={items}
      onSubmit={props.onSubmit}
      submitAlign="right"
      getSubmitText={(loading) => (loading ? "Posting..." : "Post Answer")}
    />
  );
};
