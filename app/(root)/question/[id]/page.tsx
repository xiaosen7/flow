import {
  ANSWER_FILTER_OPTIONS,
  ANSWER_SCHEMA,
  Answer,
  AnswerForm,
} from "@/answer";
import { MarkdownViewer } from "@/markdown";
import { prisma } from "@/prisma";
import {
  QuestionDate,
  QuestionMetrics,
  QuestionTitle,
  questionActions,
} from "@/question";
import { DownVote, Filter, UpVote } from "@/shared";
import { ImageClock } from "@/shared/assets/icons/clock";
import { imageStarFilledSrc } from "@/shared/assets/icons/star-filled";
import { imageStarRedSrc } from "@/shared/assets/icons/star-red";
import { Tags } from "@/tag";
import { UserAvatar } from "@/user";
import { userActions } from "@/user/actions";
import { NextPage } from "next";
import Image from "next/image";
import { z } from "zod";

export interface IQuestionDetailPageProps {
  params: { id: string };
}

const QuestionDetailPage: NextPage<IQuestionDetailPageProps> = async (
  props
) => {
  const { params } = props;
  const { id } = params;

  const user = await userActions.getCurrent();
  const question = await prisma.question.findUniqueOrThrow({
    where: {
      id,
    },
    include: {
      author: true,
      tags: true,
      upvotes: true,
      downvotes: true,
      answers: {
        include: {
          author: true,
          downvotes: true,
          upvotes: true,
        },
      },
    },
  });
  const { author, tags, answers, upvotes, downvotes } = question;
  const hasSaved = false;

  const onCreateAnswer = async ({ content }: z.infer<typeof ANSWER_SCHEMA>) => {
    "use server";

    await prisma.answer.create({
      data: {
        content: content,
        authorId: author.id,
        questionId: question.id,
      },
    });
  };

  const onUpVote = async (vote: boolean) => {
    "use server";
    vote
      ? questionActions.upVote(question)
      : questionActions.cancelUpVote(question);
  };

  const onDownVote = async (vote: boolean) => {
    "use server";
    vote
      ? questionActions.downVote(question)
      : questionActions.cancelDownVote(question);
  };

  const upVoted = !!(user && upvotes.find((x) => x.id === user.id));
  const downVoted = !!(user && downvotes.find((x) => x.id === user.id));

  return (
    <div>
      <div className="flex flex-wrap justify-between gap-4">
        <UserAvatar size="large" user={author} />

        <div className="flex gap-5">
          <UpVote
            count={question.upvotes.length}
            voted={upVoted}
            onChange={onUpVote}
          />

          <DownVote
            count={question.downvotes.length}
            voted={downVoted}
            onChange={onDownVote}
          />

          <Image
            src={hasSaved ? imageStarFilledSrc : imageStarRedSrc}
            width={18}
            height={18}
            alt="star"
            className="cursor-pointer"
          />
        </div>
      </div>

      <QuestionTitle className="mt-3.5" level={2} question={question} />

      <div className="mb-8 mt-5 flex flex-wrap gap-4">
        <span className="small-regular line-clamp-1 flex gap-1 max-sm:hidden">
          <ImageClock
            className="invert-colors object-contain"
            width={16}
            height={16}
            alt="clock"
          />

          <QuestionDate question={question} />
        </span>

        <QuestionMetrics answers={0} views={question.views} />
      </div>

      <MarkdownViewer value={question.content} />

      <Tags tags={tags} />

      <div className="mt-8 flex flex-wrap items-center justify-between">
        <h3 className="primary-text-gradient">{answers.length} Answers</h3>
        <Filter options={ANSWER_FILTER_OPTIONS} />
      </div>

      {answers.map((answer) => (
        <Answer
          key={answer.id}
          answer={answer}
          author={answer.author}
          downvotes={answer.downvotes}
          upvotes={answer.upvotes}
        />
      ))}

      <AnswerForm onSubmit={onCreateAnswer} />
    </div>
  );
};

export default QuestionDetailPage;
