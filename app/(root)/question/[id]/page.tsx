import { answerActions, questionActions, userActions } from "@/actions";
import { ANSWER_FILTER_OPTIONS, Answer, AnswerForm } from "@/answer";
import { MarkdownViewer } from "@/markdown";
import { SearchUtil, prisma } from "@/prisma";
import {
  Collect,
  QuestionDate,
  QuestionMetrics,
  QuestionTitle,
} from "@/question";
import {
  DownVote,
  EditAndDelete,
  Filter,
  IActionFn,
  IAnswer,
  IPageProps,
  PagePagination,
  ScrollIntoHashElement,
  UpVote,
} from "@/shared";
import { ac } from "@/shared/utils/action";
import { Tags } from "@/tag";
import { UserAvatar } from "@/user";
import { NextPage } from "next";
import { redirect } from "next/navigation";

export interface IQuestionDetailPageProps extends IPageProps<{ id: string }> {}

const QuestionDetailPage: NextPage<IQuestionDetailPageProps> = async (
  props
) => {
  const { params, searchParams } = props;
  const { id } = params;

  const user = await userActions.getCurrent();
  const answerSearchUtil = SearchUtil.create(
    SearchUtil.kind.Answer,
    searchParams
  );
  const [question, answers, answerCount] = await prisma.$transaction([
    prisma.question.update({
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
      },
    }),
    prisma.answer.findMany({
      include: {
        author: true,
        downvotes: true,
        upvotes: true,
      },
      ...answerSearchUtil.args,
      where: {
        ...answerSearchUtil.args.where,
        question: {
          id,
        },
      },
    }),
    prisma.answer.count({
      where: {
        ...answerSearchUtil.args.where,
        question: {
          id,
        },
      },
    }),
  ]);

  const { author, tags, upvotes, downvotes, collectors, views } = question;

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

      <div
        className="mt-8 flex flex-wrap items-center justify-between"
        id="answer-filter"
      >
        <h3 className="primary-text-gradient">{answerCount} Answers</h3>
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

      <PagePagination
        className="mt-10"
        hrefHash="answer-filter"
        total={answerCount}
      />

      <AnswerForm onSubmit={bindQuestionAction(answerActions.create)} />
      <ScrollIntoHashElement />
    </div>
  );
};

export default QuestionDetailPage;
