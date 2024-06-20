export {};

import { isString } from "lodash-es";
import { ESearchParamKey } from "../constants";
import { ISearchParams } from "../types";

function patchSearchParams(
  searchParams: URLSearchParams,
  query: Partial<Record<ESearchParamKey, string>>
): URLSearchParams;
function patchSearchParams(
  searchParams: URLSearchParams,
  name: ESearchParamKey,
  value: string
): URLSearchParams;
function patchSearchParams(
  params: URLSearchParams = new URLSearchParams(),
  name: string | Record<string, string>,
  value?: string
) {
  if (typeof URLSearchParams === "undefined") {
    return params?.toString() ?? "";
  }

  const searchParams = new URLSearchParams(params?.toString() ?? "");

  if (isString(name)) {
    if (value) {
      searchParams.set(name, value);
    } else {
      searchParams.delete(name);
    }
  } else {
    Object.entries(name).forEach(([name, value]) => {
      if (value) {
        searchParams.set(name, value);
      } else {
        searchParams.delete(name);
      }
    });
  }

  return searchParams;
}

export { patchSearchParams };

export function formatHref(options: {
  url: string;
  searchParams: ISearchParams;
}) {
  const { url, searchParams } = options;
  const newSearchParams = new URLSearchParams(searchParams);

  const search = newSearchParams.toString();
  if (search) {
    return url + "?" + search;
  } else {
    return url;
  }
}
