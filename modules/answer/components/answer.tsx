"use client";
import { MarkdownViewer } from "@/markdown";
import {
  Button,
  DownVote,
  IAnswer,
  IComponentBaseProps,
  IDownVoteProps,
  IUpVoteProps,
  IUser,
  UpVote,
  formatDate,
  mp,
} from "@/shared";
import { ImageEdit } from "@/shared/assets/icons/edit";
import { ImageTrash } from "@/shared/assets/icons/trash";
import { UserAvatar } from "@/user";
import { useRequest } from "ahooks";
import React, { useState } from "react";
import { AnswerForm, IAnswerFormProps } from "./form";

export interface IAnswerProps extends IComponentBaseProps {
  answer: IAnswer;
  author: IUser;
  upVote?: IUpVoteProps;
  downVote?: IDownVoteProps;
  editable?: boolean;
  isEditState?: boolean;
  onAnswerSave?: IAnswerFormProps["onSubmit"];
  onDelete?: () => void | Promise<void>;
}

export const Answer: React.FC<IAnswerProps> = (props) => {
  const { author, upVote, downVote, editable, onAnswerSave, answer } = props;
  const [isEditState, setIsEditState] = useState(editable && props.isEditState);

  const { runAsync: onSubmitSave, loading } = useRequest(
    ((values) => {
      return Promise.resolve(onAnswerSave?.(values)).then(() =>
        setIsEditState(false)
      );
    }) satisfies IAnswerFormProps["onSubmit"],
    { manual: true }
  );

  return mp(
    props,
    <article className="light-border border-b py-10">
      <div className="mb-8 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
        <UserAvatar
          extra={
            <p className="small-regular text-light400_light500 ml-0.5 mt-0.5 line-clamp-1">
              <span className="max-sm:hidden">• answered </span>
              {formatDate(answer.createdAt)}
            </p>
          }
          user={author}
        />

        <div className="flex gap-5">
          {upVote && <UpVote {...upVote} />}
          {downVote && <DownVote {...downVote} />}
        </div>
      </div>

      {!isEditState && <MarkdownViewer value={answer.content} />}
      {isEditState && (
        <AnswerForm
          defaultValues={answer}
          extra={
            <Button
              disabled={loading}
              variant={"secondary"}
              onClick={() => setIsEditState(false)}
            >
              Cancel
            </Button>
          }
          getSubmitText={(loading) => (loading ? "Saving..." : "Save")}
          onSubmit={onSubmitSave}
        />
      )}

      {editable && !isEditState && (
        <div className="flex items-center justify-end gap-3 max-sm:w-full">
          <ImageEdit
            alt="Edit"
            className="cursor-pointer"
            height={14}
            width={14}
            onClick={() => setIsEditState(!isEditState)}
          />

          <ImageTrash
            alt="Delete"
            className="cursor-pointer"
            height={14}
            width={14}
            onClick={() => props.onDelete?.()}
          />
        </div>
      )}
    </article>
  );
};
