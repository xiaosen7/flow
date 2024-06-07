import { Meta, StoryFn } from "@storybook/react";

import { UIQuestionMetrics } from "./metrics";

export default {
  component: UIQuestionMetrics,
  args: {
    answers: 1239,
    views: 823749,
    votes: 92,
  },
} as Meta<typeof UIQuestionMetrics>;

export const Base: StoryFn<typeof UIQuestionMetrics> = (args) => (
  <UIQuestionMetrics {...args} />
);
