import { IComponentBaseProps, ITag, mp } from "@/shared";
import Link from "next/link";
import React from "react";

export interface ITagCardProps extends IComponentBaseProps {
  tag: ITag;
  totalQuestions: number;
}

export const TagCard: React.FC<ITagCardProps> = (props) => {
  const { tag, totalQuestions } = props;
  return mp(
    props,
    <Link className="shadow-light100_darknone" href={`/tags/${tag.id}`}>
      <article className="background-light900_dark200 light-border flex w-full flex-col rounded-2xl border px-8 py-10 sm:w-[260px]">
        <div className="background-light800_dark400 w-fit rounded-sm px-5 py-1.5">
          <p className="paragraph-semibold text-dark300_light900">{tag.name}</p>
        </div>

        {tag.description && (
          <p className="small-regular text-dark500_light700 mt-4">
            {tag.description}
          </p>
        )}

        <p className="small-medium text-dark400_light500 mt-3.5">
          <span className="body-semibold primary-text-gradient mr-2.5">
            {totalQuestions}+
          </span>
          Questions
        </p>
      </article>
    </Link>
  );
};
