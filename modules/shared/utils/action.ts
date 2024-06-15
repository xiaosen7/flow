import { revalidatePath } from "next/cache";
import { ISafeAny } from "../types";

export function bindAction<
  TArg1,
  TArg2,
  T extends (arg1: TArg1, arg2: TArg2) => ISafeAny,
>(actionFn: T, arg1: TArg1) {
  return async (arg2: TArg2) => {
    "use server";
    return actionFn(arg1, arg2);
  };
}

export const ac = (actionFn: (...args: ISafeAny[]) => Promise<void>) => {
  const fn = Object.assign(actionFn, {
    bindArgs(...boundArgs: ISafeAny[]) {
      return ac(async (...args: ISafeAny[]) => {
        "use server";
        return actionFn(...boundArgs, ...args);
      });
    },
    revalidatePath(path: string) {
      return ac(async (...args) => {
        "use server";
        await actionFn(...args);
        revalidatePath(path);
      });
    },
  });

  return fn;
};
