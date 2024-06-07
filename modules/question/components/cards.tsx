import { prisma } from "@/prisma";
import {
  IComponentBaseProps,
  NoResults,
  mergeClassAndStyleProps,
} from "@/shared";
import React from "react";
import { CQuestionCard } from "./card";

export interface ICQuestionCardsProps extends IComponentBaseProps {
  defaultPage?: number;
  defaultPageSize?: number;
}

export const CQuestionCards: React.FC<ICQuestionCardsProps> = async (props) => {
  //   const { defaultPage, defaultPageSize } = props;

  const questions = await prisma.question.findMany({
    include: {
      author: true,
      tags: true,
    },
  });

  return mergeClassAndStyleProps(
    props,
    <div className="mt-10 flex w-full flex-col gap-6">
      {questions.length > 0 ? (
        questions.map((question) => (
          <CQuestionCard
            key={question.id}
            question={question}
            creator={question.author}
            tags={question.tags}
          />
        ))
      ) : (
        <NoResults
          titleName="questions"
          description="Be the first to break the silence! 🚀 Ask a Question and kickstart the
          discussion. our query could be the next big thing others learn from. Get
          involved! 💡"
          link="/ask-question"
          linkTitle="Ask a Question"
        />
      )}
    </div>
  );
};
