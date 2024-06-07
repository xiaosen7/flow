"use server";

import { prisma } from "@/prisma";
import { getCurrentUserOrThrow } from "@/shared";
import { ITag } from "@/tag";
import { RedirectType, redirect } from "next/navigation";
import { IQuestionPostValue } from "../types";

export const createQuestion = async (values: IQuestionPostValue) => {
  const user = await getCurrentUserOrThrow();

  const tags: ITag[] = [];
  const { tags: tagTexts } = values;
  for (const text of tagTexts) {
    let tag = await prisma.tag.findUnique({
      where: {
        name: text,
      },
    });

    if (!tag) {
      tag = await prisma.tag.create({
        data: {
          name: text,
          description: "",
        },
      });

      console.log(`create tag: ${tag.name}`);
    }

    tags.push(tag);
  }

  const question = await prisma.question.create({
    data: {
      content: values.explanation,
      title: values.title,
      downvotes: 0,
      upvotes: 0,
      views: 0,
      authorId: user.id,
    },
  });

  console.log(`create question: ${question.title}`);

  const createdTagsOnQuestions = await prisma.tagsOnQuestions.createMany({
    data: tags.map((tag) => ({ tagId: tag.id, questionId: question.id })),
  });

  console.log(`create tagsOnQuestions: ${createdTagsOnQuestions.count}`);

  redirect("/", RedirectType.push);
};
