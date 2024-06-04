import { Badge } from "@components/ui";
import { mergeClassAndStyleProps } from "@lib/utils";
import { IComponentBaseProps } from "@types";
import Link from "next/link";

export interface ITagProps extends IComponentBaseProps {
  id: number;
  name: string;
  totalQuestions?: number;
  showCount?: boolean;
}
export const Tag = (props: ITagProps) => {
  const { id, name, totalQuestions, showCount } = props;
  return mergeClassAndStyleProps(
    props,
    <Link href={`/tags/${id}`} className="flex justify-between gap-2">
      <Badge className="subtle-medium background-light800_dark300 text-light400_light500 rounded-md border-none px-4 py-2 uppercase">
        {name}
      </Badge>

      {showCount && (
        <p className="small-medium text-dark500_light700">{totalQuestions}</p>
      )}
    </Link>
  );
};

export default Tag;
