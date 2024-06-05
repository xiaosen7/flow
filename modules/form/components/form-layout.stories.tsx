import { Input } from "@components/ui";
import { Meta, StoryFn } from "@storybook/react";
import { z } from "zod";
import { useForm } from "../hooks";
import { FormLayout, IFormItem } from "./form-layout";

const schema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  age: z.string().min(1).max(2),
});

const items: IFormItem<z.infer<typeof schema>>[] = [
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
  component: FormLayout,
} as Meta<typeof FormLayout>;

export const Base: StoryFn<typeof FormLayout> = (args) => {
  const form = useForm({
    schema,
    defaultValues: {
      username: "",
      age: "",
    },
  });

  return (
    <FormLayout<z.infer<typeof schema>>
      {...args}
      onSubmit={console.log}
      form={form}
      items={items}
    />
  );
};

export const Submitting: StoryFn<typeof FormLayout> = (args) => {
  const form = useForm({
    schema,
    defaultValues: {
      username: "",
      age: "",
    },
  });

  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  return (
    <FormLayout<z.infer<typeof schema>>
      {...args}
      onSubmit={onSubmit}
      form={form}
      items={items}
    />
  );
};
