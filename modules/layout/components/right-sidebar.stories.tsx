import { Meta, StoryFn } from "@storybook/react";

import { mock } from "@/shared";
import { RightSidebar } from "./right-sidebar";

export default {
  component: RightSidebar,
  args: {
    hotQuestions: mock.create(mock.question, 5),
    popularTags: mock.create(mock.tag, 5),
    getTagQuestionCount: (tag) => 10,
  },
} as Meta<typeof RightSidebar>;

export const Base: StoryFn<typeof RightSidebar> = (args) => (
  <RightSidebar {...args} />
);
