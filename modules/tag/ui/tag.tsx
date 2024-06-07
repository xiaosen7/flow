import { Badge, IComponentBaseProps, mp } from "@/shared";

export interface IUITagProps extends IComponentBaseProps {
  showCount?: boolean;
  name: string;
  totalQuestions?: number;
}
export const UITag = (props: IUITagProps) => {
  const { name, showCount, totalQuestions } = props;
  return mp(
    props,
    <div className="flex justify-between gap-2">
      <Badge className="subtle-medium background-light800_dark300 text-light400_light500 rounded-md border-none px-4 py-2 uppercase shadow">
        {name}
      </Badge>

      {showCount && (
        <p className="small-medium text-dark500_light700">{totalQuestions}</p>
      )}
    </div>
  );
};
