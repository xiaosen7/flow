import { Meta, StoryFn } from "@storybook/react";

import { mock } from "@/shared";
import { QuestionCard } from "./card";

export default {
  component: QuestionCard,
  args: {
    question: mock.question(),
    tags: mock.create(mock.tag, [0, 10]),
    creator: mock.user(),
  },
} as Meta<typeof QuestionCard>;

export const Base: StoryFn<typeof QuestionCard> = (args) => (
  <QuestionCard {...args} />
);