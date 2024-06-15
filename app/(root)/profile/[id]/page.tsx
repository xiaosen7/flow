import { prisma } from "@/prisma";
import { IPageProps } from "@/shared";
import React from "react";

const ProFileDetailPage: React.FC<IPageProps<{ id: string }>> = async ({
  params: { id },
}) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id,
    },
    include: {
      questions: true,
      answers: true,
    },
  });
  return <>ProFileDetailPage</>;
};

export default ProFileDetailPage;
