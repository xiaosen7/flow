import {
  ANSWER_FILTER_OPTIONS,
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
import { DownVote, Filter, IPageProps, UpVote } from "@/shared";
import { ac } from "@/shared/utils/action";
import { Tags } from "@/tag";
import { UserAvatar } from "@/user";
import { userActions } from "@/user/actions";
import { NextPage } from "next";
import { headers } from "next/headers";
headers;

export interface IQuestionDetailPageProps extends IPageProps<{ id: string }> {}

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
            onChange={ac(questionActions.upVote)
              .bindArgs(question)
              .revalidatePath(`/question/${id}`)}
          />

          <DownVote
            count={question.downvotes.length}
            voted={downVoted}
            onChange={ac(questionActions.downVote)
              .bindArgs(question)
              .revalidatePath(`/question/${id}`)}
          />

          <Collect
            collected={collected}
            onChange={ac(questionActions.collect)
              .bindArgs(question)
              .revalidatePath(`/question/${id}`)}
          />
        </div>
      </div>

      <QuestionTitle className="mt-3.5" level={2} question={question} />

      <div className="mb-8 mt-5 flex flex-wrap gap-4">
        <QuestionDate question={question} variation="with-icon" />
        <QuestionMetrics answers={answers.length} views={views} />
      </div>

      <MarkdownViewer value={question.content} />

      <Tags tags={tags} />

      <div className="mt-8 flex flex-wrap items-center justify-between">
        <h3 className="primary-text-gradient">{answers.length} Answers</h3>
        <Filter options={ANSWER_FILTER_OPTIONS} />
      </div>

      {answers.map((answer) => {
        const editable = answer.authorId === user?.id;
        return (
          <Answer
            key={answer.id}
            answer={answer}
            author={answer.author}
            downVote={{
              count: answer.downvotes.length,
              voted: user
                ? !!answer.downvotes.find((x) => x.id === user.id)
                : false,
              onChange: ac(answerActions.downVote)
                .bindArgs(answer)
                .revalidatePath(`/question/${id}`),
            }}
            editable={editable}
            upVote={{
              count: answer.upvotes.length,
              voted: user
                ? !!answer.upvotes.find((x) => x.id === user.id)
                : false,
              onChange: ac(answerActions.upVote)
                .bindArgs(answer)
                .revalidatePath(`/question/${id}`),
            }}
            onAnswerSave={ac(answerActions.update)
              .bindObjectArgs({
                id: answer.id,
              })
              .revalidatePath(`/question/${id}`)}
            onDelete={ac(answerActions.remove)
              .bindObjectArgs({
                id: answer.id,
              })
              .revalidatePath(`/question/${id}`)}
          />
        );
      })}

      <AnswerForm
        onSubmit={ac(answerActions.create)
          .bindArgs(question.id)
          .revalidatePath(`/question/${id}`)}
      />
    </div>
  );
};

export default QuestionDetailPage;
