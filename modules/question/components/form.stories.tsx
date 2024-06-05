import { Meta, StoryFn } from "@storybook/react";

import { QuestionForm } from "./form";

export default {
  component: QuestionForm,
  args: {},
} as Meta<typeof QuestionForm>;

export const Base: StoryFn<typeof QuestionForm> = (args) => (
  <QuestionForm {...args} />
);
