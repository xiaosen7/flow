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
import {
  DownVote,
  EditAndDelete,
  Filter,
  IActionFn,
  IAnswer,
  IPageProps,
  UpVote,
} from "@/shared";
import { ac } from "@/shared/utils/action";
import { Tags } from "@/tag";
import { UserAvatar } from "@/user";
import { userActions } from "@/user/actions";
import { NextPage } from "next";
import { redirect } from "next/navigation";

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

  const bindQuestionAction = (actionFn: IActionFn) => {
    return ac(actionFn)
      .bindArgs(question)
      .bindRevalidatePath(`/question/${id}`);
  };

  const onDelete = async () => {
    "use server";
    await prisma.question.delete({
      where: {
        id: question.id,
      },
    });

    redirect("/");
  };

  const onEdit = async () => {
    "use server";
    redirect(`/question/edit/${question.id}`);
  };

  const bindAnswerAction = (actionFn: IActionFn, answer: IAnswer) => {
    return ac(actionFn).bindArgs(answer).bindRevalidatePath(`/question/${id}`);
  };

  const editable = user?.id === author.id;

  return (
    <div>
      <div className="flex flex-wrap justify-between gap-4">
        <UserAvatar size="large" user={author} />

        <div className="flex gap-5">
          <UpVote
            count={question.upvotes.length}
            voted={upVoted}
            onChange={bindQuestionAction(questionActions.upVote)}
          />

          <DownVote
            count={question.downvotes.length}
            voted={downVoted}
            onChange={bindQuestionAction(questionActions.downVote)}
          />

          <Collect
            collected={collected}
            onChange={bindQuestionAction(questionActions.collect)}
          />
        </div>
      </div>

      <QuestionTitle className="mt-3.5" level={2} question={question} />

      <div className="mb-8 mt-5 flex flex-wrap gap-4">
        <QuestionDate question={question} variation="with-icon" />
        <QuestionMetrics answers={answers.length} views={views} />
      </div>

      <MarkdownViewer value={question.content} />

      <div className="mt-3.5 flex justify-between gap-6 max-sm:flex-col">
        <Tags tags={tags} />
        {editable && (
          <EditAndDelete
            className="h-[30px]"
            onDelete={onDelete}
            onEdit={onEdit}
          />
        )}
      </div>

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
              onChange: bindAnswerAction(answerActions.downVote, answer),
            }}
            editable={editable}
            id={`answer_${answer.id}`}
            upVote={{
              count: answer.upvotes.length,
              voted: user
                ? !!answer.upvotes.find((x) => x.id === user.id)
                : false,
              onChange: bindAnswerAction(answerActions.upVote, answer),
            }}
            onAnswerSave={bindAnswerAction(answerActions.update, answer)}
            onDelete={bindAnswerAction(answerActions.remove, answer)}
          />
        );
      })}

      <AnswerForm onSubmit={bindQuestionAction(answerActions.create)} />
    </div>
  );
};

export default QuestionDetailPage;
