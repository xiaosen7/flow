import { prisma } from "@/prisma";
import { IComponentBaseProps, mergeClassAndStyleProps } from "@/shared";
import React from "react";
import { CQuestionCard } from "./card";

export interface ICQuestionCardByIdProps extends IComponentBaseProps {
  id: string;
}

export const CQuestionCardById: React.FC<ICQuestionCardByIdProps> = async (
  props
) => {
  const { id } = props;
  const question = await prisma.question.findUniqueOrThrow({
    where: {
      id,
    },
    include: {
      tags: true,
      author: true,
    },
  });

  return mergeClassAndStyleProps(
    props,
    <CQuestionCard
      question={question}
      tags={question.tags}
      creator={question.author}
    />
  );
};
