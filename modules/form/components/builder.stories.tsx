import { Input } from "@/shared";
import { Meta, StoryFn } from "@storybook/react";
import { z } from "zod";
import { useForm } from "../hooks";
import { FormBuilder, IFormBuilderItem } from "./builder";

const schema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  age: z.string().min(2),
});

type IValues = z.infer<typeof schema>;

const items: IFormBuilderItem<IValues>[] = [
  {
    name: "username",
    label: "username",
    renderControl: (field) => <Input placeholder="shadcn" {...field} />,
    description: "This is your public display name.",
    required: true,
  },
  {
    name: "age",
    label: "age",
    renderControl: (field) => <Input placeholder="shadcn" {...field} />,
    description: "This is your public display age.",
  },
];

export default {
  component: FormBuilder,
} as Meta<typeof FormBuilder>;

export const Base: StoryFn<typeof FormBuilder> = (args) => {
  const form = useForm({
    schema,
    defaultValues: {
      username: "",
      age: "",
    },
  });

  const onSubmit = async (values: IValues) => {
    alert(JSON.stringify(values));
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  return (
    <FormBuilder {...args} form={form} items={items} onSubmit={onSubmit} />
  );
};
