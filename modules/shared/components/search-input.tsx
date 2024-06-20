"use client";
import { ESearchParamKey, patchSearchParams } from "@/search-params";
import { ImageSearch } from "@/shared/assets/icons/search";
import { useDebounceEffect, useMemoizedFn } from "ahooks";
import React, { useState } from "react";
import { IComponentBaseProps, Input, InputProps, mp, useNextRouter } from "..";

export interface ISearchInputProps
  extends IComponentBaseProps,
    Pick<InputProps, "onFocus"> {
  placeholder?: string;
  /**
   * @default ESearchParamKey.Q
   */
  searchParamKey?: ESearchParamKey;
}

export const SearchInput: React.FC<ISearchInputProps> = (props) => {
  const { placeholder, searchParamKey = ESearchParamKey.Q, onFocus } = props;
  const { router, pathname, searchParams } = useNextRouter();
  const [value, setValue] = useState(searchParams?.get(searchParamKey) ?? "");

  const onChange = useMemoizedFn(((e) => {
    setValue(e.target.value);
  }) satisfies InputProps["onChange"]);

  useDebounceEffect(() => {
    const newSearchParams = patchSearchParams(searchParams, {
      [searchParamKey]: value,
    });
    if (newSearchParams.toString() !== searchParams.toString()) {
      newSearchParams.delete(ESearchParamKey.Page); // means value changed, reset page
      router?.replace(`?${newSearchParams.toString()}`, {
        scroll: false,
      });
    }
  }, [searchParams, pathname, router, value]);

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
          onFocus={onFocus}
        />
      </div>
    </div>
  );
};
