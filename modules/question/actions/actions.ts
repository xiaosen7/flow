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

export async function upVote(question: IQuestion) {
  const user = await userActions.getCurrentOrThrow();

  await cancelDownVote(question);

  await prisma.question.update({
    where: {
      id: question.id,
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

export async function cancelUpVote(question: IQuestion) {
  const user = await userActions.getCurrentOrThrow();

  await prisma.question.update({
    where: {
      id: question.id,
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

export async function downVote(question: IQuestion) {
  const user = await userActions.getCurrentOrThrow();

  await cancelUpVote(question);

  await prisma.question.update({
    where: {
      id: question.id,
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

export async function cancelDownVote(question: IQuestion) {
  const user = await userActions.getCurrentOrThrow();

  await prisma.question.update({
    where: {
      id: question.id,
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

export async function collect(question: IQuestion) {
  const user = await userActions.getCurrentOrThrow();

  await prisma.question.update({
    where: {
      id: question.id,
    },
    data: {
      collectors: {
        connect: {
          id: user.id,
        },
      },
    },
  });
}

export async function cancelCollect(question: IQuestion) {
  const user = await userActions.getCurrentOrThrow();

  await prisma.question.update({
    where: {
      id: question.id,
    },
    data: {
      collectors: {
        disconnect: {
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
