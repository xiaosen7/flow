import { Input } from "@/shared";
import { Meta, StoryFn } from "@storybook/react";
import { z } from "zod";
import { FormBuilder, IFormBuilderItem } from "./form-builder";

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
    required: true,
  },
];

export default {
  component: FormBuilder,
} as Meta<typeof FormBuilder>;

export const Base: StoryFn<typeof FormBuilder> = () => {
  const onSubmit = async (values: IValues) => {
    alert(JSON.stringify(values));
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  return (
    <FormBuilder
      items={items}
      schema={schema}
      topic="Person"
      onSubmit={onSubmit}
    />
  );
};
