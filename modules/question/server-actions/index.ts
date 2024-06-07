"use server";

import { prisma } from "@/prisma";
import { getCurrentUserOrThrow } from "@/shared";
import { RedirectType, redirect } from "next/navigation";
import { IQuestionPostValue } from "../types";

export const createQuestion = async (values: IQuestionPostValue) => {
  const user = await getCurrentUserOrThrow();

  const { tags: tagNames } = values;

  const question = await prisma.question.create({
    data: {
      content: values.explanation,
      title: values.title,
      downvotes: 0,
      upvotes: 0,
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
};
