import { Badge, IComponentBaseProps, ITag, mp } from "@/shared";
import Link from "next/link";

export interface ITagProps extends IComponentBaseProps {
  totalQuestions?: number;
  tag: ITag;
}
export const Tag = (props: ITagProps) => {
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
