import { Meta, StoryFn } from "@storybook/react";

import { mock } from "@/shared";
import { QuestionList } from "./list";

export default {
  component: QuestionList,
  args: {
    questions: mock.create(mock.question, 10),
    getAuthor: () => mock.user(),
    getTags: () => mock.create(mock.tag, [0, 10]),
    getVotes: () => mock.create(mock.user, 10),
  },
} as Meta<typeof QuestionList>;

export const Base: StoryFn<typeof QuestionList> = (args) => (
  <QuestionList {...args} />
);
