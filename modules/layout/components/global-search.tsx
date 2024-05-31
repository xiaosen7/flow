import { Input } from "@/components/ui/input";
import { mergeClassAndStyleProps } from "@/lib/utils";
import { IComponentBaseProps } from "@/types/component";
import Image from "next/image";
import React from "react";

export interface IGlobalSearchProps extends IComponentBaseProps {}

export const GlobalSearch: React.FC<IGlobalSearchProps> = (props) => {
  return mergeClassAndStyleProps(
    props,
    <div className="relative w-full max-w-[600px]">
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
          placeholder="Search globally"
          className="paragraph-regular no-focus placeholder background-light800_darkgradient border-none shadow-none outline-none"
        />
      </div>
    </div>
  );
};
