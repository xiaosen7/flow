"use client";
import { ImageSearch } from "@/shared/assets/icons/search";
import { useDebounceEffect, useMemoizedFn } from "ahooks";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { IComponentBaseProps, Input, InputProps, mp, patchQuery } from "..";

export interface ISearchInputProps extends IComponentBaseProps {
  placeholder?: string;
}

export const SearchInput: React.FC<ISearchInputProps> = (props) => {
  const { placeholder } = props;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();
  const [value, setValue] = useState(searchParams?.get("q") ?? "");

  const onChange = useMemoizedFn(((e) => {
    setValue(e.target.value);
  }) satisfies InputProps["onChange"]);

  useDebounceEffect(() => {
    router.replace(pathname + "?" + patchQuery(queryString, "q", value));
  }, [queryString, pathname, router, value]);
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
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};
