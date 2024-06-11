import { Meta, StoryFn } from "@storybook/react";

import { CLinkable } from "./linkable";

export default {
  component: CLinkable,
  args: {},
} as Meta<typeof CLinkable>;

export const WithHref: StoryFn<typeof CLinkable> = () => (
  <CLinkable href="/home">home</CLinkable>
);

export const WithoutHref: StoryFn<typeof CLinkable> = () => (
  <CLinkable>no href</CLinkable>
);
