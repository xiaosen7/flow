import { Meta, StoryFn } from "@storybook/react";

import { RightSidebar } from "./right-sidebar";

export default {
  component: RightSidebar,
  args: {},
} as Meta<typeof RightSidebar>;

export const Base: StoryFn<typeof RightSidebar> = (args) => (
  <RightSidebar {...args} />
);
