import { Meta, StoryFn } from "@storybook/react";

import { UIQuestionAuthor } from "./author";

export default {
  component: UIQuestionAuthor,
  args: {
    imageUrl: "https://api.dicebear.com/8.x/pixel-art/svg",
    username: "Author name",
  },
} as Meta<typeof UIQuestionAuthor>;

export const Base: StoryFn<typeof UIQuestionAuthor> = (args) => (
  <UIQuestionAuthor {...args} />
);
