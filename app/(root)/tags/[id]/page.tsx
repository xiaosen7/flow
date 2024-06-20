import { prisma } from "@/prisma";
import { QuestionList } from "@/question";
import { IPageProps, NoResults } from "@/shared";
import Link from "next/link";
import React from "react";

const TagsDetailPage: React.FC<IPageProps<{ id: string }>> = async ({
  params: { id },
  searchParams,
}) => {
  const [tag, { items: questions, total }] = await Promise.all([
    prisma.tag.findUniqueOrThrow({
      where: {
        id,
      },
    }),
    prisma.question.search({
      where: {
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
      searchParams,
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
      title={<Link href={`/tags/${tag.id}`}>{tag.name}</Link>}
      total={total}
    />
  );
};

export default TagsDetailPage;
