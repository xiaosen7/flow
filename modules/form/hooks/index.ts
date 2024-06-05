import { zodResolver } from "@hookform/resolvers/zod";
import { ISafeAny } from "@types";
import { omit } from "lodash-es";
import {
  FieldValues,
  UseFormProps,
  UseFormReturn,
  useForm as rcUseForm,
} from "react-hook-form";
import { z } from "zod";

export const useForm = <
  TFieldValues extends FieldValues = FieldValues,
  TContext = ISafeAny,
  TTransformedValues extends FieldValues | undefined = undefined,
  TSchema extends z.ZodType<ISafeAny> = z.ZodType<ISafeAny>,
>(
  options: Omit<UseFormProps<TFieldValues, TContext>, "resolver"> & {
    schema: TSchema;
  }
) => {
  return rcUseForm({
    resolver: zodResolver(options.schema),
    ...omit(options, "schema"),
  }) as UseFormReturn<TFieldValues, TContext, TTransformedValues>;
};
