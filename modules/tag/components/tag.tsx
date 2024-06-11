import { Badge, IComponentBaseProps, mp } from "@/shared";
import Link from "next/link";
import { ITag } from "../types";

export interface IUITagProps extends IComponentBaseProps {
  totalQuestions?: number;
  tag: ITag;
}
export const CTag = (props: IUITagProps) => {
  const { tag, totalQuestions } = props;
  return mp(
    props,
    <Link href={`/tag/${tag.id}`}>
      <div className="flex justify-between gap-2">
        <Badge>{tag.name}</Badge>

        {totalQuestions && (
          <p className="small-medium text-dark500_light700">{totalQuestions}</p>
        )}
      </div>
    </Link>
  );
};
