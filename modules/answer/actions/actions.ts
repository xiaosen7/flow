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
      content: content,
      authorId: user.id,
      questionId: questionId,
    },
  });
}

export async function upVote(answer: IAnswer) {
  const user = await userActions.getCurrentOrThrow();

  await cancelDownVote(answer);

  await prisma.answer.update({
    where: {
      id: answer.id,
    },
    data: {
      upvotes: {
        connect: {
          id: user.id,
        },
      },
    },
  });
}

export async function cancelUpVote(answer: IAnswer) {
  const user = await userActions.getCurrentOrThrow();

  await prisma.answer.update({
    where: {
      id: answer.id,
    },
    data: {
      upvotes: {
        disconnect: {
          id: user.id,
        },
      },
    },
  });
}

export async function downVote(answer: IAnswer) {
  const user = await userActions.getCurrentOrThrow();

  await cancelUpVote(answer);

  await prisma.answer.update({
    where: {
      id: answer.id,
    },
    data: {
      downvotes: {
        connect: {
          id: user.id,
        },
      },
    },
  });
}

export async function cancelDownVote(answer: IAnswer) {
  const user = await userActions.getCurrentOrThrow();

  await prisma.answer.update({
    where: {
      id: answer.id,
    },
    data: {
      downvotes: {
        disconnect: {
          id: user.id,
        },
      },
    },
  });
}
