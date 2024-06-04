import { mergeClassAndStyleProps } from "@/lib/utils";
import { IComponentBaseProps } from "@/types";
import Link from "next/link";
import React from "react";

export interface IQuestionAuthorProps extends IComponentBaseProps {
  name: string;
  avatarUrl: string;
  id: string;
  extra?: React.ReactNode;
}

export const QuestionAuthor: React.FC<IQuestionAuthorProps> = (props) => {
  const { name, avatarUrl, id, extra } = props;
  return mergeClassAndStyleProps(
    props,
    <Link href={`/profile/${id}`} className="flex items-center gap-1">
      <img
        className="invert-colors rounded-full object-contain"
        src={avatarUrl}
        alt="Author avatar"
        width={16}
        height={16}
      />
      <span className="body-medium text-dark400_light700">{name}</span>
      {extra}
    </Link>
  );
};
