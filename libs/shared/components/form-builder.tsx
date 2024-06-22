"use client";

import { useRequest } from "ahooks";
import { capitalCase } from "change-case";
import { capitalize } from "lodash-es";
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";
import { z } from "zod";
import { useForm } from "../hooks";
import { IComponentBaseProps, ISafeAny } from "../types";
import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  toast,
} from "../ui";
import { cn, mp, removeNilKeys } from "../utils";

type _IFormBuilderItem<
  TValues extends FieldValues,
  TName extends Path<TValues> = Path<TValues>,
> =
  TName extends Path<TValues>
    ? {
        name: TName;
        label?: string;
        renderControl?: (
          field: ControllerRenderProps<TValues, TName>
        ) => JSX.Element;
        description?: string;
        required?: boolean;
        disabled?: boolean;
      }
    : never;

export type IFormBuilderItem<TValues extends FieldValues> =
  _IFormBuilderItem<TValues>;

export type IFormBuilderItems<TValues extends FieldValues> =
  IFormBuilderItem<TValues>[];

export type IFormBuilderPropsOnSubmit<TValues extends FieldValues> = (
  values: TValues
) => void | Promise<void>;

export interface IFormBuilderProps<TSchema extends z.ZodType>
  extends IComponentBaseProps {
  items: IFormBuilderItem<z.infer<TSchema>>[];
  onSubmit?: IFormBuilderPropsOnSubmit<z.infer<TSchema>>;
  getSubmitText?: (loading: boolean, type: "edit" | "post") => React.ReactNode;
  /**
   * @default 'left'
   */
  submitAlign?: "left" | "right";
  extra?: React.ReactNode;
  defaultValues?: {
    [K in keyof z.infer<TSchema>]: z.infer<TSchema>[K] | null;
  };
  schema: TSchema;
  type?: "edit" | "post";
  topic?: string;
}

export const FormBuilder = <TSchema extends z.ZodType>(
  props: IFormBuilderProps<TSchema>
) => {
  const {
    items,
    onSubmit,
    submitAlign = "left",
    extra,
    defaultValues,
    schema,
    type = "post",
    getSubmitText = getDefaultSubmitText,
    topic,
  } = props;
  const { run, loading } = useRequest(async (values) => onSubmit?.(values), {
    manual: true,
    onSuccess() {
      if (topic) {
        toast({
          title: capitalize(`${topic} ${type}ed successfully!`),
          variant: "default",
        });
      } else {
        toast({
          title: capitalize(`${type}ed successfully!`),
          variant: "default",
        });
      }
    },
  });

  const form = useForm<z.infer<TSchema>>({
    schema,
    defaultValues: removeNilKeys(defaultValues ?? {}),
  });

  return (
    <Form {...form}>
      {mp(
        props,
        <form
          className="flex w-full flex-col gap-10"
          onSubmit={form.handleSubmit(run)}
        >
          {items.map(
            ({
              name,
              description,
              label,
              renderControl = defaultRenderControl,
              required,
              disabled,
            }) => (
              <FormField
                key={name}
                control={form.control}
                disabled={disabled === true}
                name={name}
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col gap-3">
                    <FormLabel className="paragraph-semibold text-dark400_light800">
                      {label && capitalCase(label)}
                      {required && <span className="text-primary-500">*</span>}
                    </FormLabel>

                    <FormControl className="mt-3.5">
                      {renderControl(field as ISafeAny)}
                    </FormControl>
                    <FormDescription className="body-regular mt-2.5 text-light-500">
                      {description}
                    </FormDescription>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            )
          )}

          <div className="flex flex-wrap gap-4">
            <Button
              className={cn(submitAlign === "right" && "ml-auto", "capitalize")}
              disabled={loading}
              variant="primary-gradient"
            >
              {getSubmitText(loading, type)}
            </Button>
            {extra}
          </div>
        </form>
      )}
    </Form>
  );
};

const getDefaultSubmitText = (loading: boolean, type: "edit" | "post") => {
  return loading ? `${type}...` : type;
};

const defaultRenderControl = (
  field: ControllerRenderProps<ISafeAny, string>
) => <Input {...field} />;
