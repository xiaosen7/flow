import { SearchUtil, prisma } from "@/prisma";
import { QuestionList } from "@/question";
import { IPageProps, NoResults } from "@/shared";
import { Prisma } from "@prisma/client";
import React from "react";

const TagsDetailPage: React.FC<IPageProps<{ id: string }>> = async ({
  params: { id },
  searchParams,
}) => {
  const searchUtil = new SearchUtil(Prisma.ModelName.Question, searchParams);
  const [tag, questions, total] = await Promise.all([
    prisma.tag.findUniqueOrThrow({
      where: {
        id,
      },
    }),
    prisma.question.findMany({
      ...searchUtil.args,
      where: {
        ...searchUtil.args.where,
        tags: {
          some: {
            id,
          },
        },
      },
      include: {
        author: true,
        tags: true,
        upvotes: true,
      },
    }),
    prisma.question.count({
      where: {
        ...searchUtil.args.where,
        tags: {
          some: {
            id,
          },
        },
      },
    }),
  ]);
  return (
    <QuestionList
      empty={
        <NoResults
          description="It appears that there are no saved questions in your collection at the moment 😔.Start exploring and saving questions that pique your interest 🌟"
          link="/"
          linkTitle="Explore Questions"
          topic="Tag Questions"
        />
      }
      getAuthor={(question) => question.author}
      getTags={(question) => question.tags}
      getVotes={(question) => question.upvotes}
      questions={questions}
      search={{
        placeholder: "Search tag questions...",
      }}
      title={tag.name}
      total={total}
    />
  );
};

export default TagsDetailPage;
