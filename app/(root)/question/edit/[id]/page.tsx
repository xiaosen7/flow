import { prisma } from "@/prisma";
import { QuestionForm, questionActions } from "@/question";
import { IPageProps } from "@/shared";
import { userActions } from "@/user";
import { redirect } from "next/navigation";
import React from "react";

const QuestionEditPage: React.FC<IPageProps<{ id: string }>> = async (
  props
) => {
  const {
    params: { id },
  } = props;
  const user = await userActions.getCurrentOrRedirectSignIn();
  const question = await prisma.question.findUniqueOrThrow({
    where: {
      id,
      authorId: user.id,
    },
    include: {
      tags: true,
    },
  });

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Edit Question</h1>
      <QuestionForm
        isEdit
        className="mt-9"
        defaultValues={{
          explanation: question.content,
          tags: question.tags.map((x) => x.name),
          title: question.title,
        }}
        onSubmit={async (values) => {
          "use server";
          await questionActions.update(question, values);
          redirect(`/question/${question.id}`);
        }}
      />
    </div>
  );
};

export default QuestionEditPage;
