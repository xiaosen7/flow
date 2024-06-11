import { Meta, StoryFn } from "@storybook/react";

import { QuestionFilter } from "./filter";

export default {
  component: QuestionFilter,
  args: {},
} as Meta<typeof QuestionFilter>;

export const Base: StoryFn<typeof QuestionFilter> = (args) => (
  <QuestionFilter {...args} />
);
