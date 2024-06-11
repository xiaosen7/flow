import { Meta, StoryFn } from "@storybook/react";
import React from "react";
import { CTag } from "./tag";

export default {
  component: CTag,
  args: {
    tag: {
      name: "tag",
      id: String(1),
    },
    totalQuestions: 5,
  },
} as Meta<typeof CTag>;

export const Base: StoryFn<typeof CTag> = (args) => <CTag {...args} />;
