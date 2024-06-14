"use server";

import { prisma } from "@/prisma";
import { IQuestion } from "@/shared";
import { userActions } from "@/user";
import { RedirectType, redirect } from "next/navigation";
import { z } from "zod";
import { QUESTION_SCHEMA } from "../constants";

export async function create(values: z.infer<typeof QUESTION_SCHEMA>) {
  const user = await userActions.getCurrentOrThrow();

  const { tags: tagNames } = values;

  const question = await prisma.question.create({
    data: {
      content: values.explanation,
      title: values.title,
      views: 0,
      authorId: user.id,
      tags: {
        connectOrCreate: tagNames.map((name) => ({
          where: {
            name,
          },
          create: {
            name,
            description: "",
          },
        })),
      },
    },
  });

  console.log(`create question: ${question.title}`);

  redirect("/", RedirectType.push);
}

export async function upVote(question: IQuestion, vote: boolean) {
  const user = await userActions.getCurrentOrThrow();

  vote && (await downVote(question, false));

  await prisma.question.update({
    where: {
      id: question.id,
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

export async function downVote(question: IQuestion, vote: boolean) {
  const user = await userActions.getCurrentOrThrow();

  vote && (await upVote(question, false));

  await prisma.question.update({
    where: {
      id: question.id,
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

export async function collect(question: IQuestion, collect: boolean) {
  const user = await userActions.getCurrentOrThrow();

  await prisma.question.update({
    where: {
      id: question.id,
    },
    data: {
      collectors: {
        [collect ? "connect" : "disconnect"]: {
          id: user.id,
        },
      },
    },
  });
}

export async function getCollected() {
  const user = await userActions.getCurrentOrThrow();
  return (
    await prisma.user.findUniqueOrThrow({
      where: {
        id: user.id,
      },
      include: {
        collections: {
          include: {
            author: true,
            tags: true,
            upvotes: true,
          },
        },
      },
    })
  ).collections;
}
