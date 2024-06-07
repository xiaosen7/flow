import { formatDate } from "@/formatter";
import { IComponentBaseProps, mergeClassAndStyleProps } from "@/shared";
import { CTag, ITag } from "@/tag";
import { IUser } from "@/user";
import Link from "next/link";
import React from "react";
import { IQuestion } from "../types";
import { UIQuestionAuthor, UIQuestionMetrics } from "../ui";

export interface IQuestionCardProps extends IComponentBaseProps {
  question: IQuestion;
  tags: ITag[];
  creator: IUser;
}

export const CQuestionCard: React.FC<IQuestionCardProps> = async (props) => {
  const { question, tags, creator } = props;

  return mergeClassAndStyleProps(
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
        {tags?.map((tag) => <CTag key={tag.id} tag={tag} />)}
      </div>

      <div className="flex-between mt-6 w-full flex-wrap items-center gap-3 ">
        <Link href={`/profile/${creator.id}`}>
          <UIQuestionAuthor
            username={creator.username}
            imageUrl={creator.imageUrl}
            extra={
              <span className="small-regular line-clamp-1 max-sm:hidden">
                • asked {formatDate(question.createdAt)}
              </span>
            }
          />
        </Link>

        <UIQuestionMetrics
          answers={0}
          views={question.views}
          votes={question.upvotes}
        />
      </div>
    </div>
  );
};
