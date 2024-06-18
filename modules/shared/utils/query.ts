import { IS_SERVER_SIDE } from "../constants";

export function patchQuery(queryString: string, name: string, value: string) {
  if (IS_SERVER_SIDE) {
    return queryString;
  }

  const params = new URLSearchParams(queryString);
  params.set(name, value);
  return params.toString();
}
