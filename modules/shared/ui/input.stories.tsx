import { Meta, StoryFn } from "@storybook/react";

import { Input } from "./input";

export default {
  component: Input,
  args: {},
} as Meta<typeof Input>;

export const Default: StoryFn<typeof Input> = (args) => <Input {...args} />;
