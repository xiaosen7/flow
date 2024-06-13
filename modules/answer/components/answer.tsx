import { MarkdownViewer } from "@/markdown";
import {
  DownVote,
  IAnswer,
  IComponentBaseProps,
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
  upvotes: IUser[];
  downvotes: IUser[];
}

export const Answer: React.FC<IAnswerProps> = (props) => {
  const { answer, author, upvotes, downvotes } = props;
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

        <UpVote count={upvotes.length} />
        <DownVote count={downvotes.length} />
      </div>

      <MarkdownViewer value={answer.content} />
    </article>
  );
};
