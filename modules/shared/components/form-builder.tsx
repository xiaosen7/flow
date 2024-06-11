import { useRequest } from "ahooks";
import { capitalCase } from "change-case";
import {
  ControllerRenderProps,
  FieldValues,
  Form,
  Path,
  UseFormReturn,
} from "react-hook-form";
import { IComponentBaseProps, ISafeAny } from "../types";
import {
  Button,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "../ui";
import { mp } from "../utils";

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
      }
    : never;

export type IFormBuilderItem<TValues extends FieldValues> =
  _IFormBuilderItem<TValues>;

export type IFormBuilderItems<TValues extends FieldValues> =
  IFormBuilderItem<TValues>[];

export type IFormBuilderPropsOnSubmit<TValues extends FieldValues> = (
  values: TValues
) => void | Promise<void>;

export interface IFormBuilderProps<TValues extends FieldValues>
  extends IComponentBaseProps {
  items: IFormBuilderItem<TValues>[];
  form: UseFormReturn<TValues, ISafeAny, ISafeAny>;
  onSubmit: IFormBuilderPropsOnSubmit<TValues>;
  getSubmitText?: (loading: boolean) => React.ReactNode;
}

export const FormBuilder = <TValues extends FieldValues>(
  props: IFormBuilderProps<TValues>
) => {
  const { items, form, onSubmit, getSubmitText = getDefaultSubmitText } = props;
  const { run, loading } = useRequest(
    async (values: TValues) => onSubmit(values),
    { manual: true }
  );

  return (
    <Form {...form}>
      {mp(
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
