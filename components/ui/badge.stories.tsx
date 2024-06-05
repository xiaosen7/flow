import { Meta, StoryFn } from "@storybook/react";

import { Badge } from "./badge";

export default {
  component: Badge,
  args: {
    children: "Badge",
  },
} as Meta<typeof Badge>;

export const Base: StoryFn<typeof Badge> = (args) => <Badge {...args} />;
export const Outline: StoryFn<typeof Badge> = (args) => <Badge {...args} />;
export const Destructive: StoryFn<typeof Badge> = (args) => <Badge {...args} />;
export const Secondary: StoryFn<typeof Badge> = (args) => <Badge {...args} />;
