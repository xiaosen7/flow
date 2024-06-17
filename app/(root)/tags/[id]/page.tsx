import { prisma } from "@/prisma";
import { QuestionList } from "@/question";
import { IPageProps, NoResults } from "@/shared";
import React from "react";

const TagsDetailPage: React.FC<IPageProps<{ id: string }>> = async ({
  params: { id },
}) => {
  const tag = await prisma.tag.findUniqueOrThrow({
    where: {
      id,
    },
    include: {
      questions: {
        include: {
          author: true,
          tags: true,
          upvotes: true,
        },
      },
    },
  });
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
      questions={tag.questions}
      search={{
        placeholder: "Search tag questions...",
      }}
      title={tag.name}
    />
  );
};

export default TagsDetailPage;
