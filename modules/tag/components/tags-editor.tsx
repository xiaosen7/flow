import { mergeClassAndStyleProps } from "@/lib/utils";
import { IComponentBaseProps, IControllableComponentProps } from "@/types";
import { ImageClose } from "@components/asset/icons/close";
import { Badge, Input, InputProps } from "@components/ui";
import { useControllableValue } from "ahooks";
import React from "react";

export interface ITagsEditorProps
  extends IComponentBaseProps,
    IControllableComponentProps<string[]> {
  disabled?: boolean;
}

export const TagsEditor: React.FC<ITagsEditorProps> = (props) => {
  const { disabled } = props;
  const [value = [], onChange] = useControllableValue<string[]>(props);

  const isExisted = (text: string) => {
    return [
      ...value.map((x) => x.toUpperCase()),
      ...value.map((x) => x.toLowerCase()),
    ].find((x) => x === text.toUpperCase() || x === text.toLowerCase());
  };

  const inputProps: InputProps = {
    onKeyDown(e) {
      if (e.key === "Enter") {
        e.preventDefault();

        const el = e.target as HTMLInputElement;
        const elValue = el.value.trim();
        if (elValue.length > 0 && !isExisted(elValue)) {
          onChange([...value, elValue]);
          el.value = "";
        }
      }
    },
  };

  const onRemove = (text: string) => {
    const newValue = value.filter((t) => t !== text);
    onChange(newValue);
  };

  return mergeClassAndStyleProps(
    props,
    <div>
      <Input
        disabled={disabled}
        className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
        placeholder="Add tags..."
        {...inputProps}
      />

      {value.length > 0 && (
        <div className="flex-start mt-2.5 flex-wrap gap-2.5">
          {value.map((text) => (
            <Badge
              key={text}
              className="subtle-medium background-light800_dark300 text-light400_light500 flex items-center justify-center gap-2 rounded-md border-none px-4 py-2 capitalize"
            >
              {text}
              <ImageClose
                alt="Close icon"
                width={12}
                height={12}
                className="cursor-pointer object-contain invert-0 dark:invert"
                onClick={() => onRemove(text)}
              />
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};
