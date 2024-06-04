import { Meta, StoryFn } from "@storybook/react";

import { QuestionAuthor } from "./author";

export default {
  component: QuestionAuthor,
  args: {
    id: "1",
    avatarUrl: "https://api.dicebear.com/8.x/pixel-art/svg",
    createAt: new Date(),
    name: "Author name",
  },
} as Meta<typeof QuestionAuthor>;

export const Base: StoryFn<typeof QuestionAuthor> = (args) => (
  <QuestionAuthor {...args} />
);
