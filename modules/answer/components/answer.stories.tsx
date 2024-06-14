import { Meta, StoryFn } from "@storybook/react";

import { mock } from "@/shared";
import { random } from "lodash-es";
import { Answer } from "./answer";

export default {
  component: Answer,
  args: {
    answer: mock.answer(),
    author: mock.user(),
    upVote: {
      count: random(0, 100),
      voted: false,
    },
    downVote: {
      count: random(0, 100),
      voted: false,
    },
  },
} as Meta<typeof Answer>;

export const Base: StoryFn<typeof Answer> = (args) => <Answer {...args} />;
