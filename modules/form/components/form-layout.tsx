import { mergeClassAndStyleProps } from "@/lib/utils";
import { IComponentBaseProps, ISafeAny } from "@/types";
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
} from "@components/ui";
import { useRequest } from "ahooks";
import { capitalCase } from "change-case";
import {
  ControllerRenderProps,
  FieldValues,
  Path,
  UseFormReturn,
} from "react-hook-form";

type _IFormItem<
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
      }
    : never;

export type IFormItem<TValues extends FieldValues> = _IFormItem<TValues>;

export type IFormItems<TValues extends FieldValues> = IFormItem<TValues>[];

export interface IFormLayoutProps<TValues extends FieldValues>
  extends IComponentBaseProps {
  items: IFormItem<TValues>[];
  form: UseFormReturn<TValues, ISafeAny, ISafeAny>;
  onSubmit: (values: TValues) => void | Promise<void>;
  getSubmitText?: (loading: boolean) => React.ReactNode;
}

export const FormLayout = <TValues extends FieldValues>(
  props: IFormLayoutProps<TValues>
) => {
  const { items, form, onSubmit, getSubmitText = getDefaultSubmitText } = props;
  const { run, loading } = useRequest(
    async (values: TValues) => onSubmit(values),
    { manual: true }
  );

  return (
    <Form {...form}>
      {mergeClassAndStyleProps(
        props,
        <form
          onSubmit={form.handleSubmit(run)}
          className="flex w-full flex-col gap-10"
        >
          {items.map(
            ({
              name,
              description,
              label,
              renderControl = defaultRenderControl,
              required,
            }) => (
              <FormField
                key={name}
                control={form.control}
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

          <div>
            <Button disabled={loading} variant="primary-gradient">
              {getSubmitText(loading)}
            </Button>
          </div>
        </form>
      )}
    </Form>
  );
};

const getDefaultSubmitText = (loading: boolean) => {
  return loading ? "Submitting..." : "Submit";
};

const defaultRenderControl = (
  field: ControllerRenderProps<ISafeAny, string>
) => <Input {...field} />;
