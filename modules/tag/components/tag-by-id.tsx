import { prisma } from "@/prisma";
import { IComponentBaseProps, mergeClassAndStyleProps } from "@/shared";
import { CTag } from "./tag";

export interface ICTagByIdProps extends IComponentBaseProps {
  id: string;
}
export const CTagById = async (props: ICTagByIdProps) => {
  const { id } = props;
  const tag = await prisma.tag.findUniqueOrThrow({
    where: { id },
    include: {
      questions: true,
    },
  });

  return mergeClassAndStyleProps(props, <CTag tag={tag} />);
};
