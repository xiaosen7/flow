import { Meta, StoryFn } from "@storybook/react";

import { UITag } from "./tag";

export default {
  component: UITag,
  args: {
    name: "tag",
    id: String(1),
    totalQuestions: 0,
  },
} as Meta<typeof UITag>;

export const Base: StoryFn<typeof UITag> = (args) => <UITag {...args} />;
