import { Meta, StoryFn } from "@storybook/react";

import { HomeFilter } from "./filter";

export default {
  component: HomeFilter,
  args: {},
} as Meta<typeof HomeFilter>;

export const Base: StoryFn<typeof HomeFilter> = (args) => (
  <HomeFilter {...args} />
);
