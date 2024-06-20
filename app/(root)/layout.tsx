import { DefaultLayout, IGlobalSearchProps } from "@/layout";
import { SearchUtil, prisma } from "@/prisma";
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

  const globalSearchApi: IGlobalSearchProps["api"] = async (types, value) => {
    "use server";
    types =
      types.length === 0
        ? [
            SearchUtil.kind.Question,
            SearchUtil.kind.Answer,
            SearchUtil.kind.Tag,
            SearchUtil.kind.User,
          ]
        : types;
    return (
      await Promise.all(
        types.map(async (type) => {
          const searchUtil = SearchUtil.create(type, {
            q: value,
            pageSize: "8",
          });
          return await searchUtil.globalSearch();
        })
      )
    ).flat();
  };

  return (
    <main className="background-light850_dark100">
      <DefaultLayout
        className="h-screen"
        getTagQuestionCount={(tag) =>
          (tag as (typeof popularTags)[0]).questions.length
        }
        globalSearch={{
          api: globalSearchApi,
        }}
        hotQuestions={hotQuestions}
        popularTags={popularTags}
      >
        {children}
      </DefaultLayout>
    </main>
  );
};

export default Layout;
