"use client";
import { MarkdownEditor } from "@/markdown";
import {
  FormBuilder,
  IFormBuilderItems,
  IFormComponentProps,
  ITag,
  Input,
  cn,
  mp,
} from "@/shared";
import { ITagsEditorProps, TagsEditor } from "@/tag";
import { z } from "zod";
import { QUESTION_SCHEMA } from "../constants";

export interface IQuestionFormProps<TTag extends ITag>
  extends IFormComponentProps<typeof QUESTION_SCHEMA> {
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
  ] satisfies IFormBuilderItems<z.infer<typeof QUESTION_SCHEMA>>;

export const QuestionForm = <TTag extends ITag>(
  props: IQuestionFormProps<TTag>
) => {
  const { tagsEditor } = props;

  return mp(
    props,
    <FormBuilder
      items={getItems(tagsEditor, props.type === "edit")}
      schema={QUESTION_SCHEMA}
      topic="Question"
      {...props}
    />
  );
};
