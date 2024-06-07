import { IComponentBaseProps, mp } from "@/shared";
import React from "react";

export interface IUIQuestionAuthorProps extends IComponentBaseProps {
  username: string;
  imageUrl: string;
  extra?: React.ReactNode;
}

export const UIQuestionAuthor: React.FC<IUIQuestionAuthorProps> = (props) => {
  const { username: name, imageUrl: avatarUrl, extra } = props;
  return mp(
    props,
    <div className="flex items-center gap-1">
      <img
        className="invert-colors rounded-full object-contain"
        src={avatarUrl}
        alt="Author avatar"
        width={16}
        height={16}
      />
      <span className="body-medium text-dark400_light700">{name}</span>
      {extra}
    </div>
  );
};
