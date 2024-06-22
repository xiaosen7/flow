"use client";

import {
  FormBuilder,
  IFormBuilderItems,
  IFormComponentProps,
  Input,
  Textarea,
  mp,
  useForm,
} from "@/shared";
import React, { useMemo } from "react";
import { z } from "zod";

const getTagSchema = (checkNameUniq: (name: string) => Promise<boolean>) => {
  return z.object({
    name: z
      .string()
      .min(1)
      .max(20)
      .refine(checkNameUniq, (name) => ({
        message: `Duplicate tag ${name}.`,
      })),
    description: z.string().min(50).max(1000),
  });
};

type IValues = z.infer<ReturnType<typeof getTagSchema>>;

const items: IFormBuilderItems<IValues> = [
  {
    name: "name",
    renderControl(field) {
      return <Input {...field} />;
    },
    label: "Tag Name",
    required: true,
  },
  {
    name: "description",
    renderControl(field) {
      return <Textarea {...field} />;
    },
    label: "Tag Description",
    required: true,
  },
];

export interface ITagFormProps extends IFormComponentProps<IValues> {
  checkNameUniq: (name: string) => Promise<boolean>;
}

export const TagForm: React.FC<ITagFormProps> = (props) => {
  const { checkNameUniq, ...formProps } = props;
  const schema = useMemo(() => getTagSchema(checkNameUniq), [checkNameUniq]);
  const form = useForm({
    schema,
  });
  return mp(props, <FormBuilder form={form} items={items} {...formProps} />);
};
