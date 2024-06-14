import { MarkdownViewer } from "@/markdown";
import {
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
import { UserAvatar } from "@/user";
import React from "react";

export interface IAnswerProps extends IComponentBaseProps {
  answer: IAnswer;
  author: IUser;
  upVote: IUpVoteProps;
  downVote: IDownVoteProps;
}

export const Answer: React.FC<IAnswerProps> = (props) => {
  const { answer, author, upVote, downVote } = props;
  return mp(
    props,
    <article key={answer.id} className="light-border border-b py-10">
      <div className="mb-8 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
        <UserAvatar
          user={author}
          extra={
            <p className="small-regular text-light400_light500 ml-0.5 mt-0.5 line-clamp-1">
              <span className="max-sm:hidden">• answered </span>
              {formatDate(answer.createdAt)}
            </p>
          }
        />

        <div className="flex gap-5">
          <UpVote {...upVote} />
          <DownVote {...downVote} />
        </div>
      </div>

      <MarkdownViewer value={answer.content} />
    </article>
  );
};
