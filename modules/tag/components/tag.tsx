import { IComponentBaseProps, mergeClassAndStyleProps } from "@/shared";
import Link from "next/link";
import { ITag } from "../types";
import { UITag } from "../ui";

export interface ICTagProps extends IComponentBaseProps {
  tag: ITag;
}
export const CTag = async (props: ICTagProps) => {
  const { tag } = props;

  return mergeClassAndStyleProps(
    props,
    <Link href={`/tag/${tag.id}`}>
      <UITag name={tag.name} />
    </Link>
  );
};
