import { formatDate } from "@/formatter";
import { prisma } from "@/prisma";
import { IComponentBaseProps, mergeClassAndStyleProps } from "@/shared";
import { CTag } from "@/tag";
import Link from "next/link";
import React from "react";
import { UIQuestionAuthor, UIQuestionMetrics } from "../ui";

export interface IQuestionCardProps extends IComponentBaseProps {
  id: string;
}

export const CQuestionCard: React.FC<IQuestionCardProps> = async (props) => {
  const { id } = props;
  const question = await prisma.question.findUniqueOrThrow({
    where: {
      id,
    },
    include: {
      tags: true,
      author: true,
    },
  });

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
        {question.tags?.map((tag) => <CTag key={tag.tagId} id={tag.tagId} />)}
      </div>

      <div className="flex-between mt-6 w-full flex-wrap items-center gap-3 ">
        <Link href={`/profile/${id}`}>
          <UIQuestionAuthor
            username={question.author.username}
            imageUrl={question.author.imageUrl}
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
