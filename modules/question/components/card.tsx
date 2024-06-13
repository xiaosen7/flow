import {
  IComponentBaseProps,
  IQuestion,
  ITag,
  IUser,
  cn,
  mp,
  useMediaQuery,
} from "@/shared";
import { Tags } from "@/tag";
import { UserAvatar } from "@/user";
import React from "react";
import { QuestionDate } from "./date";
import { QuestionMetrics } from "./metrics";
import { QuestionTitle } from "./title";

export interface IQuestionCardProps extends IComponentBaseProps {
  question: IQuestion;
  tags: ITag[];
  creator: IUser;
  votes: number;
}

export const QuestionCard: React.FC<IQuestionCardProps> = (props) => {
  const { question, tags, creator, votes } = props;
  const mediaQuery = useMediaQuery();

  return mp(
    props,
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
      <QuestionDate
        variation="simple"
        className={cn(mediaQuery.isGreaterThanSM && "hidden")}
        question={question}
      />

      <QuestionTitle
        className="line-clamp-1"
        linkable
        question={question}
        level={3}
      />

      <Tags tags={tags} />

      <div className="flex-between mt-6 w-full flex-wrap items-center gap-3 ">
        <UserAvatar
          user={creator}
          extra={
            <QuestionDate
              className={cn(mediaQuery.isLessThanSM && "hidden")}
              question={question}
            />
          }
        />

        <QuestionMetrics answers={0} views={question.views} votes={votes} />
      </div>
    </div>
  );
};
