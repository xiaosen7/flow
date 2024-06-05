import { Meta, StoryFn } from "@storybook/react";

import { DefaultLayout } from "./default-layout";

export default {
  component: DefaultLayout,
  args: { children: "content" },
} as Meta<typeof DefaultLayout>;

export const Base: StoryFn<typeof DefaultLayout> = (args) => (
  <DefaultLayout className="h-[90vh]" {...args}>
    {"content".repeat(1000)}
  </DefaultLayout>
);
