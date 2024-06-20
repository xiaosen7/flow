"use client";

import { ESearchParamKey, patchSearchParams } from "@/search-params";
import {
  IComponentBaseProps,
  ISafeAny,
  SearchInput,
  mp,
  useNextRouter,
} from "@/shared";
import { ImageTag } from "@/shared/assets/icons/tag";
import { Prisma } from "@prisma/client";
import { useClickAway, useMemoizedFn, useRequest } from "ahooks";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

type IGlobalSearchType = Prisma.ModelName;
const globalTypes: IGlobalSearchType[] = [
  Prisma.ModelName.Question,
  Prisma.ModelName.Answer,
  Prisma.ModelName.Tag,
  Prisma.ModelName.User,
];

export type IGlobalSearchResult = Array<{
  type: IGlobalSearchType;
  title: string;
  link: string;
  key: string;
}>;

export interface IGlobalSearchProps extends IComponentBaseProps {
  api: (
    types: IGlobalSearchType[],
    value: string
  ) => Promise<IGlobalSearchResult>;
}

export const GlobalSearch: React.FC<IGlobalSearchProps> = (props) => {
  const { api } = props;
  const { loading, data = [], run } = useRequest(api, { manual: true });
  const { searchParams, router } = useNextRouter();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  useClickAway(() => setOpen(false), containerRef);

  const types = new Set<IGlobalSearchType>(
    (searchParams.get(ESearchParamKey.GT)?.split(",") ?? []).filter(
      (x: ISafeAny) => globalTypes.includes(x)
    ) as unknown as IGlobalSearchType[]
  );
  const q = searchParams.get(ESearchParamKey.GQ);

  useEffect(() => {
    if (open && q) {
      run(Array.from(types), q);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, Array.from(types).join(","), open]);

  const onTypeClick = useMemoizedFn((type: IGlobalSearchType) => {
    if (types.has(type)) {
      types.delete(type);
    } else {
      types.add(type);
    }

    router?.replace(
      "?" +
        patchSearchParams(searchParams, {
          [ESearchParamKey.GT]: Array.from(types).join(","),
        }).toString(),
      {
        scroll: false,
      }
    );
  });

  return mp(
    props,
    <div ref={containerRef} className="relative">
      <SearchInput
        placeholder="Search globally"
        searchParamKey={ESearchParamKey.GQ}
        onFocus={() => setOpen(true)}
      />

      {open && (
        <div className="absolute top-full z-10 mt-3 w-full bg-light-800 py-5 shadow-sm dark:bg-dark-400 rounded-lg">
          <div className="flex items-baseline gap-5 px-5">
            <p className="text-dark400_light900 body-medium">Type:</p>
            <div className="flex flex-wrap gap-3">
              {globalTypes.map((type) => (
                <button
                  key={type}
                  className={`light-border-2 small-medium rounded-3xl px-5 py-2 capitalize dark:text-light-800 dark:hover:text-primary-500 ${
                    types.has(type)
                      ? "bg-primary-500 text-light-900"
                      : "bg-light-700 text-dark-400 hover:text-primary-500 dark:bg-dark-500"
                  }`}
                  type="button"
                  onClick={() => onTypeClick(type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
          <div className="my-5 h-px bg-light-700/50 dark:bg-dark-500/50" />
          <div className="space-y-5">
            <p className="text-dark400_light900 paragraph-semibold px-5">
              Top Match
            </p>
          </div>

          {loading ? (
            <div className="flex-center flex-col px-5">
              <svg
                className="my-2 size-10 animate-spin text-primary-500"
                fill="none"
                height="15"
                viewBox="0 0 15 15"
                width="15"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clip-rule="evenodd"
                  d="M1.84998 7.49998C1.84998 4.66458 4.05979 1.84998 7.49998 1.84998C10.2783 1.84998 11.6515 3.9064 12.2367 5H10.5C10.2239 5 10 5.22386 10 5.5C10 5.77614 10.2239 6 10.5 6H13.5C13.7761 6 14 5.77614 14 5.5V2.5C14 2.22386 13.7761 2 13.5 2C13.2239 2 13 2.22386 13 2.5V4.31318C12.2955 3.07126 10.6659 0.849976 7.49998 0.849976C3.43716 0.849976 0.849976 4.18537 0.849976 7.49998C0.849976 10.8146 3.43716 14.15 7.49998 14.15C9.44382 14.15 11.0622 13.3808 12.2145 12.2084C12.8315 11.5806 13.3133 10.839 13.6418 10.0407C13.7469 9.78536 13.6251 9.49315 13.3698 9.38806C13.1144 9.28296 12.8222 9.40478 12.7171 9.66014C12.4363 10.3425 12.0251 10.9745 11.5013 11.5074C10.5295 12.4963 9.16504 13.15 7.49998 13.15C4.05979 13.15 1.84998 10.3354 1.84998 7.49998Z"
                  fill="currentColor"
                  fill-rule="evenodd"
                />
              </svg>
              <p className="body-regular text-dark200_light800">
                Browsing the entire database...
              </p>
            </div>
          ) : (
            <div className="flex max-h-[60vh] flex-col gap-2 overflow-auto">
              {data.length > 0 ? (
                data.map((item) => (
                  <Link
                    key={item.key}
                    className="flex w-full cursor-pointer items-start gap-3 px-5 py-2.5 hover:bg-light-700/50 hover:dark:bg-dark-500/50"
                    href={item.link + "?" + searchParams.toString()}
                  >
                    <ImageTag
                      alt="tag"
                      className="invert-colors mt-1 object-contain"
                      height={18}
                      width={18}
                    />

                    <div className="flex flex-col">
                      <p className="body-medium text-dark200_light800 line-clamp-1">
                        {item.title}
                      </p>
                      <p className="text-light400_light500 small-medium mt-1 font-bold capitalize">
                        {item.type}
                      </p>
                    </div>
                  </Link>
                ))
              ) : (
                <div>
                  <div className="flex-center flex-col px-5">
                    <p className="text-dark200_light800 body-regular px-5 py-2.5">
                      No results found.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
