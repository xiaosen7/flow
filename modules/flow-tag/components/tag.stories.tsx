import { Meta, StoryFn } from "@storybook/react";

import { Tag } from "./tag";

export default {
  component: Tag,
  args: {
    name: "tag",
    id: 1,
  },
} as Meta<typeof Tag>;

export const Base: StoryFn<typeof Tag> = (args) => <Tag {...args} />;