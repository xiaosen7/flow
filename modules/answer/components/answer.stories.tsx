import { Meta, StoryFn } from "@storybook/react";

import { mock } from "@/shared";
import { Answer } from "./answer";

export default {
  component: Answer,
  args: {
    answer: mock.answer(),
    author: mock.user(),
    upvotes: mock.create(mock.user, [0, 999]),
    downvotes: mock.create(mock.user, [0, 999]),
  },
} as Meta<typeof Answer>;

export const Base: StoryFn<typeof Answer> = (args) => <Answer {...args} />;
