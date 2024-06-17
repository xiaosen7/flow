import { DefaultLayout } from "@/layout";
import { prisma } from "@/prisma";
import React from "react";

interface ILayoutProps extends React.PropsWithChildren {}

const Layout: React.FC<ILayoutProps> = async ({ children }) => {
  const hotQuestions = await prisma.question.findMany({
    orderBy: [
      {
        views: "desc",
      },
      {
        upvotes: {
          _count: "desc",
        },
      },
    ],
    take: 5,
  });
  const popularTags = await prisma.tag.findMany({
    take: 5,
    orderBy: {
      questions: {
        _count: "desc",
      },
    },
    include: {
      questions: true,
    },
  });

  return (
    <main className="background-light850_dark100">
      <DefaultLayout
        className="h-screen"
        getTagQuestionCount={(tag) =>
          (tag as (typeof popularTags)[0]).questions.length
        }
        hotQuestions={hotQuestions}
        popularTags={popularTags}
      >
        {children}
      </DefaultLayout>
    </main>
  );
};

export default Layout;
