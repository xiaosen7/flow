import { prisma } from "@/prisma";
import { IComponentBaseProps, mergeClassAndStyleProps } from "@/shared";
import Link from "next/link";
import { UITag } from "../ui";

export interface ICTagProps extends IComponentBaseProps {
  id: string;
  showCount?: boolean;
}
export const CTag = async (props: ICTagProps) => {
  const { id, showCount } = props;
  const tag = await prisma.tag.findUniqueOrThrow({
    where: { id },
    include: {
      questions: true,
    },
  });

  return mergeClassAndStyleProps(
    props,
    <Link href={`/tag/${id}`}>
      <UITag
        name={tag.name}
        totalQuestions={tag.questions.length}
        showCount={showCount}
      />
    </Link>
  );
};
