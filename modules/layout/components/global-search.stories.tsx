import { Meta, StoryFn } from "@storybook/react";

import { GlobalSearch } from "./global-search";

export default {
  component: GlobalSearch,
  args: {},
} as Meta<typeof GlobalSearch>;

export const Base: StoryFn<typeof GlobalSearch> = (args) => (
  <GlobalSearch {...args} />
);
