import { Meta, StoryFn } from "@storybook/react";

import { mock } from "@/shared";
import { random } from "lodash-es";
import { UserProfile } from "./profile";

export default {
  component: UserProfile,
  args: {
    user: mock.user(),

    bronze: random(0, 100),
    gold: random(0, 100),
    reputation: random(0, 100),
    silver: random(0, 100),
    totalAnswers: random(0, 100),
    totalQuestions: random(0, 100),
  },
} as Meta<typeof UserProfile>;

export const Base: StoryFn<typeof UserProfile> = (args) => (
  <UserProfile {...args} />
);
