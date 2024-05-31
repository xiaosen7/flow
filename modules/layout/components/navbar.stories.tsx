import { Meta, StoryFn } from "@storybook/react";

import { Navbar } from "./navbar";

export default {
  component: Navbar,
  args: {},
} as Meta<typeof Navbar>;

export const Base: StoryFn<typeof Navbar> = (args) => <Navbar {...args} />;
