import { Meta, StoryFn } from "@storybook/react";

import { UIQuestionForm } from "./form";

export default {
  component: UIQuestionForm,
  args: {},
} as Meta<typeof UIQuestionForm>;

export const Base: StoryFn<typeof UIQuestionForm> = (args) => (
  <UIQuestionForm {...args} />
);
