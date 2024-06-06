import { IComponentBaseProps, Input, mergeClassAndStyleProps } from "@/shared";
import { ImageSearch } from "@/shared/assets/icons/search";
import React from "react";

export interface ISearchInputProps extends IComponentBaseProps {
  placeholder?: string;
}

export const SearchInput: React.FC<ISearchInputProps> = (props) => {
  const { placeholder } = props;
  return mergeClassAndStyleProps(
    props,
    <div className="relative">
      <div className="background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4">
        <ImageSearch
          alt="Search"
          width={24}
          height={24}
          className="cursor-pointer"
        />

        <Input
          type="text"
          placeholder={placeholder}
          className="paragraph-regular no-focus placeholder border-none bg-inherit shadow-none outline-none"
        />
      </div>
    </div>
  );
};
