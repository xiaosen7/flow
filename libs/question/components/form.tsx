"use client";
import { MarkdownEditor } from "@/markdown";
import {
  FormBuilder,
  IComponentBaseProps,
  IFormBuilderItems,
  IFormBuilderPropsOnSubmit,
  ITag,
  Input,
  cn,
  mp,
  useForm,
} from "@/shared";
import { ITagsEditorProps, TagsEditor } from "@/tag";
import React from "react";
import { QUESTION_SCHEMA } from "../constants";
import { IQuestionPostValue } from "../types";

export interface ICQuestionFormProps<TTag extends ITag>
  extends IComponentBaseProps {
  onSubmit: IFormBuilderPropsOnSubmit<IQuestionPostValue>;
  defaultValues?: IQuestionPostValue;
  isEdit?: boolean;
  getSubmitText?: (loading: boolean) => React.ReactNode;
  tagsEditor?: ITagsEditorProps<TTag>;
}

const getItems = <TTag extends ITag>(
  tagsEditor?: ITagsEditorProps<TTag>,
  isEdit?: boolean
) =>
  [
    {
      label: "Title",
      name: "title",
      description:
        "Be specific and imagine you're asking a question to another person.",
      renderControl: (field) => <Input {...field} />,
      required: true,
    },
    {
      label: "Tags",
      name: "tags",
      description:
        "Add up to 3 tags to describe what your question is about. You need to press enter to add a tag.",
      renderControl: (field) => (
        <TagsEditor {...field} disabled={isEdit} {...tagsEditor} max={3} />
      ),
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
  ] satisfies IFormBuilderItems<IQuestionPostValue>;

export const QuestionForm = <TTag extends ITag>(
  props: ICQuestionFormProps<TTag>
) => {
  const {
    isEdit,
    defaultValues = {
      explanation: "",
      tags: [] as string[],
      title: "",
    },
    tagsEditor,
    onSubmit,
    getSubmitText = (loading) =>
      loading
        ? isEdit
          ? "Saving..."
          : "Posting..."
        : isEdit
          ? "Save"
          : "Post",
  } = props;

  const form = useForm({
    schema: QUESTION_SCHEMA,
    defaultValues,
  });

  return mp(
    props,
    <FormBuilder<IQuestionPostValue>
      form={form}
      getSubmitText={getSubmitText}
      items={getItems(tagsEditor, isEdit)}
      onSubmit={onSubmit}
    />
  );
};
