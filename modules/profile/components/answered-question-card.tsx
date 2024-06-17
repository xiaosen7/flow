import { QuestionDate, QuestionMetrics } from "@/question";
import {
  IAnswer,
  IComponentBaseProps,
  IQuestion,
  IUser,
  formatDate,
  mp,
} from "@/shared";
import { ImageEdit } from "@/shared/assets/icons/edit";
import { ImageTrash } from "@/shared/assets/icons/trash";
import { UserAvatar } from "@/user";
import Link from "next/link";
import React from "react";

export interface IProfileAnsweredQuestionCardProps extends IComponentBaseProps {
  question: IQuestion;
  editable?: boolean;
  upVotes: number;
  user: IUser;
  answer: IAnswer;
}

export const ProfileAnsweredQuestionCard: React.FC<
  IProfileAnsweredQuestionCardProps
> = (props) => {
  const { question, user, editable, answer, upVotes } = props;
  return mp(
    props,
    <div className="card-wrapper rounded-[10px] px-11 py-9">
      <Link href={`/question/${question.id}/#${answer.id}`}>
        <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
          <div>
            <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
              {formatDate(question.createdAt)}
            </span>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
              {question.title}
            </h3>
          </div>

          {editable && (
            <div className="flex items-center justify-end gap-3 max-sm:w-full">
              <ImageEdit
                alt="Edit"
                width={14}
                height={14}
                className="cursor-pointer"
              />

              <ImageTrash
                alt="Delete"
                width={14}
                height={14}
                className="cursor-pointer"
              />
            </div>
          )}
        </div>

        <div className="flex-between mt-6 w-full flex-wrap gap-3">
          <UserAvatar
            user={user}
            extra={<QuestionDate question={question} />}
          />
          <QuestionMetrics votes={upVotes} />
        </div>
      </Link>
    </div>
  );
};
