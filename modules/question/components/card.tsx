import {
  IComponentBaseProps,
  IQuestion,
  ITag,
  IUser,
  formatDate,
  mp,
} from "@/shared";
import { Tag } from "@/tag";
import Link from "next/link";
import React from "react";
import { QuestionAuthor } from "./author";
import { QuestionMetrics } from "./metrics";

export interface IQuestionCardProps extends IComponentBaseProps {
  question: IQuestion;
  tags: ITag[];
  creator: IUser;
}

export const QuestionCard: React.FC<IQuestionCardProps> = (props) => {
  const { question, tags, creator } = props;

  return mp(
    props,
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
      <span className="small-regular line-clamp-1 sm:hidden">
        {formatDate(question.createdAt)}
      </span>

      <Link href={`/question/${question.id}`}>
        <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1">
          {question.title}
        </h3>
      </Link>

      <div className="mt-3.5 flex flex-wrap gap-2">
        {tags?.map((tag) => <Tag key={tag.id} tag={tag} />)}
      </div>

      <div className="flex-between mt-6 w-full flex-wrap items-center gap-3 ">
        <Link href={`/profile/${creator.id}`}>
          <QuestionAuthor
            username={creator.username}
            imageUrl={creator.imageUrl}
            extra={
              <span className="small-regular line-clamp-1 max-sm:hidden">
                • asked {formatDate(question.createdAt)}
              </span>
            }
          />
        </Link>

        <QuestionMetrics
          answers={0}
          views={question.views}
          votes={question.upvotes}
        />
      </div>
    </div>
  );
};
