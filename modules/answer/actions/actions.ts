"use server";

import { prisma } from "@/prisma";
import { IAnswer } from "@/shared";
import { userActions } from "@/user";
import { z } from "zod";
import { ANSWER_SCHEMA } from "../constants";

export async function create(
  questionId: string,
  values: z.infer<typeof ANSWER_SCHEMA>
) {
  const { content } = values;
  const user = await userActions.getCurrentOrThrow();
  await prisma.answer.create({
    data: {
      content,
      authorId: user.id,
      questionId: questionId,
    },
  });
}

export async function update(data: Pick<IAnswer, "id" | "content">) {
  await prisma.answer.update({
    where: {
      id: data.id,
    },
    data: {
      content: data.content,
    },
  });
  console.log(`updated answer ${data.id}`);
}

export async function remove(data: Pick<IAnswer, "id">) {
  await prisma.answer.delete({
    where: {
      id: data.id,
    },
  });
}

export async function upVote(answer: IAnswer, vote: boolean) {
  const user = await userActions.getCurrentOrThrow();

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
  const user = await userActions.getCurrentOrThrow();

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
