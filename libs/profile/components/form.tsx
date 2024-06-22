"use client";

import {
  FormBuilder,
  IFormBuilderItems,
  IFormComponentProps,
  mp,
} from "@/shared";
import React from "react";
import { z } from "zod";
import { PROFILE_SCHEMA } from "../constants";

const items: IFormBuilderItems<z.infer<typeof PROFILE_SCHEMA>> = [
  {
    name: "fullName",
    required: true,
    label: "Name",
    description: "Your name",
  },
  {
    name: "username",
    label: "Username",
    description: "Your username",
    required: true,
  },
  {
    name: "portfolioWebsite",
    label: "Portfolio Link",
    description: "Your portfolio url",
  },
  {
    name: "location",
    label: "Location",
    description: "Your location",
  },
  {
    name: "bio",
    label: "Bio",
    description: "Tell us about yourself",
  },
];

export interface IProfileFormProps
  extends IFormComponentProps<typeof PROFILE_SCHEMA> {}

export const ProfileForm: React.FC<IProfileFormProps> = (props) => {
  return mp(
    props,
    <FormBuilder
      items={items}
      schema={PROFILE_SCHEMA}
      submitAlign="right"
      topic="Profile"
      type="edit"
      {...props}
    />
  );
};
