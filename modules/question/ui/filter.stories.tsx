import { Meta, StoryFn } from "@storybook/react";

import { UIQuestionFilter } from "./filter";

export default {
  component: UIQuestionFilter,
  args: {},
} as Meta<typeof UIQuestionFilter>;

export const Base: StoryFn<typeof UIQuestionFilter> = (args) => (
  <UIQuestionFilter {...args} />
);
