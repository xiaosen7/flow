"use server";

import { prisma } from "@/prisma";
import { IAnswer, IQuestion } from "@/shared";
import { userActions } from "@/user";
import { z } from "zod";
import { ANSWER_SCHEMA } from "../constants";

export async function create(
  question: IQuestion,
  values: z.infer<typeof ANSWER_SCHEMA>
) {
  const { content } = values;
  const user = await userActions.getCurrentOrRedirectSignIn();
  await prisma.answer.create({
    data: {
      content,
      authorId: user.id,
      questionId: question.id,
    },
  });
}

export async function update(
  answer: IAnswer,
  data: z.infer<typeof ANSWER_SCHEMA>
) {
  await prisma.answer.update({
    where: {
      id: answer.id,
    },
    data: {
      content: data.content,
    },
  });
}

export async function remove(answer: IAnswer) {
  await prisma.answer.delete({
    where: {
      id: answer.id,
    },
  });
}

export async function upVote(answer: IAnswer, vote: boolean) {
  const user = await userActions.getCurrentOrRedirectSignIn();

  vote && (await downVote(answer, false));
  await prisma.answer.update({
    where: {
      id: answer.id,
    },
    data: {
      upvotes: {
        [vote ? "connect" : "disconnect"]: {
          id: user.id,
        },
      },
    },
  });
}

export async function downVote(answer: IAnswer, vote: boolean) {
  const user = await userActions.getCurrentOrRedirectSignIn();

  vote && (await upVote(answer, false));
  await prisma.answer.update({
    where: {
      id: answer.id,
    },
    data: {
      downvotes: {
        [vote ? "connect" : "disconnect"]: {
          id: user.id,
        },
      },
    },
  });
}
