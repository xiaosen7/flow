import { Meta, StoryFn } from "@storybook/react";

import { Loading } from "./loading";

export default {
  component: Loading,
  args: {},
} as Meta<typeof Loading>;

export const Base: StoryFn<typeof Loading> = (args) => <Loading {...args} />;
