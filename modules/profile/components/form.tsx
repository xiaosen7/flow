"use client";

import {
  FormBuilder,
  IComponentBaseProps,
  IFormBuilderItems,
  IFormBuilderPropsOnSubmit,
  IUser,
  mp,
  useForm,
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

export interface IProfileFormProps extends IComponentBaseProps {
  onSubmit?: IFormBuilderPropsOnSubmit<z.infer<typeof PROFILE_SCHEMA>>;
  user?: IUser;
}

export const ProfileForm: React.FC<IProfileFormProps> = (props) => {
  const { user, onSubmit } = props;
  const form = useForm({
    schema: PROFILE_SCHEMA,
    defaultValues: {
      bio: user?.bio ?? "",
      location: user?.location ?? "",
      fullName: user?.fullName ?? "",
      username: user?.username ?? "",
      portfolioWebsite: user?.portfolioWebsite ?? "",
    },
  });
  return mp(
    props,
    <FormBuilder
      form={form}
      getSubmitText={(loading) => (loading ? "Saving..." : "Save")}
      items={items}
      submitAlign="right"
      onSubmit={onSubmit}
    />
  );
};
