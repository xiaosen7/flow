import { Input } from "@components/ui";
import { mergeClassAndStyleProps } from "@lib/utils";
import { IComponentBaseProps } from "@types";
import Image from "next/image";
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
        <Image
          src="/assets/icons/search.svg"
          alt="Search"
          width={24}
          height={24}
          className="cursor-pointer"
        />

        <Input
          type="text"
          placeholder={placeholder}
          className="paragraph-regular no-focus bg-inherit placeholder border-none shadow-none outline-none"
        />
      </div>
    </div>
  );
};
