import { Input } from "@/shared";
import { Meta, StoryFn } from "@storybook/react";
import { z } from "zod";
import { useForm } from "../hooks";
import { IUIFormItem, UIFormLayout } from "./form-layout";

const schema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  age: z.string().min(1).max(2),
});

const items: IUIFormItem<z.infer<typeof schema>>[] = [
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
  component: UIFormLayout,
} as Meta<typeof UIFormLayout>;

export const Base: StoryFn<typeof UIFormLayout> = (args) => {
  const form = useForm({
    schema,
    defaultValues: {
      username: "",
      age: "",
    },
  });

  return (
    <UIFormLayout<z.infer<typeof schema>>
      {...args}
      onSubmit={console.log}
      form={form}
      items={items}
    />
  );
};

export const Submitting: StoryFn<typeof UIFormLayout> = (args) => {
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
    <UIFormLayout<z.infer<typeof schema>>
      {...args}
      onSubmit={onSubmit}
      form={form}
      items={items}
    />
  );
};
