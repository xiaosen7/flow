import { ImageSearch } from "@/shared/assets/icons/search";
import React from "react";
import { IComponentBaseProps, Input, mp } from "..";

export interface ISearchInputProps extends IComponentBaseProps {
  placeholder?: string;
}

export const SearchInput: React.FC<ISearchInputProps> = (props) => {
  const { placeholder } = props;
  return mp(
    props,
    <div className="relative">
      <div className="background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4">
        <ImageSearch
          alt="Search"
          className="cursor-pointer"
          height={24}
          width={24}
        />

        <Input
          className="paragraph-regular no-focus placeholder border-none bg-inherit shadow-none outline-none"
          placeholder={placeholder}
          type="text"
        />
      </div>
    </div>
  );
};
