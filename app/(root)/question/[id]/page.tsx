import {
  ANSWER_FILTER_OPTIONS,
  ANSWER_SCHEMA,
  Answer,
  AnswerForm,
  answerActions,
} from "@/answer";
import { MarkdownViewer } from "@/markdown";
import { prisma } from "@/prisma";
import {
  Collect,
  QuestionDate,
  QuestionMetrics,
  QuestionTitle,
  questionActions,
} from "@/question";
import { DownVote, Filter, IAnswer, UpVote } from "@/shared";
import { Tags } from "@/tag";
import { UserAvatar } from "@/user";
import { userActions } from "@/user/actions";
import { NextPage } from "next";
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
  const question = await prisma.question.update({
    where: {
      id,
    },
    data: {
      views: {
        increment: 1,
      },
    },
    include: {
      author: true,
      tags: true,
      upvotes: true,
      downvotes: true,
      collectors: true,
      answers: {
        include: {
          author: true,
          downvotes: true,
          upvotes: true,
        },
      },
    },
  });

  const { author, tags, answers, upvotes, downvotes, collectors, views } =
    question;

  const onCreateAnswer = async ({ content }: z.infer<typeof ANSWER_SCHEMA>) => {
    "use server";

    await answerActions.create(question.id, { content });
  };

  const onUpVote = async (vote: boolean) => {
    "use server";
    return vote
      ? questionActions.upVote(question)
      : questionActions.cancelUpVote(question);
  };

  const onDownVote = async (vote: boolean) => {
    "use server";
    return vote
      ? questionActions.downVote(question)
      : questionActions.cancelDownVote(question);
  };

  const onUpVoteAnswer = async (vote: boolean, answer: IAnswer) => {
    "use server";
    return vote
      ? answerActions.upVote(answer)
      : answerActions.cancelUpVote(answer);
  };

  const onDownVoteAnswer = async (vote: boolean, answer: IAnswer) => {
    "use server";
    return vote
      ? answerActions.downVote(answer)
      : answerActions.cancelDownVote(answer);
  };

  const onCollectChange = async (collect: boolean) => {
    "use server";
    return collect
      ? questionActions.collect(question)
      : questionActions.cancelCollect(question);
  };

  const upVoted = !!(user && upvotes.find((x) => x.id === user.id));
  const downVoted = !!(user && downvotes.find((x) => x.id === user.id));
  const collected = !!(user && collectors.find((x) => x.id === user.id));

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

          <Collect collected={collected} onChange={onCollectChange} />
        </div>
      </div>

      <QuestionTitle className="mt-3.5" level={2} question={question} />

      <div className="mb-8 mt-5 flex flex-wrap gap-4">
        <QuestionDate variation="with-icon" question={question} />
        <QuestionMetrics answers={answers.length} views={views} />
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
          upVote={{
            count: answer.upvotes.length,
            voted: user
              ? !!answer.upvotes.find((x) => x.id === user.id)
              : false,
            onChange: async (vote) => {
              "use server";
              await onUpVoteAnswer(vote, answer);
            },
          }}
          downVote={{
            count: answer.downvotes.length,
            voted: user
              ? !!answer.downvotes.find((x) => x.id === user.id)
              : false,
            onChange: async (vote) => {
              "use server";
              await onDownVoteAnswer(vote, answer);
            },
          }}
        />
      ))}

      <AnswerForm onSubmit={onCreateAnswer} />
    </div>
  );
};

export default QuestionDetailPage;
